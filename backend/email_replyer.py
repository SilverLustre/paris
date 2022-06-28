import openai
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import json
#from dotenv import find_dotenv, load_dotenv
import os

# load_dotenv(find_dotenv('.env'))
# env_dist = os.environ
# print(env_dist.get('OPENAI_API_KEY'))
openai.api_key = ""


app = FastAPI()

class EmailItem(BaseModel):
    content: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0


class EmailReplyer():
    email_content: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0

    def __init__(self, email_content, engine = "text-davinci-002",temperature=1,
                 max_tokens=1000,frequency_penalty=0,presence_penalty=0):
        self.email_content = email_content
        engine: str = "text-davinci-002"
        temperature: float = 1
        max_tokens: int = 1000
        frequency_penalty: float = 0
        presence_penalty: float = 0

    def reply(self):
        response = openai.Completion.create(
            engine=self.engine,
            prompt="Respond to the following email text: {}. Response:".format(self.email_content),
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            top_p=1,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty
        )
        print(response['choices'][0]['text'])
        return response['choices'][0]['text']


@app.post("/reply")
async def createItem(email_item:EmailItem):
    email_replyer = EmailReplyer(email_item.content)
    jsontext = {'data': email_replyer.reply()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ': '))
    return jsondata


if __name__ == '__main__':
    uvicorn.run(app)
