#Utilizado para borrar los acentos, que dan problemas con la fuente
import os,sys
def quitaAcentos(texto):
    texto=texto.replace("á","a")
    texto=texto.replace("é","e")
    texto=texto.replace("í","i")
    texto=texto.replace("ó","o")
    texto=texto.replace("ú","u")
    texto=texto.replace("ü","u")
    texto=texto.replace("Á","A")
    texto=texto.replace("É","E")
    texto=texto.replace("Í","I")
    texto=texto.replace("Ó","O")
    texto=texto.replace("Ú","U")
    texto=texto.replace("Ü","U")
    return texto
for root, dirs, files in os.walk("./web5"):
    for file in files:
        if file.endswith(".html") or file.endswith(".css") or file.endswith(".js"):
            if file!="quitaAcentos.py" and file!="backend.py" and file!=".git" and "caillouref" not in root:
                #print(os.path.join(root, file))
                archivo=open(os.path.join(root, file), "r", encoding="utf-8")
                texto=archivo.read()
                archivo.close()
                if "ñ" in texto:
                    print(file+" tiene ñ")
                texto=quitaAcentos(texto)
                archivo=open(os.path.join(root, file), "w", encoding="utf-8")
                archivo.write(texto)
                archivo.close()
    