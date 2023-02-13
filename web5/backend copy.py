from revChatGPT.V2 import Chatbot
import websockets,asyncio,openai,traceback,os,json,logging,ssl
logging.basicConfig()
openai.api_key=os.getenv("OPENAI_API_KEY")
ssl_context=ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
currdir=os.path.dirname(os.path.abspath(__file__))
ssl_cert=currdir+"\\keys\\fullchain.pem"
ssl_key=currdir+"\\keys\\privkey.pem"
ssl_context.load_cert_chain(ssl_cert,ssl_key)
async def mandaMensage(websocket, path):
    print("ALGUIEN ")
    palabras = await websocket.recv()
    listapalabras = palabras.split("YYY")
    print(listapalabras)
    print("Creando historia")
    historia=""
    try:
        chatbot = Chatbot(email="fernandoperezholguin2005@gmail.com", password="Ferai2303")
        async for line in chatbot.ask("Crea una breve historia en la que el (o la) protagonista sea un campesino/a del antiguo egipto llamado "+listapalabras[0]+". La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia el protagonista debe "+listapalabras[4]+". La historia debe acabar con el protagonista siendo nombrado faraón"): #type: ignore
            historia+=line["choices"][0]["text"].replace("<|im_end|>", "")
            #print(line["choices"][0]["text"].replace("<|im_end|>", ""), end="")
            #sys.stdout.flush()
        print()
        print("Respuesta: "+historia)
        await websocket.send("H"+historia)
        
        print("Creando imagen")
        response = openai.Image.create(
        prompt=historia if len(historia)<1000 else historia[:998],
        n=1,
        size="512x512"
        )
        image_url = response['data'][0]['url'] #type: ignore
        print(image_url)
        await websocket.send("I"+image_url)
    except Exception as e:
        print("Error: "+str(e))
        print("traceback: "+traceback.format_exc())
        await websocket.send("E")
    await websocket.close()
async def main():
    print("init")
    async with websockets.serve(mandaMensage, "93.189.88.242", 443,ssl=ssl_context): #type: ignore
        await asyncio.Future()
asyncio.run(main())
