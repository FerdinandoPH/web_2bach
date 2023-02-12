function ContinuaIntro (p){
    if(p==1){
        document.getElementById("oraculo").style.display="block";
        document.getElementById("textoIntro").innerHTML="¿Pero qué tenemos aquí? ¿Un humano? Ha pasado mucho tiempo desde la última vez que alguien vino aquí. El último en venir fue el bisabuelo del faraón actual, que vino a preguntarme si su descendencia seguría gobernando Egipto.<br/>Cuando le dije que el próximo en llegar sería el nuevo faraón, mandó instalar trampas y cubrir el templo de arena. Pero lo que veo siempre es acertado, y hete ahora aquí, ya sabes cuál es tu destino";
        document.getElementById("botonIntro").onclick=function(){ContinuaIntro(2)};
    }
    else if(p==2){
        document.getElementById("textoIntro").innerHTML="¿Cómo? ¿Quieres saber cómo te convertirás en faraón? De acuerdo, pero para más detalles necesito que me cuentes cosas sobre ti";
        document.getElementById("botonIntro").onclick=function(){AbreFormulario()};
    }
}
function AbreFormulario(){
    document.getElementById("formulario").style.display="block";
    document.getElementById("intro").style.display="none";
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
        document.getElementById("textoIntro").innerHTML="Mmm, muy interesante. ¿Estás listo para conocer tu futuro?";
        document.getElementById("botonIntro").onclick=function(){Generar(palabras)};
        document.getElementById("botonIntro").innerHTML="Sí";
    }
    else{
        alert("Debes responder todas las preguntas");
    }
}
function Generar(mensaje){
    console.log(mensaje);
    let socket= new WebSocket("ws://93.189.88.242:3333");
    socket.onopen=function(event){
        socket.send(mensaje);
        document.body.style.backgroundImage="url('img/procesando.gif')";
    }
    socket.onmessage=function(event){
        document.getElementById("botonIntro").onclick=function(){window.location.href="index.html"};
        document.getElementById("botonIntro").innerHTML="Volver al inicio";
        document.body.style.backgroundImage="url('img/oraculoTemplo.jpg')";
        if (event.data[0]=="E"){
            document.getElementById("textoIntro").innerHTML="Vaya, parece que ha habido una perturbación en mi visión. ¿Podrías volver a intentarlo?";
            document.getElementById("botonIntro").onclick=function(){AbreFormulario()};
            document.getElementById("botonIntro").innerHTML="Intentarlo de nuevo";
        }
        else if (event.data[0]=="H"){
            console.log(event.data.substring(1));
            document.getElementById("resultado").innerHTML=event.data.substring(1);
        }
        else if (event.data[0]=="I"){
            var link=event.data.substring(1);
            document.getElementById("imagenhistoria").src=link;
        }
    }
}