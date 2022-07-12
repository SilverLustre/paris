function selectToUrl(e){
    if (e.value === 'textGeneration'){
        window.location = "./";
    }else if(e.value === 'summarization'){
        window.location = "./summarize.html";
    }else if(e.value === 'paraphrase'){
        window.location = "./paraphrase.html";
    }else if(e.value === 'replyToEmail'){
        window.location = "./email.html";
    }else if(e.value === 'translation'){
        window.location = "./translation.html";
    }else if(e.value === 'productDescription'){
        window.location = "./product.html";
    }
}