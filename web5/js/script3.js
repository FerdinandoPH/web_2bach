var hola
function Suena(){
    sonido=new Audio("fx/n.mp3");
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

window.onload=function(){
    cuerpo=document.getElementById("cuerpo");
    hola=cuerpo.addEventListener("click", Suena);
    Suena();
}