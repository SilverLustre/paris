/*
api call for text generation
*/
import {
  Configuration,
  OpenAIApi
} from "openai";
const configuration = new Configuration({
  //organization: "org-OtujAAMEXQhwZRV0rRa9ZxVs",
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);
// ;(async ()=>{const response = await openai.listEngines()})();
// console.log(response);

async function generate() {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "Say this is a test",
    max_tokens: 5,
  });
  return response.data.choices[0].text;
};

(async function() {
    console.log(await generate())
})()
