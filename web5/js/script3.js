var hola;
var sonidoSON;
var tts=false;
textoavoz=new SpeechSynthesisUtterance();
speechSynthesis.cancel();
function Suena(){
    if (sonidoSON==true){
        sonido=new Audio("audio/n.mp3");
        sonido.pause();
        sonido.loop=true;
        try{
        sonido.play();
        document.getElementById("cuerpo").removeEventListener("click", Suena);
        }
        catch(err){
            console.log("Error: "+err);
        }
    }
}
function VolverAtras(){
    window.location.href="doscaminos.html?letra="+getComputedStyle(document.documentElement).getPropertyValue('--letrasize')+"&sonido="+sonidoSON+"&tts="+tts;
}
function Hablar(){
    if (tts==true){
        textoavoz.text=document.getElementById("intro").innerHTML;
        textoavoz.lang="es-ES";
        speechSynthesis.speak(textoavoz);
    }
}
function CogeArgs(){
    //Coge dos argumentos: letra y sonido
    var url_string = window.location.href;
    var url = new URL(url_string);
    var letra = url.searchParams.get("letra");
    var sonidoimport = url.searchParams.get("sonido");
    var ttsimport=url.searchParams.get("tts");
    if (letra!=null){
        document.documentElement.style.setProperty('--letrasize', letra);
    }
    if (sonidoimport!=null){
        if (sonidoimport=="true"){
            sonidoSON=true;
        }
        else{
            sonidoSON=false;
        }
    }
    if(ttsimport!=null){
        if (ttsimport=="true"){
            tts=true;
        }
        else{
            tts=false;
        }
    }
}
window.onload=function(){
    CogeArgs();
    Hablar();
    cuerpo=document.getElementById("cuerpo");
    hola=cuerpo.addEventListener("click", Suena);
    Suena();
}