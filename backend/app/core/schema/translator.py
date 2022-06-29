import openai
from fastapi import APIRouter
from fastapi import Query
import json
from core.model.trans_item import TransItem

router = APIRouter(
    prefix="/translate",
    tags=["Trans"],
    responses={404: {"description": "Not found"}},
)

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

@router.post("/")
async def createItem(item:TransItem):
    translator = Translator(item.content, item.language, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'data': translator.translate()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ': '),ensure_ascii=False)
    return jsondata
