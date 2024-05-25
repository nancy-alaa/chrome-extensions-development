const tags = document.getElementsByClassName("roundbox sidebox borderTopRound");

if(tags){
    for(let i=0; i<tags.length; i++){
        if(tags[i].innerHTML.includes("Problem tags")){
            tags[i].setAttribute('id', 'problemTags');
            tags[i].style.display = 'none';
        }
    }
}

