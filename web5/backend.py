from revChatGPT.V2 import Chatbot
import websockets,asyncio,openai,traceback,os,json,logging,ssl
openai.api_key=os.getenv("OPENAI_API_KEY")
async def mandaMensage(websocket, path):
    print("ALGUIEN ")
    palabras = await websocket.recv()
    listapalabras = palabras.split("YYY")
    print(listapalabras)
    print("Creando historia")
    historia=""
    try:
        chatbot = Chatbot(email="fernandoperezholguin2005@gmail.com", password="Ferai2303")
        async for line in chatbot.ask("Crea una breve historia en la que el (o la) protagonista sea un campesino/a del antiguo egipto, llamado "+listapalabras[0]+", que ha vuelto a su casa después de que un oráculo haya predicho que sería el futuro faraón. La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia el protagonista debe "+listapalabras[4]+". La historia debe acabar con el protagonista siendo nombrado faraón. Ten en cuenta que es muy inusual que un campesino se convierta en faraón así que para que la historia tenga sentido, el antiguo faraón tiene que retirarse (por muerte, revolución, abdicación, u otra circunstancia) y debe ocurrir algo extraordinario para que el protagonista sea elegido como nuevo faraón."): #type: ignore
            historia+=line["choices"][0]["text"].replace("<|im_end|>", "")
            #print(line["choices"][0]["text"].replace("<|im_end|>", ""), end="")
            #sys.stdout.flush()
        print()
        print("Respuesta: "+historia)
        await websocket.send("H"+historia)
        
        print("Creando imagen")
        response = openai.Image.create(
        prompt="Una imagen fotorrealista de un campesino egipcio con la corona de faraón en unos campos en"+listapalabras[1]+", con "+listapalabras[2]+" a su lado.",
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
    async with websockets.serve(mandaMensage, "93.189.88.242", 3333): #type: ignore
        await asyncio.Future()
asyncio.run(main())
