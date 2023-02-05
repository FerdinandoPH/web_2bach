from revChatGPT import Official
import websockets,asyncio,base64,openai
#chat=Official.Chatbot(api_key=str(base64.b64decode(b'c2stclo3TVU3c20zcW5QYzZvU0k3V0FUM0JsYmtGSm52OEo4S1gwSjlMSWh0bjR3Q0pF')))
#openai.api_key="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"
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