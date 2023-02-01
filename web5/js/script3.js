function Suena(){
    sonido=new Audio("fx/n.mp3");
    sonido.pause();
    sonido.loop=true;
    sonido.play();
}
window.onload=Suena;