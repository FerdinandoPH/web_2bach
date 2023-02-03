function SiguienteEscena(escena){
    //change the background image
    if (escena==1){
        document.body.style.backgroundImage = "url('img/trampa.png')";
        document.getElementById("texto").innerHTML = "¡Miras hacia arriba, y descubres con horror que el techo está lleno de pinchos, y están bajando lentamente!<br/>¡Tienes que darte prisa, o morirás!";
        document.getElementById("boton").onclick = function(){SiguienteEscena(2)};
    }
    else if (escena==2){
        document.body.style.backgroundImage = "url('img/puertadeoro.png')";
        document.getElementById("texto").innerHTML="Atraviesas el pasillo a toda velocidad, y llegas a una gran puerta dorada, pero está cerrada.";
        document.getElementById("boton").onclick = function(){window.location.href="puzzle.html"};
    }

}
