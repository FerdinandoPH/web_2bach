function ContinuaIntro (p){
    if(p==1){
        //hola
    }
}
function Generar(){
    var mensaje=document.getElementById("palabra1").value+"YYY"+document.getElementById("palabra2").value+"YYY"+document.getElementById("palabra3").value;
    console.log(mensaje);
    let socket= new WebSocket("ws://localhost:3333");
    socket.onopen=function(event){
        socket.send(mensaje);
        document.body.style.backgroundImage="url('img/procesando.gif')";
    }
    socket.onmessage=function(event){
        document.body.style.backgroundImage="url('img/oraculoTemplo.jpg')";
        if (event.data[0]=="H"){
            console.log(event.data.substring(1));
            document.getElementById("resultado").innerHTML=event.data.substring(1);
        }
        else if (event.data[0]=="I"){
            var link=event.data.substring(1);
            document.getElementById("imagenhistoria").src=link;
        }
    }
}