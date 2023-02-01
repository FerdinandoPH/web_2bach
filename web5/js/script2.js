function VolverAtras(){
    window.location.href="index.html";
}
function RatonenFlecha(dirflecha){
    //Change the image of the arrow to the animated gif
    //alert("Raton en "+dirflecha);
    document.getElementById(dirflecha).src="img/"+dirflecha+"anim.gif";
}
function RatonFueradeFlecha(dirflecha){
    //Change the image of the arrow to the static png
    //alert("Raton fuera de "+dirflecha);
    document.getElementById(dirflecha).src="img/"+dirflecha+".gif";
}
window.onload=function(){
document.getElementById("flechaizq").addEventListener("mouseover", function(){RatonenFlecha("flechaizq")});
document.getElementById("flechader").addEventListener("mouseover", function(){RatonenFlecha("flechader")});
document.getElementById("flechaizq").addEventListener("mouseout", function(){RatonFueradeFlecha("flechaizq")});
document.getElementById("flechader").addEventListener("mouseout", function(){RatonFueradeFlecha("flechader")});
document.getElementById("flechaizq").addEventListener("click", function(){window.location.href="caminoizq.html"});
document.getElementById("flechader").addEventListener("click", function(){window.location.href="caminoder.html"});
}