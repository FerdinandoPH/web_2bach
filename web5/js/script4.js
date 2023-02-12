var sonido=true;
var tts=false;
textoavoz=new SpeechSynthesisUtterance();
speechSynthesis.cancel();
audio = new Audio();
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
    if(ttsimport!=null){
        if (ttsimport=="true"){
            tts=true;
        }
        else{
            tts=false;
        }
    }
}
function Hablar(){
    if(tts==true){
        speechSynthesis.cancel();
        textoavoz.text=document.getElementById("texto").innerHTML;
        textoavoz.lang="es-ES";
        speechSynthesis.speak(textoavoz);
    }
}
function SiguienteEscena(escena){
    //change the background image
    if (escena==1){
        document.body.style.backgroundImage = "url('img/trampa.jpg')";
        document.getElementById("texto").innerHTML = "¡Miras hacia arriba, y descubres con horror que el techo esta lleno de pinchos, y estan bajando lentamente!<br/>¡Tienes que darte prisa, o moriras!";
        Hablar();
        if(sonido==true){
            audio.src="audio/trampa.mp3";
            audio.play();
        }
        document.getElementById("boton").onclick = function(){SiguienteEscena(2)};
    }
    else if (escena==2){
        document.body.style.backgroundImage = "url('img/puertadeoro.png')";

        document.getElementById("texto").innerHTML="Atraviesas el pasillo a toda velocidad, y llegas a una gran puerta dorada, pero esta cerrada.";
        Hablar();
        document.getElementById("boton").onclick = function(){window.location.href="puzzle.html?letra="+getComputedStyle(document.documentElement).getPropertyValue('--letrasize')+"&sonido="+sonido+"&tts="+tts};
    }

}
window.onload=function(){
    CogeArgs();
    Hablar();
}
