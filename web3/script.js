var sigueletra=true;;
var letraNegra;
var lastScroll = 0;
var tiempos=[6.83, 13.31, 17.77, 24.9, 29.06, 33.86, 39.29, 55.79, 57.48, 60.7, 64.36, 70.33, 77.14, 83.06, 86.26, 89.51, 92.68, 99.04, 101.79, 105.43, 109.08, 115.04, 121.64, 127.47, 130.79, 134.02, 136.74, 143.55, 146.41, 153.96, 160.26, 163.4, 165.91, 169.2, 172.45, 175.73, 179.33, 185.15, 188.5, 192.04, 194.29, 204.49, 207.71, 214.11, 220.52, 226.93];
var intervalid;
function clockUpdate(){
    var tiempo = document.getElementById("audio").currentTime.toFixed(2);
    var neg= document.getElementById("letranegra");
    var roj= document.getElementById("letraroja");
    var pas= document.getElementById("letrapasada");
    var main= document.getElementById("main");
    var cont=[...letraNegra];
    var act=[];
    var prev=[];
    for (var i=0; i<tiempos.length; i++){
        if(tiempo>=tiempos[i]){
            prev.push(letraNegra[i]);
            cont.splice(0,1);
        }
    }
    act=[prev.pop()];
    neg.innerHTML=cont.join("");
    roj.innerHTML=act.join("");
    pas.innerHTML=prev.join("");
    var currentScroll = main.scrollTop;
    if(currentScroll < lastScroll) {
        sigueletra=false;
        document.getElementById("vealfinal").style.display="block";
    }
    lastScroll = currentScroll;
    if(sigueletra){
        roj.scrollIntoView({block:'end'});
    }
    else{

    }
}
function VeAlFinal(){
    roj.scrollIntoView({block:'end'});
    sigueletra=true;
    document.getElementById("vealfinal").style.display="none";
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
    intervalid=setInterval(clockUpdate,1000/60);
}
function SeHaParaoElKaraoke(){
    clearInterval(intervalid);
}
function setup(){
    document.getElementById("audio").addEventListener("play", HoradelKaraoke);
    document.getElementById("audio").addEventListener("pause", SeHaParaoElKaraoke);
    console.log(SeparaLetra());
    letraNegra=SeparaLetra();
    document.getElementById("vealfinal").style.display="none";
}

window.onload =setup;