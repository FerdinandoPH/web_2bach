#Replace á,é,í,ó,ú with a,e,i,o,u in all files inside the web5 folder ending in .html, .css or .js, except for this file, "backend.py" and the git folder. Include subfolders as well
import os,sys
def quitaAcentos(texto):
    texto=texto.replace("á","a")
    texto=texto.replace("é","e")
    texto=texto.replace("í","i")
    texto=texto.replace("ó","o")
    texto=texto.replace("ú","u")
    texto=texto.replace("Á","A")
    texto=texto.replace("É","E")
    texto=texto.replace("Í","I")
    texto=texto.replace("Ó","O")
    texto=texto.replace("Ú","U")
    return texto
for root, dirs, files in os.walk("./web5"):
    for file in files:
        if file.endswith(".html") or file.endswith(".css") or file.endswith(".js"):
            if file!="quitaAcentos.py" and file!="backend.py" and file!=".git":
                print(os.path.join(root, file))
                archivo=open(os.path.join(root, file), "r", encoding="utf-8")
                texto=archivo.read()
                archivo.close()
                texto=quitaAcentos(texto)
                archivo=open(os.path.join(root, file), "w", encoding="utf-8")
                archivo.write(texto)
                archivo.close()
    