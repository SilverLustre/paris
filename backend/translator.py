import openai
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import json
from fastapi.middleware.cors import CORSMiddleware
import os

openai.api_key = os.environ.get('OPENAI_API_KEY')

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

class Item(BaseModel):
    content: str
    language: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0

class Translator:

    text:str
    target_language:str
    engine: str
    temperature: float
    max_tokens: int
    frequency_penalty: float
    presence_penalty: float

    def __init__(self, text, target_language, engine = "text-davinci-002",
                 temperature=1, max_tokens=1000,frequency_penalty=0,presence_penalty=0):
        self.text = text
        self.target_language = target_language
        self.engine = engine
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.frequency_penalty = frequency_penalty
        self.presence_penalty = presence_penalty


    def translate(self):
        prompt="Convert the following text to {}. Text: {}.".format(self.target_language, self.text)
        response = openai.Completion.create(
            engine=self.engine,
            prompt=prompt,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            top_p=1,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty
        )
        print(response['choices'][0]['text'])
        return response['choices'][0]['text']

@app.post("/translate")
async def createItem(item:Item):
    translator = Translator(item.content, item.language, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'data': translator.translate()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ': '),ensure_ascii=False)
    return jsondata


if __name__ == '__main__':
    uvicorn.run(app)
