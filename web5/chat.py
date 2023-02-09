try:
    from revChatGPT import Official
    import websockets,asyncio,openai
except Exception as e:
    import os,sys
    print("Error: ",e)
    '''
    print("Faltan paquetes")
    os.system("pip3 install websockets")
    os.system("pip3 install asyncio")
    os.system("pip3 install openai")
    os.system("pip3 install revChatGPT")
    print("instalados")
    '''
    sys.exit()
    
chat=Official.Chatbot(api_key="")
async def mandaMensage(websocket, path):
    print("ALGUIEN ")
    palabras = await websocket.recv()
    listapalabras = palabras.split("YYY")
    print(listapalabras)
    print("Creando historia")
    historia=chat.ask("Crea una breve historia que incluya los siguientes elementos: "+listapalabras[0]+", "+listapalabras[1]+", y "+listapalabras[2],temperature=0.6)["choices"][0]["text"]
    print(historia)
    await websocket.send("H"+historia)
    '''
    print("Creando imagen")
    response = openai.Image.create(
    prompt=historia,
    n=1,
    size="512x512"
    )
    image_url = response['data'][0]['url']
    print(image_url)
    await websocket.send("I"+image_url)
    '''
    await websocket.close()
async def main():
    print("init")
    async with websockets.serve(mandaMensage, "localhost", 44445): #type: ignore
        await asyncio.Future()
asyncio.run(main())
#'''

#'''