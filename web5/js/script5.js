var posicionesbien=[["0px","0px"],["149px","0px"],["298px","0px"],["0px","149px"],["149px","149px"],["298px","149px"],["0px","298px"],["149px","298px"],["298px","298px"]];
var posiciones=[...posicionesbien];
var piezas=[];
var seleccionado=null;
var tiempo=15;
class Pieza{
    constructor(id,pos){
        this.id = id;
        this.pos=pos;
    }
}
function sumapx(pix,num){
    var num1=parseInt(pix);
    var num2=parseInt(num);
    var suma=num1+num2;
    return suma+"px";
}
function ColocaPiezas(){
    var offsetx=766;
    var offsety=100;
    for (var i=0;i<9;i++){
        document.getElementById("i"+(i+1)).style.left=sumapx(piezas[i].pos[0],offsetx);
        document.getElementById("i"+(i+1)).style.top=sumapx(piezas[i].pos[1],offsety);
    }
}
function Comprueba(){
    var bien=true;
    for (var i=0;i<9;i++){
        if (piezas[i].pos[0]!=posicionesbien[i][0] || piezas[i].pos[1]!=posicionesbien[i][1]){
            bien=false;
        }
    }
    return bien;
}
function Clickado(id){
    if (seleccionado==null){
        seleccionado=id;
        document.getElementById(id).style.border="5px solid red";
    }
    else{
        var id1=parseInt(seleccionado.substring(1));
        var id2=parseInt(id.substring(1));
        var aux=piezas[id1-1].pos;
        piezas[id1-1].pos=piezas[id2-1].pos;
        piezas[id2-1].pos=aux;
        ColocaPiezas();
        document.getElementById(seleccionado).style.border="none";
        seleccionado=null;
        if (Comprueba()){
            alert("¡Has ganado!");
        }
    }
}
function Mostrarpiezas(mostrar){
    for (var i=0;i<9;i++){
        if (mostrar){
            document.getElementById("i"+(i+1)).style.display="block";
        }
        else{
            document.getElementById("i"+(i+1)).style.display="none";
        }
    }
}
function timeUpdate(){
    tiempo--;
    var medidor=document.getElementById("tiempomet");
    medidor.value=tiempo;
    var texto=document.getElementById("tiempotext");
    texto.innerHTML="Tiempo restante: "+tiempo;
    if(tiempo<=0){
        window.location.href="gameover.html";
    }
}
function ComenzarJuego(){
    Mostrarpiezas(true);
    document.getElementById("intro").style.display="none";
    document.getElementById("ui").style.opacity="1";
    var intervalo=setInterval(timeUpdate,1000);
}
function Inicio(){
    //Hay 9 piezas, cada una con un id y una posición
    posiciones.sort(function() {return Math.random() - 0.5});
    for (var i=0;i<9;i++){
        piezas[i]=new Pieza(i+1,posiciones[i]);
        document.getElementById("i"+(i+1)).addEventListener("click",function(){Clickado(this.id)});
    }
    ColocaPiezas();
    Mostrarpiezas(false);
}
window.onload=Inicio;
