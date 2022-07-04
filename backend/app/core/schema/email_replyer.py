import openai
import json
from fastapi import APIRouter
from fastapi import Query
from core.model.email_item import EmailItem

router = APIRouter(
    prefix="/reply",
    tags=["Email"],
    responses={404: {"description": "Not found"}},
)


class EmailReplyer():
    content: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0

    def __init__(self, content, engine = "text-davinci-002",temperature=1,
                 max_tokens=1000,frequency_penalty=0,presence_penalty=0):
        self.content = content
        self.engine = engine
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.frequency_penalty = frequency_penalty
        self.presence_penalty = presence_penalty

    def reply(self):
        response = openai.Completion.create(
            engine=self.engine,
            prompt="Respond to the following email text: {}. Response:".format(self.content),
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            top_p=1,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty
        )
        print(response['choices'][0]['text'])
        return response['choices'][0]['text']


@router.post("/")
def createItem(item:EmailItem):
    email_replyer = EmailReplyer(item.content)
    jsontext = {'data': email_replyer.reply()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ': '))
    return jsondata
