import openai
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

openai.api_key = ""

class EmailItem(BaseModel):
    content: str

app = FastAPI()

@app.post("/items")
async def create_item(email_item:EmailItem):

    return "Hello world"

class EmailReplyer(BaseModel):
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
        return response['choices'][0]['text']


email_content = """Hi team,

How was your long weekend? Did something special?

I was wondering if you could mount Paris on our server? - We have a Bluehost hosting account and we might find it useful to run Paris from there. What do you think?

Cheers!"""

'''
email_replyer = EmailReplyer(email_content)
print(email_replyer.reply())
'''

if __name__ == '__main__':
    uvicorn.run(app)
