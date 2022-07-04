import openai
from fastapi import APIRouter
from fastapi import Query
import json
from core.model.product_item import ProductItem

router = APIRouter(
    prefix="/product",
    tags=["Product"],
    responses={404: {"description": "Not found"}},
)

class Descriptor:
    productName: str
    description: str
    engine: str = "text-davinci-002"
    temperature: float = 1
    max_tokens: int = 1000
    frequency_penalty: float = 0
    presence_penalty: float = 0

    def __init__(self, productName, description, engine = "text-davinci-002",temperature=1,
                 max_tokens=1000,frequency_penalty=0,presence_penalty=0):
        self.productName = productName
        self.description = description
        self.engine = engine
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.frequency_penalty = frequency_penalty
        self.presence_penalty = presence_penalty

    def describe(self):
        prompt = 'write a amazon product description about {}, which can be described as \"{}\"'.format(self.productName, self.description)
        response = openai.Completion.create(
            model=self.engine,
            prompt=prompt,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty
        )
        return response['choices'][0]['text']

@router.post("/")
def createItem(item:ProductItem):
    descriptor = Descriptor(item.productName,item.description, item.engine, item.temperature, item.max_tokens, item.frequency_penalty, item.presence_penalty)
    jsontext = {'data': descriptor.describe()}
    jsondata = json.dumps(jsontext,indent=4,separators=(',', ': '),ensure_ascii=False)
    return jsondata
