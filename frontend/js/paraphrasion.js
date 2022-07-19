// Title Block
// function setServiceStatus(status){
//     var serviceStatus = document.getElementById("serviceStatus")
//     if (status === "Online"){
//         serviceStatus.innerHTML = status;
//         serviceStatus.classList.replace("red", "green");
//     }else if (status === "Offline"){
//         serviceStatus.innerHTML = status;
//         serviceStatus.classList.replace("green", "red");
//     }
// }
// window.setInterval(function(){
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function(){
//         if (this.readyState === 4){
//             if (this.status === 200){
//                 // console.log(this.status);
//                 // console.log(this.responseText);
//                 setServiceStatus("Online");
//             }else{
//                 // console.log(this.status);
//                 // console.log(this.responseText);
//                 setServiceStatus("Offline");
//             }
//         }
//     }

//     xhttp.timeout = 8000;
//     xhttp.ontimeout = function(){
//         // console.log('Status check timed out.')
//     }
//     xhttp.open("GET", "http://127.0.0.1:8000/aloha");
//     xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000/");
//     xhttp.send(null, true);
// }, 10000);

// local storage
function saveValue(e){
    var id = e.id;
    var value = e.value;
    localStorage.setItem(id, value);
}

function getSavedValue(id){
    if (!localStorage.getItem(id)){
        return "";
    }
    return localStorage.getItem(id);
}

document.getElementById("apiKeyInput").value = getSavedValue("apiKeyInput");
document.getElementById("toneInput").value = getSavedValue("toneInput");
document.getElementById("targetAudienceInput").value = getSavedValue("targetAudienceInput");
document.getElementById("outputLanguageInput").value = getSavedValue("outputLanguageInput");
document.getElementById("contentTextarea").value = getSavedValue("contentTextarea");

if (localStorage.getItem("modelSelect")!==null){
    document.getElementById("modelSelect").value = getSavedValue("modelSelect");
}
if (localStorage.getItem("maxTokenInput")!==null){
    document.getElementById("maxTokenInput").value = getSavedValue("maxTokenInput");
}
if (localStorage.getItem("tempInput")!==null){
    document.getElementById("tempInput").value = getSavedValue("tempInput");
}
if (localStorage.getItem("presencePenaltyInput")!=null){
    document.getElementById("presencePenaltyInput").value = getSavedValue("presencePenaltyInput");
}
if (localStorage.getItem("freqPenaltyInput")!==null){
    document.getElementById("freqPenaltyInput").value = getSavedValue("freqPenaltyInput");
}
if (localStorage.getItem("contentTextarea")!==null){
    document.getElementById("contentTextarea").value = getSavedValue("contentTextarea");
}
if (localStorage.getItem("promptTextarea")!==null){
    document.getElementById("promptTextarea").value = getSavedValue("promptTextarea");
}
if (localStorage.getItem("genResultTextarea")!==null){
    document.getElementById("genResultTextarea").value = getSavedValue("genResultTextarea");
}


var resetBt = document.getElementById("resetBt");
resetBt.onclick = function(){
    if (confirm('Are you sure to reset the page? You will lose all the data in the fields except for the API Key.')){
        console.log('clear');
        var apiKey = localStorage.getItem("apiKeyInput");
        apiKey = apiKey===null?'':apiKey;
        localStorage.clear();
        localStorage.setItem("apiKeyInput", apiKey);
        location.reload();
    }else{
        console.log('no');
    }
}
// Configurations Block

var toneClrBt = document.getElementById("toneClrBt");
toneClrBt.onclick = function(){
    document.getElementById("toneInput").value = '';
}

var targetAudienceClrBt = document.getElementById("targetAudienceClrBt");
targetAudienceClrBt.onclick = function(){
    document.getElementById("targetAudienceInput").value = '';
}

var outputLanguageClrBt = document.getElementById("outputLanguageClrBt");
outputLanguageClrBt.onclick = function(){
    document.getElementById("outputLanguageInput").value = '';
}

var keywordsClrBt = document.getElementById("keywordsClrBt");
keywordsClrBt.onclick = function(){
    document.getElementById("keywordsInput").value = '';
}

//Paraphrase Block

var contentCpBt = document.getElementById("contentCpBt");
contentCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("contentTextarea").value);
}

var contentClrBt = document.getElementById("contentClrBt")
contentClrBt.onclick = function(){
  document.getElementById("contentTextarea").value = '';
}


// Prompt Block

function generatePrompt(){
    console.log("generatePrompt");
    var apiKeyInput = document.getElementById('apiKeyInput').value;

    var tone = document.getElementById("toneInput").value;
    var targetAudience = document.getElementById("targetAudienceInput").value;
    var outputLanguage = document.getElementById("outputLanguageInput").value;
    var keywords = document.getElementById("keywordsInput").value;
    var paraContent = document.getElementById("contentTextarea").value;

    var model = document.getElementById('modelSelect').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;

    if (paraContent===''){
        alert('You must input paraphrase source!');
        return;
    }

    var elements = []
    elements = ['Paraphrase the following text']
    if (targetAudience!==''){
        elements.push('targeting the audience of');
        elements.push(targetAudience);
    }
    if (tone!==''){
      elements.push('in');
      elements.push(tone);
      elements.push('tone');
    }
    if(outputLanguage!==''){
      elements.push('in')
      elements.push(outputLanguage)
    }
    if(keywords!==''){
      elements.push('with keywords:')
      elements.push(keywords)
    }
    elements.push(', text:')
    var promptPrefix = elements.join(' ');

    if(outputLanguage!==''){
      var translatedPromptPrefix = "";
      var examplePrompt = "Task: Translate the source text into Spanish.\nSource text: Paraphrase the following text targeting the audience of kids in Casual tone in Spanish, with keyword: young, future. Text:\nTarget text: Parafrasea el siguiente texto dirigido al público infantil en tono Casual en español, con palabra clave: joven, futuro. Texto:"
      var targetPrompt = '\nTask: Translate the source text into '+outputLanguage+':\nSource text:"'+promptPrefix+'"\nTarget text:\n';
      var prmpt = examplePrompt+targetPrompt;
      console.log(prmpt);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
          if (this.readyState === 4){
              // complete
              if (this.status === 200){
                  var jsonObj = JSON.parse(this.responseText);
                  console.log(jsonObj);
                  translatedPromptPrefix = jsonObj.choices[0].text;
                  translatedPromptPrefix = translatedPromptPrefix.trim().replace(/^"(.+(?="$))"$/,'$1');
                  console.log(translatedPromptPrefix);
                  promptTextarea.value = translatedPromptPrefix+paraContent;
              }
          }
      }
      xhttp.open("POST","https://api.openai.com/v1/completions");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.setRequestHeader("Authorization", "Bearer " + apiKeyInput);
      xhttp.send(JSON.stringify({
          "model": "text-davinci-002",
          "temperature": 0,
          "max_tokens": 500,
          "frequency_penalty":0,
          "presence_penalty": 0,
          "prompt": prmpt
      }),true);
    }else{
      elements.push(paraContent);
      prmpt = elements.join(' ');
      promptTextarea.value = prmpt;
    }
}

var genPromptBt = document.getElementById("genPromptBt");
genPromptBt.onclick = function(){
    generatePrompt();
}


// Result Block
function generateResult(){
    console.log('generateResult');
    var apiKeyInput = document.getElementById('apiKeyInput').value;
    var resultTextarea = document.getElementById('genResultTextarea');
    resultTextarea.value = 'Generating...';
    var model = document.getElementById('modelSelect').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;
    var prompt = document.getElementById('promptTextarea').value;
    if (prompt.length==0){
        alert('Prompt cannot be empty.');
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4){
            // complete
            if (this.status === 200){
                var jsonObj = JSON.parse(this.responseText);
                console.log(jsonObj);
                var resultStr = jsonObj.choices[0].text;
                resultTextarea.value = resultStr;
            }
        }
    }
    xhttp.open("POST","https://api.openai.com/v1/completions");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + apiKeyInput);
    xhttp.send(JSON.stringify({
        "model": model,
        "temperature": parseFloat(temperature),
        "max_tokens": parseInt(maxToken),
        "frequency_penalty":parseFloat(freqPenalty),
        "presence_penalty": parseFloat(presencePenalty),
        "prompt": prompt
    }),true);

}

var promptCpBt = document.getElementById("promptCpBt");
promptCpBt.onclick = function(){
    navigator.clipboard.writeText(promptTextarea.value);
}

var promptClrBt = document.getElementById("promptClrBt");
promptClrBt.onclick = function(){
    promptTextarea.value='';
}

var promptGenResultBt = document.getElementById("promptGenResultBt");
promptGenResultBt.onclick = function(){
    generateResult();
}


// Result Block

var genResultCpBt = document.getElementById("genResultCpBt");
genResultCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("genResultTextarea").value);
}

var genResultClrBt = document.getElementById("genResultClrBt");
genResultClrBt.onclick = function(){
    document.getElementById("genResultTextarea").value = "";
}
