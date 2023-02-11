from revChatGPT import Official
import websockets,asyncio,base64,openai
chat=Official.Chatbot(api_key="")
async def mandaMensage(websocket, path):
    print("ALGUIEN ")
    palabras = await websocket.recv()
    listapalabras = palabras.split("YYY")
    print(listapalabras)
    print("Creando historia")
    historia=chat.ask("Crea una breve historia en la que el (o la) protagonista sea un campesino/a del antiguo egipto llamado "+listapalabras[0]+". La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer "+listapalabras[5]+", "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia el protagonista debe "+listapalabras[4]+". La historia debe acabar con el protagonista siendo nombrado faraón",temperature=0.7)["choices"][0]["text"]
    print(historia)
    await websocket.send("H"+historia)
    '''
    print("Creando imagen")
    response = openai.Image.create(
    prompt=historia,
    n=1,
    size="512x512"
    )
    image_url = response['data'][0]['url'] #type: ignore
    print(image_url)
    await websocket.send("I"+image_url)
    '''
    await websocket.close()
async def main():
    print("init")
    async with websockets.serve(mandaMensage, "localhost", 44445): #type: ignore
        await asyncio.Future()
asyncio.run(main())
