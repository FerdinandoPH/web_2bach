speechSynthesis.cancel();
function DosCaminos(){
    window.location.href="doscaminos.html?letra="+getComputedStyle(document.documentElement).getPropertyValue('--letrasize')+"&sonido="+document.getElementById("sonido").checked+"&tts="+document.getElementById("textoavoz").checked;
}
function CambiaSize(haciadonde){
    //Change the letrasize variable of the existing font.css
    var letra=getComputedStyle(document.documentElement).getPropertyValue('--letrasize');
    if (haciadonde==true){
        var letrafinal=(parseInt(letra)+2).toString()+"px";
    }
    else{
        var letrafinal=(parseInt(letra)-2).toString()+"px";
    }
    document.documentElement.style.setProperty('--letrasize', letrafinal);
    document.getElementById("tamletrap").innerHTML="Letra: "+letrafinal+"<button style=\"font-size: 20px;\"onclick=\"CambiaSize(true)\">+</button> <button style=\"font-size: 20px;\"onclick=\"CambiaSize(false)\">-</button>";
}