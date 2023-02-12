var sonido=true;
var tts=false;
textoavoz=new SpeechSynthesisUtterance();
speechSynthesis.cancel();
function VolverAtras(){
    window.location.href="index.html";
}
function Hablar(){
    if(tts==true){
        textoavoz.lang="es-ES";
        textoavoz.text=document.getElementById("intro").innerHTML;
        speechSynthesis.speak(textoavoz);
    }
}
function RatonenFlecha(dirflecha){
    //Change the image of the arrow to the animated gif
    //alert("Raton en "+dirflecha);
    document.getElementById(dirflecha).src="img/"+dirflecha+"anim.gif";
}
function RatonFueradeFlecha(dirflecha){
    //Change the image of the arrow to the static png
    //alert("Raton fuera de "+dirflecha);
    document.getElementById(dirflecha).src="img/"+dirflecha+".gif";
}
function CogeArgs(){
    //Coge dos argumentos: letra y sonido
    var url_string = window.location.href;
    var url = new URL(url_string);
    var letra = url.searchParams.get("letra");
    var sonidoimport = url.searchParams.get("sonido");
    var ttsimport = url.searchParams.get("tts");
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
window.onload=function(){
    document.getElementById("flechaizq").addEventListener("mouseover", function(){RatonenFlecha("flechaizq")});
    document.getElementById("flechader").addEventListener("mouseover", function(){RatonenFlecha("flechader")});
    document.getElementById("flechaizq").addEventListener("mouseout", function(){RatonFueradeFlecha("flechaizq")});
    document.getElementById("flechader").addEventListener("mouseout", function(){RatonFueradeFlecha("flechader")});
    document.getElementById("flechaizq").addEventListener("click", function(){window.location.href="caminoizq.html?letra="+getComputedStyle(document.documentElement).getPropertyValue('--letrasize')+"&sonido="+sonido+"&tts="+tts});
    document.getElementById("flechader").addEventListener("click", function(){window.location.href="caminoder.html?letra="+getComputedStyle(document.documentElement).getPropertyValue('--letrasize')+"&sonido="+sonido+"&tts="+tts});
    CogeArgs();
    Hablar();
}