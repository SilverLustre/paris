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
document.getElementById("productNameInput").value = getSavedValue("productNameInput");
document.getElementById("toneInput").value = getSavedValue("toneInput");
document.getElementById("targetAudienceInput").value = getSavedValue("targetAudienceInput");
document.getElementById("outputLanguageInput").value = getSavedValue("outputLanguageInput");
document.getElementById("typeInput").value = getSavedValue("typeInput");
document.getElementById("genModelInput").value = getSavedValue("genModelInput");

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
var productNameClrBt = document.getElementById("productNameClrBt");
productNameClrBt.onclick = function(){
  document.getElementById("productNameInput").value = '';
  localStorage.setItem("productNameInput", '');
}

var toneClrBt = document.getElementById("toneClrBt");
toneClrBt.onclick = function(){
    document.getElementById("toneInput").value = '';
    localStorage.setItem("toneInput", '');
}

var targetAudienceClrBt = document.getElementById("targetAudienceClrBt");
targetAudienceClrBt.onclick = function(){
    document.getElementById("targetAudienceInput").value = '';
    localStorage.setItem("targetAudienceInput", '');
}

var outputLanguageClrBt = document.getElementById("outputLanguageClrBt");
outputLanguageClrBt.onclick = function(){
    document.getElementById("outputLanguageInput").value = '';
    localStorage.setItem("outputLanguageInput", '');
}

var typeClrBt = document.getElementById("typeClrBt");
typeClrBt.onclick = function(){
    document.getElementById("typeInput").value = '';
    localStorage.setItem("typeInput", '');
}

var genModelInputClrBt = document.getElementById("genModelInputClrBt");
genModelInputClrBt.onclick = function(){
    document.getElementById("genModelInput").value = '';
    localStorage.setItem("genModelInput", '');
}

//Product Description Block

var contentCpBt = document.getElementById("contentCpBt");
contentCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("contentTextarea").value);
}

var contentClrBt = document.getElementById("contentClrBt")
contentClrBt.onclick = function(){
  document.getElementById("contentTextarea").value = '';
  localStorage.setItem("contentTextarea", '');
}


function generatePrompt(){
    console.log("generatePrompt");

    var productName = document.getElementById("productNameInput").value;
    var tone = document.getElementById("toneInput").value;
    var targetAudience = document.getElementById("targetAudienceInput").value;
    var outputLanguage = document.getElementById("outputLanguageInput").value;
    var typeInput = document.getElementById("typeInput").value;
    var productDescription = document.getElementById("contentTextarea").value;

    if (productName===''){
        alert('You must input product name!');
        return;
    }
    if (typeInput===''){
        alert('You must input type!');
        return;
    }
    if (productDescription===''){
        alert('You must input basic description!');
        return;
    }

    var elements = [];
    elements = ['write an amazing'];
    if (typeInput!==''){
        elements.push(typeInput);
    }
    elements.push('description about "');
    if(productName!==''){
        elements.push(productName);
        elements.push('"')
    }
    if(productDescription!==''){
        elements.push('which can be described as "');
        elements.push(productDescription);
        elements.push('"')
    }

    if (tone!==''){
      elements.push('in');
      elements.push(tone);
      elements.push('tone');
    }
    if (targetAudience!==''){
        elements.push(',targeting the audience of');
        elements.push(targetAudience);
    }
    if(outputLanguage!==''){
        elements.push(',in')
        elements.push(outputLanguage)
    }
    elements[elements.length-1] += '.';

    promptTextarea.value = elements.join(' ');
    localStorage.setItem("promptTextarea", promptTextarea.value);
}

var genPromptBt = document.getElementById("genPromptBt");
genPromptBt.onclick = function(){
    generatePrompt();
}


// Prompt Block
function generateDescription(){
    console.log('generateResult');
    var apiKeyInput = document.getElementById('apiKeyInput').value;
    var resultTextarea = document.getElementById('genResultTextarea');
    var genModel = document.getElementById('genModelInput').value;
    var maxToken = document.getElementById('maxTokenInput').value;
    var temperature = document.getElementById('tempInput').value;
    var presencePenalty = document.getElementById('presencePenaltyInput').value;
    var freqPenalty = document.getElementById('freqPenaltyInput').value;
    var prompt = document.getElementById('promptTextarea').value;
    if (prompt.length==0){
        alert('Prompt cannot be empty.');
        return;
    }
    if (genModel === ''){
        alert('You must specify the generation model.');
        return;
    }

    resultTextarea.value = 'Generating...';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4){
            // complete
            if (this.status === 200){
                var jsonObj = JSON.parse(this.responseText);
                console.log(jsonObj);
                var resultStr = jsonObj.choices[0].text;
                resultTextarea.value = resultStr;
                localStorage.setItem("genResultTextarea", resultTextarea.value);
            }else if (Math.floor(this.status/100)===4){
                resultTextarea.value = '';
                localStorage.setItem("genResultTextarea", '');
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("POST","https://api.openai.com/v1/completions");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + apiKeyInput);
    xhttp.send(JSON.stringify({
        "model": genModel,
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
    localStorage.setItem("promptTextarea", '');
}

var promptGenDescriptionBt = document.getElementById("promptGenDescriptionBt");
promptGenDescriptionBt.onclick = function(){
    generateDescription();
}


// Result Block

var genResultCpBt = document.getElementById("genResultCpBt");
genResultCpBt.onclick = function(){
    navigator.clipboard.writeText(document.getElementById("genResultTextarea").value);
}

var genResultClrBt = document.getElementById("genResultClrBt");
genResultClrBt.onclick = function(){
    document.getElementById("genResultTextarea").value = "";
    localStorage.setItem("genResultTextarea", '');
}
