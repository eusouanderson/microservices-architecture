# Estrutura do Projeto - Microservices Architecture

O projeto utiliza a **arquitetura de microserviços**, organizada de forma modular, com serviços separados por domínio e configurados para trabalhar de maneira independente.

## Estrutura do Diretório

```plaintext
├── auth-service
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       ├── config.js
│       └── index.js
├── docker-compose.yml
├── gateway
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       ├── config.js
│       └── index.js
├── order-service
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       ├── config.js
│       └── index.js
└── product-service
    ├── Dockerfile
    ├── package.json
    └── src
        ├── config.js
        └── index.js
```

## Core Features

### Auth Service

- **POST /register**: Register a new user.
- **POST /login**: Log in and receive a token.

### Product Service

- **POST /products**: Create a new product.
- **GET /products**: List all products.
- **GET /products/:id**: View product details.

### Order Service

- **POST /orders**: Create a new order.
- **GET /orders**: List all orders for the authenticated user.

## Docker Compose

A `docker-compose.yml` file is used to orchestrate all services.

### docker-compose.yml

```yaml
version: '3.8'
services:
  auth-service:
    build: ./auth-service
    ports:
      - "3001:3001"
    env_file:
      - ./auth-service/.env
    depends_on:
      - mongo-auth

  product-service:
    build: ./product-service
    ports:
      - "3002:3002"
    env_file:
      - ./product-service/.env
    depends_on:
      - mongo-products

  order-service:
    build: ./order-service
    ports:
      - "3003:3003"
    env_file:
      - ./order-service/.env
    depends_on:
      - mongo-orders

  mongo-auth:
    image: mongo
    container_name: mongo-auth
    ports:
      - "27017:27017"
    volumes:
      - mongo-auth-data:/data/db

  mongo-products:
    image: mongo
    container_name: mongo-products
    ports:
      - "27018:27017"
    volumes:
      - mongo-products-data:/data/db

  mongo-orders:
    image: mongo
    container_name: mongo-orders
    ports:
      - "27019:27017"
    volumes:
      - mongo-orders-data:/data/db

volumes:
  mongo-auth-data:
  mongo-products-data:
  mongo-orders-data:
```
