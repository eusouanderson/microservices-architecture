from fastapi import FastAPI
import httpx

app = FastAPI()

# URL dos microserviços
AUTH_SERVICE_URL = "http://auth-service:8000"
ORDER_SERVICE_URL = "http://order-service:8000"
PRODUCT_SERVICE_URL = "http://product-service:8000"

# Rota para autenticação
@app.get("/auth")
async def authenticate():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{AUTH_SERVICE_URL}/login")
        return response.json()

# Rota para pedidos
@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{ORDER_SERVICE_URL}/orders/{order_id}")
        return response.json()

# Rota para produtos
@app.get("/products/{product_id}")
async def get_product(product_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PRODUCT_SERVICE_URL}/products/{product_id}")
        return response.json()
        
        

