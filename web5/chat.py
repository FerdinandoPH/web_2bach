from revChatGPT import Official
import websockets,asyncio,base64,openai
chat=Official.Chatbot(api_key="")
async def mandaMensage(websocket, path):
    print("ALGUIEN ")
    palabras = await websocket.recv()
    listapalabras = palabras.split("YYY")
    print(listapalabras)
    print("Creando historia")
    historia=chat.ask("Crea una breve historia que incluya los siguientes elementos: "+listapalabras[0]+listapalabras[1]+listapalabras[2])["choices"][0]["text"]
    print(historia)
    await websocket.send("H"+historia)
    print("Creando imagen")
    response = openai.Image.create(
    prompt=historia,
    n=1,
    size="512x512"
    )
    image_url = response['data'][0]['url']
    print(image_url)
    await websocket.send("I"+image_url)
    await websocket.close()
async def main():
    print("init")
    async with websockets.serve(mandaMensage, "localhost", 3333):
        await asyncio.Future()
asyncio.run(main())
#'''

#'''