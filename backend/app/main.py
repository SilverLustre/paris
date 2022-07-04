import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from route.api import router as api_router

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://localhost",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/aloha")
def aloha():
    return "Online"


if __name__ == '__main__':
    uvicorn.run("main:app", port=8000)
    print("running")
