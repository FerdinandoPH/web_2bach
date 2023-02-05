let socket= new WebSocket("ws://localhost:3333");
socket.onopen=function(event){
socket.send("regaloYYYlamparaYYYgenioYYYprueba");
}
socket.onmessage=function(event){
    if (event.data[0]=="H")
        console.log(event.data.substring(1));
    else if (event.data[0]=="I"){
        var link=event.data.substring(1);
        document.getElementById("imagenhistoria").src=link;
    }
}