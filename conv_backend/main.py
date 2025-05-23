from fastapi import FastAPI
from .routes import captcha

app = FastAPI()

app.include_router(captcha.router)

@app.get("/")
async def root():
    return {"message": "Maze Game Captcha API running!"}
