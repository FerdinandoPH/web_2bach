'''
INSTRUCCIONES PARA USAR EL SERVIDOR:
A partir del 20/02/2023, voy a apagar mi servidor, asi que para que funcione el oráculo, es necesario ejecutar este programa en la máquina donde se esté viendo la web. Hay que seguir estas instrucciones:

1: Tener python (al menos 3.9) instalado y añadido al PATH
2: Dependencias que hay que instalar (las no mencionadas ya vienen con python):
    a: websockets (pip install websockets) y asyncio (pip install asyncio)
        para la conexión a internet
    b: openai (pip install openai)
        Se encarga de crear la historia y de contactar con DALL-E para generar la imagen del final. Es necesario crear una cuenta en https://openai.com/ para obtener la llave de la API en https://platform.openai.com/account/api-keys . 
        ...Una vez creada, ponla en el hueco marcado en el código (línea 121).
        ADVERTENCIA: Dall-E es de pago (1,6 céntimos por imagen), así que he comentado el código que lo utiliza
    c: spacy (pip install spacy)
        Se encarga de analizar la historia para encontrar los 5 sustantivos aleatorios de los que se harán los pictogramas
    d: serpapi (pip install google-search-results)
        Se encarga de buscar en google las imagenes para los pictogramas.
        Es necesario crear una cuenta en https://serpapi.com/ para obtener la llave de la API. Una vez creada, ponla en el hueco marcado en el código (línea 91). Se pueden hacer 100 peticiones al mes de forma gratuita.


Ojo, cuidado con que no se filtren las cuentas/claves API

3: Ejecutar el programa. La web tiene que estar en HTTP (no HTTPS) para que funcione la conexión


'''

try:
    import websockets,asyncio,openai,traceback,os,spacy,random
    from serpapi import GoogleSearch
except ImportError as e:
    print(e)
    import sys
    print("Faltan librerías, instálalas con pip install. Asegúrate de que tengas python añadido al PATH")
    sys.exit(1)
try:
    nlp = spacy.load("es_core_news_md")
except:
    print("No se ha encontrado el modelo de IA de spacy (analizador morfológico de texto). Descargando...")
    try:
        os.system("python -m spacy download es_core_news_md")
        nlp = spacy.load("es_core_news_md")
    except:
        import sys
        print("No se ha podido descargar el modelo de IA de spacy. Asegúrate de que tienes python añadido al PATH")
        sys.exit(1)
async def MandaMensaje(websocket, path):
    print("ALGUIEN SE HA CONECTADO")
    palabras = await websocket.recv()
    listapalabras = palabras.split("YYYTAMBIEN")
    print(listapalabras)
    print("Creando historia")
    historia=""
    prompthistoria=""
    promptimagen=""
    if listapalabras[6]=="hombre":
        promptimagen="Una fotografía a color de un campesino del antiguo Egipto con la corona de faraón en su cabeza, en unos campos en"+listapalabras[3]+", y con "+listapalabras[2]+" a su lado."
        prompthistoria="Crea una breve historia en la que el protagonista sea un campesino del antiguo egipto, llamado "+listapalabras[0]+" y de carácter "+listapalabras[5]+", que ha vuelto a su casa después de que un oráculo haya predicho que sería el futuro faraón. La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia el protagonista debe "+listapalabras[4]+". La historia debe acabar con el protagonista siendo nombrado faraón. Ten en cuenta que es muy inusual que un campesino se convierta en faraón, así que para que la historia tenga sentido, el antiguo faraón tiene que retirarse (debido a su muerte y la falta de descendientes, una revolución, su abdicación, u otra circunstancia) y debe ocurrir algo extraordinario para que el protagonista sea elegido como nuevo faraón."
    elif listapalabras[6]=="mujer":
        prompthistoria="Crea una breve historia en la que la protagonista sea una campesina del antiguo Egipto, llamada "+listapalabras[0]+" y de carácter "+listapalabras[5]+", que ha vuelto a su casa después de que un oráculo haya predicho que sería la futura faraona. La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia la protagonista debe "+listapalabras[4]+". La historia debe acabar con la protagonista siendo nombrada faraona. Ten en cuenta que es muy inusual que una campesina se convierta en faraona, así que para que la historia tenga sentido, el antiguo faraón tiene que retirarse (debido a su muerte y la falta de descendientes, una revolución, su abdicación, u otra circunstancia) y debe ocurrir algo extraordinario para que la protagonista sea elegida como nueva faraona."
        promptimagen="Una fotografía a color de una campesina del antiguo Egipto con la corona de faraona en su cabeza, en unos campos en"+listapalabras[3]+", y con "+listapalabras[2]+" a su lado."
    try:
        cuentacuentos=openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role":"system","content":"Ten en cuenta que tienes que pretender que tú eres el oráculo que cuenta la historia"},
                {"role":"user","content":prompthistoria}
            ]
        )
        historia=cuentacuentos['choices'][0]['message']['content']
        print()
        print("Respuesta: "+historia)
        await websocket.send("H"+historia)
        print("Eligiendo sustantivos")
        historia_analizada=nlp(historia)
        lista_sustantivos=[]
        for token in historia_analizada:
            if token.pos_ == 'NOUN' and token.text not in lista_sustantivos:
                lista_sustantivos.append(token.text)
        while len(lista_sustantivos)>5:
            lista_sustantivos.pop(random.randint(0,len(lista_sustantivos)-1))
        print(lista_sustantivos)
        await websocket.send("S"+",".join(lista_sustantivos))
        print("Creando pictogramas")
        urls_sustantivos=[]
        for sustantivo in lista_sustantivos:
            params = {
                "q": sustantivo,
                "tbm": "isch",
                "ijn": "0",
                "tbs":"itp:animated,isz:m",
                "api_key": os.getenv("SERPAPI_API_KEY") #PON TU CLAVE API DE SERPAPI AQUÍ
            }
            search = GoogleSearch(params)
            results = search.get_dict()
            images_results = results["images_results"][0]["original"]
            urls_sustantivos.append(images_results)
        print(urls_sustantivos)
        string_sustantivos=""
        separador="YYYTAMBIEN"
        for url in urls_sustantivos:
            string_sustantivos+=url+separador
        await websocket.send("U"+string_sustantivos)
        #Sección comentada porque es de pago
        # print("Creando imagen")
        # response = openai.Image.create(
        #     prompt=promptimagen,
        #     n=1,
        #     size="512x512"
        # )
        # image_url = response['data'][0]['url'] #type: ignore
        # print(image_url)
        # await websocket.send("I"+image_url)
        print("Todo listo :)")
    except Exception as e:
        print("Error: "+str(e))
        print("traceback: "+traceback.format_exc())
        await websocket.send("E")
        await websocket.close()
    await websocket.close()
async def main():
    openai.api_key=os.getenv("OPENAI_API_KEY") #PON TU CLAVE API DE OPENAI AQUÍ
    print("Servidor iniciado")
    async with websockets.serve(MandaMensaje, "localhost", 3333): #type: ignore
        await asyncio.Future()
asyncio.run(main())
