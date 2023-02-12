var sonido=true;
var tts=false;
textoavoz=new SpeechSynthesisUtterance();
speechSynthesis.cancel();
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
            sonido=true;
        }
        else{
            sonido=false;
        }
    }
    if (ttsimport!=null){
        if (ttsimport=="true"){
            tts=true;
        }
        else{
            tts=false;
        }
    }
}
function Hablar(){
    if (tts==true){
        textoavoz.text=document.getElementById("intro").innerHTML;
        textoavoz.lang="es-ES";
        speechSynthesis.speak(textoavoz);
    }
}
function VolverAlPuzzle(){
    window.location.href="puzzle.html?letra="+getComputedStyle(document.documentElement).getPropertyValue('--letrasize')+"&sonido="+sonido+"&tts="+tts;
}
window.onload=function(){
    CogeArgs();
    Hablar();
    if(sonido==true){
        audio=new Audio("audio/gameover.mp3");
        audio.play();
    }
}