var sonido=true;
textoavoz=new SpeechSynthesisUtterance();
speechSynthesis.cancel();
function ContinuaIntro (p){
    if(p==1){
        document.getElementById("oraculo").style.display="block";
        document.getElementById("textoIntro").innerHTML="¿Pero que tenemos aqui? ¿Un humano? Ha pasado mucho tiempo desde la ultima vez que alguien vino aqui. El ultimo en venir fue el bisabuelo del faraon actual, que vino a preguntarme si su descendencia seguria gobernando Egipto.<br/>Cuando le dije que el proximo en llegar seria el nuevo faraon, mando instalar trampas y cubrir el templo de arena. Pero lo que veo siempre es acertado, y hete ahora aqui, ya sabes cual es tu destino";
        Hablar();
        document.getElementById("botonIntro").onclick=function(){ContinuaIntro(2)};
    }
    else if(p==2){
        document.getElementById("textoIntro").innerHTML="¿Como? ¿Quieres saber como te convertiras en faraon? De acuerdo, pero para mas detalles necesito que me cuentes cosas sobre ti";
        Hablar();
        document.getElementById("botonIntro").onclick=function(){AbreFormulario()};
    }
}
function AbreFormulario(){
    speechSynthesis.cancel();
    document.getElementById("formulario").style.display="block";
    document.getElementById("intro").style.display="none";
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
    if (tts==true){
        speechSynthesis.cancel();
        textoavoz.text=document.getElementById("textoIntro").innerHTML;
        textoavoz.lang="es-ES";
        speechSynthesis.speak(textoavoz);
    }
}
function PreparaEnvio(){
    palabras=""
    todas=true;
    for (i=1;i<=5;i++){
        if (document.getElementById("pregunta"+i).value==""){
            todas=false;
        }
        else{
            palabras+=document.getElementById("pregunta"+i).value;
            if (i<5){
                palabras+="YYY";
            }
        }
    }
    if (todas){
        document.getElementById("formulario").style.display="none";
        document.getElementById("intro").style.display="block";
        document.getElementById("textoIntro").innerHTML="Mmm, muy interesante. ¿Estas listo para conocer tu futuro?";
        Hablar();
        document.getElementById("botonIntro").onclick=function(){Generar(palabras)};
        document.getElementById("botonIntro").innerHTML="Si";
    }
    else{
        alert("Debes responder todas las preguntas");
    }
}
function BorrarTexto(){
    for (i=1;i<=5;i++){
        document.getElementById("pregunta"+i).value="";
    }
}
function ErrorHandler(error){
    document.getElementById("textoIntro").innerHTML="Vaya, parece que ha habido una perturbacion en mi vision. ¿Podrias volver a intentarlo?";
    Hablar();
    document.getElementById("botonIntro").onclick=function(){AbreFormulario()};
    document.getElementById("botonIntro").innerHTML="Intentarlo de nuevo";
    document.getElementById("botonIntro").style.display="block";
}
function Generar(mensaje){
    speechSynthesis.cancel();
    document.getElementById("textoIntro").innerHTML="";
    document.getElementById("botonIntro").style.display="none";
    console.log(mensaje);
    try{
        let socket= new WebSocket("ws://93.189.88.242:3333");
        socket.onopen=function(event){
            socket.send(mensaje);
            document.body.style.backgroundImage="url('img/procesando.gif')";
        }
        socket.onmessage=function(event){
            document.getElementById("botonIntro").onclick=function(){window.location.href="index.html"};
            document.getElementById("botonIntro").innerHTML="Volver al inicio";
            document.getElementById("botonIntro").style.display="block";
            document.body.style.backgroundImage="url('img/oraculoTemplo.jpg')";
            if (event.data[0]=="E"){
                ErrorHandler(event);
            }
            else if (event.data[0]=="H"){
                

                console.log(event.data.substring(1));
                document.getElementById("resultado").innerHTML=event.data.substring(1);
                if(tts==true){
                    speechSynthesis.cancel();
                    textoavoz.text=event.data.substring(1);
                    textoavoz.lang="es-ES";
                    speechSynthesis.speak(textoavoz);
                }
            }
            else if (event.data[0]=="I"){
                var link=event.data.substring(1);
                document.getElementById("imagenhistoria").style.display="block";
                document.getElementById("imagenhistoria").src=link;
            }
        }
        socket.onerror=function(event){
            ErrorHandler(event);
        }
    }
    catch(error){
        ErrorHandler(error);
    }
}
window.onload=function(){
    CogeArgs();
    Hablar();
    document.getElementById("imagenhistoria").style.display="none";
}