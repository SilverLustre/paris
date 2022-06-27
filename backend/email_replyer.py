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


class EmailReplyer():
    email_content: str

    def __init__(self, email_content):
        self.email_content = email_content

    def reply(self):
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt="Respond to the following email text: {}. Response:".format(self.email_content),
            temperature=0.7,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
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
