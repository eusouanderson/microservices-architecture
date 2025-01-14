const express = require('express');
const Order = require('../models/orders');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = express.Router();

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Order Service API',
            version: '1.0.0',
            description: 'Serviço de gerenciamento de ordens',
        },
        servers: [
            {
                url: 'http://localhost:3002',
            },
        ],
    },
    apis: ['./src/routes/order.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.get('/', (req, res) => {
    res.send(`
        <h1>Order Service API</h1>
        <p>Documentação da API de ordens.</p>
        <p>Para ver a documentação interativa, acesse <a href="order/api-docs">/api-docs</a></p>
    `);
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /order/create:
 *   post:
 *     tags: [Order]
 *     summary: Cria um novo pedido
 *     description: Este endpoint cria um novo pedido no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID do usuário relacionado ao pedido
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     qty:
 *                       type: number
 *                     price:
 *                       type: number
 *                     product:
 *                       type: string
 *                 description: Lista de itens no pedido
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *               itemsPrice:
 *                 type: number
 *               shippingPrice:
 *                 type: number
 *               taxPrice:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/create', async (req, res) => {
    const {
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;

    try {
        if (!user || !orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'Dados inválidos para criar o pedido' });
        }

        const newOrder = new Order({
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Pedido criado com sucesso', order: savedOrder });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar o pedido', error: err.message });
    }
});

module.exports = router;
