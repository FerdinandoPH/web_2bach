
async function NarraTexto(){
    var textoahablar="";
    var texto1="Hacía un <span style=\"color:blue; font-style:italic;\">frío de mil demonios</span>. Me había citado a las siete y cuarto en <a href=\"https://www.google.com/maps/place/San+Juan+de+Letr%C3%A1n/@19.4318824,-99.1419905,17.75z/data=!4m5!3m4!1s0x85d1fed4eba77d4f:0xa175581dc686c2f7!8m2!3d19.43158!4d-99.14125\" style=\"text-decoration: underline;\">la esquina de Venustiano Carranza y San Juan de Letrán</a>. No soy de esos hombres absurdos que adoran el reloj reverenciándolo como una deidad inalterable. Comprendo que el tiempo es elástico y que cuando le dicen a uno a las siete y cuarto, lo mismo da que sean las siete y media. Tengo <span style=\"font-size:x-large;\">un criterio amplio</span> para todas las cosas. Siempre he sido un hombre muy tolerante: un liberal de la buena escuela. Pero hay cosas que no se pueden aguantar por muy liberal que uno sea. Que yo sea puntual a las citas no obliga a los demás sino hasta cierto punto; pero ustedes reconocerán conmigo que ese punto <b>existe.</b><br/><img src=reloj.gif width=\"100px\" height=\"100px\">.";
    var texto2="Ya dije que hacía <span style=\"color:blue; font-weight:bold;\">un frío espantoso</span>. Y aquella condenada esquina abierta a todos los vientos. <span style=\"color:brown;\"> Las siete y media, las ocho menos veinte, las ocho menos diez, Las ocho.</span> Es natural que ustedes se pregunten que por qué no lo dejé plantado. La cosa es muy sencilla: yo soy un hombre <b>respetuoso de mi palabra</b>, un poco chapado a la antigua, si ustedes quieren, pero cuando digo una cosa, la cumplo. Héctor me había citado a las <b>siete y cuarto</b> y no me cabe en la cabeza el faltar a una cita.";
    var texto3="<span style=\"color:red;\">Las ocho y cuarto, las ocho y veinte, las ocho y veinticinco, las ocho y media, y Héctor sin venir.</span> Yo estaba <span style=\"color:blue; font-weight:bold;\">positivamente helado:</span> me dolían los pies, me dolían las manos, me dolía el pecho, me dolía el pelo. La verdad es que si hubiese llevado mi <span style=\"color:chocolate;\"> abrigo café,</span> lo más probable es que no hubiera sucedido nada. Pero ésas son cosas del destino y les aseguro que a las tres de la tarde, hora en que salí de casa, nadie podía suponer que se levantara <span style=\"text-decoration: underline;\">aquel viento.</span> <span style=\"color:red;\"><b>Las nueve menos veinticinco, las nueve menos veinte, las nueve menos cuarto.</b></span> Transido, <span style=\"color:purple;\">amoratado</span>. <br/><img src=frio.png width=\"90px\" height=\"150 px\">.";
    var texto4="Llegó a las <b style=\"text-decoration: underline;color:red;\">nueve menos diez</b>: tranquilo, sonriente y satisfecho. Con su <span style=\"color:rgb(116, 116, 116);\">grueso abrigo gris y sus guantes forrados:</span> <span style=\"font-style: italic;\">-¡Hola, mano!</span> Así, sin más. No lo pude remediar: <span style=\"text-decoration:underline;\"> lo empujé bajo el tren que pasaba</span> <br/><img src=\"vias.jpg\" width=\"192px\" height=\"108px\">.";
    var textos=[texto1,texto2,texto3,texto4];
    var parrafos=["para1","para2","para3","para4"];
    var cuenta=true;
    if ("speechSynthesis" in window) {
        var boton=document.getElementById("narrar");
        boton.innerHTML="Cancelar";
        boton.onclick=Cancelar;
        for (var i=0;i<parrafos.length;i++){
            document.getElementById(parrafos[i]).innerHTML="";
        }
        var narrador = new SpeechSynthesisUtterance();
        narrador.lang = "es-ES";
        for (var i=0;i<textos.length;i++){
            var parrafo=document.getElementById(parrafos[i]);
            for (var j=0;j<textos[i].length;j++){
                textoahablar+=textos[i][j];
                if (textos[i][j]=="<"){
                    cuenta=false;
                }
                if (textos[i][j]=="." && cuenta==true){
                    await Hablador(parrafo,narrador,textoahablar)
                    textoahablar="";  
                }
                if(textos[i][j]==">"){
                    cuenta=true;
                }
            }
        }
    }
    else{
        alert("Tu navegador no soporta la sintesis de voz");
        location.reload();
    }
}
async function Hablador(parrafo,narrador,textoahablar){
    console.log("hablando: "+textoahablar);
    parrafo.innerHTML+=textoahablar;
    narrador.text=textoahablar;
    speechSynthesis.speak(narrador);
    return new Promise(resolve => {narrador.onend = resolve;});
}
function Cancelar(){
    speechSynthesis.cancel();
    location.reload();
}
