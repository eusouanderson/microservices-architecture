const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = express.Router();

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth Service API',
            version: '1.0.0',
            description: 'Serviço de autenticação para usuários',
        },
        servers: [
            {
                url: 'http://localhost:3001', 
            },
        ],
    },
    apis: ['./src/routes/auth.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.get('/', (req, res) => {
    res.send(`
    <h1>Auth Service API</h1>
    <p>Documentação da API de autenticação.</p>
    <p>Para ver a documentação interativa, acesse <a href="auth/api-docs">/api-docs</a></p>
  `);
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Registrar um novo usuário
 *     description: Este endpoint cria um novo usuário no sistema, fornecendo o e-mail e a senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Usuário já existe
 *       500:
 *         description: Erro no servidor
 */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Fazer login de um usuário
 *     description: Este endpoint autentica um usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, token JWT retornado
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 *       500:
 *         description: Erro no servidor
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }
});

module.exports = router;
