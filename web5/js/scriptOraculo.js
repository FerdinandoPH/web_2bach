var sonido=true;
var tts=false;
textoavoz=new SpeechSynthesisUtterance();
speechSynthesis.cancel();
audio=new Audio("audio/oraculo.mp3");
var letra;
var sustantivos=[];
function ContinuaIntro (p){
    if(p==1){
        document.getElementById("oraculo").style.visibility="visible";
        document.getElementById("textoIntro").innerHTML="¿Pero que tenemos aqui? ¿Un humano? Ha pasado mucho tiempo desde la ultima vez que alguien vino aqui. El ultimo en venir fue el bisabuelo del faraon actual, que vino a preguntarme si su descendencia seguiria gobernando Egipto.<br/>Cuando le dije que el proximo en llegar seria el nuevo faraon, mando instalar trampas y cubrir el templo de arena. Pero lo que veo siempre es acertado, y alguien ha logrado llegar. Ese eres tu";
        Hablar();
        document.getElementById("botonIntro").onclick=function(){ContinuaIntro(2)};
    }
    else if(p==2){
        document.getElementById("textoIntro").innerHTML="¿Como? ¿Quieres saber como te convertiras en faraon? De acuerdo, pero para darte mas detalles necesito que me cuentes mas cosas sobre ti";
        Hablar();
        document.getElementById("botonIntro").onclick=function(){AbreFormulario()};
    }
}
function AbreFormulario(){
    speechSynthesis.cancel();
    document.getElementById("formulario").style.display="block";
    document.getElementById("intro").style.visibility="hidden";
}
function CambiaSize(haciadonde){
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
function CogeArgs(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    letra = url.searchParams.get("letra");
    var sonidoimport = url.searchParams.get("sonido");
    var ttsimport=url.searchParams.get("tts");
    
    if (letra!=null){
        document.documentElement.style.setProperty('--letrasize', letra);
        document.getElementById("tamletrap").innerHTML="Letra: "+letra+"<button style=\"font-size: 20px;\"onclick=\"CambiaSize(true)\">+</button> <button style=\"font-size: 20px;\"onclick=\"CambiaSize(false)\">-</button>";
        console.log("Letra: "+letra);
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
        if (document.getElementById("resultado").innerHTML.length<1)
            textoavoz.text=document.getElementById("textoIntro").innerHTML;
        else
            textoavoz.text=document.getElementById("resultado").innerHTML;
        textoavoz.lang="es-ES";
        speechSynthesis.speak(textoavoz);
    }
}
function PreparaEnvio(){
    palabras=""
    todas=true;
    for (i=1;i<=6;i++){
        if (document.getElementById("pregunta"+i).value==""){
            todas=false;
        }
        else{
            palabras+=document.getElementById("pregunta"+i).value;
            if (i<6){
                palabras+="YYY";
            }
        }
    }
    if(document.querySelector('input[name="genero"]:checked')!=null){
        palabras+="YYY"+document.querySelector('input[name="genero"]:checked').value;
    }
    else{
        todas=false;
    }
    if (todas){
        document.getElementById("formulario").style.display="none";
        document.getElementById("intro").style.visibility="visible";
        document.getElementById("textoIntro").innerHTML="Mmm, muy interesante. ¿Estas listo para conocer tu futuro?<br/><p style=\"color: red;\">ADVERTENCIA: A PARTIR DEL 20/02/2023 VOY A APAGAR EL SERVIDOR. SI QUIERES LA HISTORIA, VISITA <a style=\"color:blue;\" href=\"https://github.com/FerdinandoPH/web_2bach\">ESTA PÁGINA</a> PARA LAS INSTRUCCIONES NECESARIAS PARA EJECUTAR EL BACKEND DE FORMA LOCAL</p>";
        document.getElementById("botonIntro").onclick=function(){Generar(palabras)};
        document.getElementById("botonIntro").innerHTML="Si";
    }
    else{
        alert("Debes responder todas las preguntas");
    }
}
function BorrarTexto(){
    for (i=1;i<=6;i++){
        document.getElementById("pregunta"+i).value="";
    }
}
function ErrorHandler(error){
    document.getElementById("textoIntro").innerHTML="Vaya, parece que ha habido una perturbacion en mi vision. ¿Podrias volver a intentarlo?";
    Hablar();
    document.getElementById("botonIntro").onclick=function(){AbreFormulario()};
    document.getElementById("botonIntro").innerHTML="Intentarlo de nuevo";
    document.getElementById("intro").style.visibility="visible";
}
function ColocaPictografia(urls) {
    var listaurls=urls.split("YYY");
    var textoHistoria=document.getElementById("resultado").innerHTML;
    for (i=0;i<sustantivos.length;i++){
        patron=new RegExp(sustantivos[i],"gi");
        textoHistoria=textoHistoria.replace(patron,sustantivos[i]+"<img src=\""+listaurls[i]+"\" class=\"picto\" id=\"picto"+i+"\"/>");
    }
    document.getElementById("resultado").innerHTML=textoHistoria;

}
function Generar(mensaje){
    audio.volume=1;
    speechSynthesis.cancel();
    document.getElementById("textoIntro").innerHTML="<br/>";
    document.getElementById("main").style.visibility="hidden";
    document.getElementById("intro").style.visibility="hidden";
    console.log(mensaje);
    try{
        let socket= new WebSocket("ws://93.189.88.242:3333"); // Cambiar a ws://localhost:3333 tras el 20/02/2023
        socket.onopen=function(event){
            socket.send(mensaje);
            document.body.style.backgroundImage="url('img/procesando.gif')";
        }
        socket.onmessage=function(event){
            audio.volume=0.3;
            document.getElementById("main").style.visibility="visible";
            document.getElementById("botonIntro").onclick=function(){window.location.href="index.html"};
            document.getElementById("botonIntro").innerHTML="Volver al inicio";
            document.getElementById("intro").style.visibility="visible";
            document.body.style.backgroundImage="url('img/oraculoTemplo.jpg')";
            if (event.data[0]=="E"){
                ErrorHandler(event);
            }
            else if (event.data[0]=="H"){
                

                console.log(event.data.substring(1));
                document.getElementById("resultado").innerHTML=event.data.substring(1)+"<br/>Esta es una visión de parte de tu futuro:";
                if(tts==true){
                    speechSynthesis.cancel();
                    textoavoz.text=event.data.substring(1);
                    textoavoz.lang="es-ES";
                    speechSynthesis.speak(textoavoz);
                }
            }
            else if (event.data[0]=="I"){
                var link=event.data.substring(1);
                document.getElementById("imagenhistoria").style.visibility="visible";
                document.getElementById("imagenhistoria").src=link;
            }
            else if(event.data[0]=="S"){
                sustantivos=event.data.substring(1).split(", ");
                console.log("Sustantivos: "+event.data.substring(1));
            }
            else if(event.data[0]=="U"){
                console.log("URLs: "+event.data.substring(1));
                ColocaPictografia(event.data.substring(1));
            }
        }
        socket.onerror=function(event){
            document.getElementById("main").style.visibility="visible";
            audio.volume=0.2;
            ErrorHandler(event);
        }
    }
    catch(error){
        document.getElementById("main").style.visibility="visible";
        ErrorHandler(error);
    }
}
function CambiaSonido(){
    if (document.getElementById("sonidoC").checked){
        sonido=true;
        audio.currentTime=0;
        audio.loop=true;
        audio.volume=0.2;
        audio.play();
    }
    else{
        sonido=false;
        audio.pause();
    }
}
function CambiaTTS(){
    if (document.getElementById("textoavoz").checked){
        tts=true;
        Hablar();
    }
    else{
        tts=false;
        speechSynthesis.cancel();
    }
}
window.onload=function(){
    CogeArgs();
    Hablar();
    document.getElementById("imagenhistoria").visibility="hidden";
    if(sonido==true){
        audio.loop=true;
        audio.volume=0.2;
        audio.play();
        document.getElementById("sonidoC").checked=true;
    }
    if (tts==true)
        document.getElementById("textoavoz").checked=true;
    if (location.protocol == 'https:'){
        alert("Este sitio web no funciona correctamente en https. Por favor, accede a la versión http.");
    }
}