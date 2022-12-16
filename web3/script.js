var cuenta=false;
var letraNegra;
var displayNegra
var letraRoja = [];
var tiempos=[1,2,3,4,5,6,7,8,9,10];
var yahechos=[];
function CambiaLetra(letra){
    var neg= document.getElementById("letranegra");
    var roj= document.getElementById("letraroja");
    roj.innerHTML += letraNegra[letra];
    //letranegra desde i hasta el final
    displayNegra.shift();
    neg.innerHTML=displayNegra.join("");
    
}
function clockUpdate(){
    var tiempo = document.getElementById("audio").currentTime.toFixed(2);
    console.log(tiempo)
    for (var i=0; i<tiempos.length; i++){
        if(tiempo>=tiempos[i] && !yahechos.includes(tiempos[i])){
            CambiaLetra(i);
            yahechos.push(tiempos[i]);
        }
    }
}
function SeparaLetra(){
    var letrac = document.getElementById("letranegra").innerHTML;
    var frase="";
    var letraSeparada = [];
    for (var i = 0; i < letrac.length; i++) {
        frase+=letrac[i];
        if(letrac[i] == ">"){
            letraSeparada.push(frase);
            frase="";
        }
    }
    for (var i=1; i<letraSeparada.length; i++){
        //Quita el espacio en blanco al principio de cada elemento
        letraSeparada[i]=letraSeparada[i].substring(1);
    }
    return letraSeparada;
}
function HoradelKaraoke(){
    //Crea un reloj que vaya a tiempo con la canción
    //Cuando el reloj llegue a ciertos tiempos, se ejecutará una función

    //Cuando el reloj llegue a un tiempo de los tiempos de la lista tiempos, se ejecutará la función "CambiaLetra"
    setInterval(clockUpdate,1000/30);
}
function setup(){
    document.getElementById("audio").addEventListener("play", HoradelKaraoke);
    console.log(SeparaLetra());
    letraNegra=SeparaLetra();
    displayNegra=letraNegra;
}
//Ejecuta la función "HoradelKaraoke" cuando se inicie el audio con el id "audio"
window.onload =setup;

