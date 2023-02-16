from revChatGPT.V1 import Chatbot
import websockets,asyncio,openai,traceback,os,json,logging,ssl
from serpapi import GoogleSearch
openai.api_key=os.getenv("OPENAI_API_KEY")
async def mandaMensage(websocket, path):
    print("ALGUIEN SE HA CONECTADO")
    palabras = await websocket.recv()
    listapalabras = palabras.split("YYY")
    print(listapalabras)
    print("Creando historia")
    historia=""
    sust=""
    prompthistoria=""
    promptimagen=""
    if listapalabras[6]=="hombre":
        promptimagen="Una fotografía a color de un campesino del antiguo Egipto con la corona de faraón en su cabeza, en unos campos en"+listapalabras[1]+", y con "+listapalabras[2]+" a su lado."
        prompthistoria="Crea una breve historia en la que el protagonista sea un campesino del antiguo egipto, llamado "+listapalabras[0]+" y de carácter "+listapalabras[5]+", que ha vuelto a su casa después de que un oráculo haya predicho que sería el futuro faraón. La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia el protagonista debe "+listapalabras[4]+". La historia debe acabar con el protagonista siendo nombrado faraón. Ten en cuenta que es muy inusual que un campesino se convierta en faraón así que para que la historia tenga sentido, el antiguo faraón tiene que retirarse (debido a su muerte y la falta de descendientes, una revolución, su abdicación, u otra circunstancia) y debe ocurrir algo extraordinario para que el protagonista sea elegido como nuevo faraón."
    elif listapalabras[6]=="mujer":
        prompthistoria="Crea una breve historia en la que la protagonista sea una campesina del antiguo Egipto, llamada "+listapalabras[0]+" y de carácter "+listapalabras[5]+", que ha vuelto a su casa después de que un oráculo haya predicho que sería la futura faraona. La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia la protagonista debe "+listapalabras[4]+". La historia debe acabar con la protagonista siendo nombrada faraona. Ten en cuenta que es muy inusual que una campesina se convierta en faraona así que para que la historia tenga sentido, el antiguo faraón tiene que retirarse (debido a su muerte y la falta de descendientes, una revolución, su abdicación, u otra circunstancia) y debe ocurrir algo extraordinario para que la protagonista sea elegida como nueva faraona."
        promptimagen="Una fotografía a color de una campesina del antiguo Egipto con la corona de faraona en su cabeza, en unos campos en"+listapalabras[1]+", y con "+listapalabras[2]+" a su lado."
    try:
        chatbot = Chatbot(config={"email":"fernandoperezholguin2005@gmail.com", "password":"Ferai2303"})
        for line in chatbot.ask(prompthistoria): 
            historia=line["message"]
            #print(line["choices"][0]["text"].replace("<|im_end|>", ""), end="")
            #sys.stdout.flush()
        print()
        print("Respuesta: "+historia)
        await websocket.send("H"+historia)
        print("Eligiendo sustantivos")
        for line in chatbot.ask("Escoge 5 sustantivos al azar del siguiente texto (asegúrate de que los sustantivos elegidos no aparezcan muy juntos los unos de los otros en el texto) y escríbelos en el orden en el que aparecen, separados por comas: "+historia):
            sust=line["message"]
        print(sust)
        await websocket.send("S"+sust)
        #'''
        print("Creando pictogramas")
        listasusts=sust.split(",")
        urlssust=[]
        for sustantivo in listasusts:
            params = {
                "q": sustantivo,
                "tbm": "isch",
                "ijn": "0",
                "tbs":"itp:animated,isz:m",
                "api_key": os.getenv("SERPAPI_API_KEY")
            }
            search = GoogleSearch(params)
            results = search.get_dict()
            images_results = results["images_results"][0]["original"]
            urlssust.append(images_results)
        print(urlssust)
        stringsust=""
        separador="YYY"
        for url in urlssust:
            stringsust+=url+separador
        await websocket.send("U"+stringsust)
        #'''
        print("Creando imagen")
        response = openai.Image.create(
            prompt=promptimagen,
            n=1,
            size="512x512"
        )
        image_url = response['data'][0]['url'] #type: ignore
        print(image_url)
        await websocket.send("I"+image_url)
        print("Todo listo :)")
    except Exception as e:
        print("Error: "+str(e))
        print("traceback: "+traceback.format_exc())
        await websocket.send("E")
    await websocket.close()
async def main():
    print("init")
    async with websockets.serve(mandaMensage, "93.189.88.242", 3333): #type: ignore
        await asyncio.Future()
asyncio.run(main())
