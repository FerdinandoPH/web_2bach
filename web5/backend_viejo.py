#VERSION ANTICUADA, NO USAR






# from revChatGPT.V1 import Chatbot
# import websockets,asyncio,openai,traceback,os
# from serpapi import GoogleSearch
# async def MandaMensaje(websocket, path):
#     print("ALGUIEN SE HA CONECTADO")
#     palabras = await websocket.recv()
#     listapalabras = palabras.split("YYYTAMBIEN")
#     print(listapalabras)
#     print("Creando historia")
#     historia=""
#     sust=""
#     prompthistoria=""
#     promptimagen=""
#     if listapalabras[6]=="hombre":
#         promptimagen="Una fotografía a color de un campesino del antiguo Egipto con la corona de faraón en su cabeza, en unos campos en"+listapalabras[3]+", y con "+listapalabras[2]+" a su lado."
#         prompthistoria="Crea una breve historia en la que el protagonista sea un campesino del antiguo egipto, llamado "+listapalabras[0]+" y de carácter "+listapalabras[5]+", que ha vuelto a su casa después de que un oráculo haya predicho que sería el futuro faraón. La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia el protagonista debe "+listapalabras[4]+". La historia debe acabar con el protagonista siendo nombrado faraón. Ten en cuenta que es muy inusual que un campesino se convierta en faraón así que para que la historia tenga sentido, el antiguo faraón tiene que retirarse (debido a su muerte y la falta de descendientes, una revolución, su abdicación, u otra circunstancia) y debe ocurrir algo extraordinario para que el protagonista sea elegido como nuevo faraón."
#     elif listapalabras[6]=="mujer":
#         prompthistoria="Crea una breve historia en la que la protagonista sea una campesina del antiguo Egipto, llamada "+listapalabras[0]+" y de carácter "+listapalabras[5]+", que ha vuelto a su casa después de que un oráculo haya predicho que sería la futura faraona. La historia debe ocurrir en "+listapalabras[3]+". En algún punto de la historia debe aparecer el siguiente animal: "+listapalabras[2]+", y el número "+listapalabras[1]+". Además, en algún momento de la historia la protagonista debe "+listapalabras[4]+". La historia debe acabar con la protagonista siendo nombrada faraona. Ten en cuenta que es muy inusual que una campesina se convierta en faraona así que para que la historia tenga sentido, el antiguo faraón tiene que retirarse (debido a su muerte y la falta de descendientes, una revolución, su abdicación, u otra circunstancia) y debe ocurrir algo extraordinario para que la protagonista sea elegida como nueva faraona."
#         promptimagen="Una fotografía a color de una campesina del antiguo Egipto con la corona de faraona en su cabeza, en unos campos en"+listapalabras[3]+", y con "+listapalabras[2]+" a su lado."
#     try:
#         chatbot = Chatbot(config={"email":"PON TU EMAIL DE OPENAI AQUÍ", "password":"PON TU CONTRASEÑA DE OPENAI AQUÍ"})
#         for line in chatbot.ask(prompthistoria): 
#             historia=line["message"]
#             #print(line["choices"][0]["text"].replace("<|im_end|>", ""), end="")
#             #sys.stdout.flush()
#         print()
#         print("Respuesta: "+historia)
#         await websocket.send("H"+historia)
#         print("Eligiendo sustantivos")
#         for line in chatbot.ask("Escoge 5 sustantivos al azar del siguiente texto (asegúrate de que los sustantivos elegidos no aparezcan muy juntos los unos de los otros en el texto) y escríbelos tal y como aparecen en el texto (es decir, que las mayúsculas y las minúsculas coincidan con cómo aparecen en el texto) y en el orden en el que aparecen, separados por comas y sin punto al final: "+historia):
#             sust=line["message"]
#         print(sust)
#         await websocket.send("S"+sust.replace('.',''))
#         #'''
#         print("Creando pictogramas")
#         listasusts=sust.split(",")
#         urlssust=[]
#         for sustantivo in listasusts:
#             params = {
#                 "q": sustantivo,
#                 "tbm": "isch",
#                 "ijn": "0",
#                 "tbs":"itp:animated,isz:m",
#                 "api_key": "PON TU CLAVE API DE SERPAPI AQUÍ"
#             }
#             search = GoogleSearch(params)
#             results = search.get_dict()
#             images_results = results["images_results"][0]["original"]
#             urlssust.append(images_results)
#         print(urlssust)
#         stringsust=""
#         separador="YYYTAMBIEN"
#         for url in urlssust:
#             stringsust+=url+separador
#         await websocket.send("U"+stringsust)
#         #'''
#         ''' Sección comentada porque es de pago
#         print("Creando imagen")
#         response = openai.Image.create(
#             prompt=promptimagen,
#             n=1,
#             size="512x512"
#         )
#         image_url = response['data'][0]['url'] #type: ignore
#         print(image_url)
#         await websocket.send("I"+image_url)
#         '''
#         print("Todo listo :)")
#     except Exception as e:
#         print("Error: "+str(e))
#         print("traceback: "+traceback.format_exc())
#         await websocket.send("E")
#     await websocket.close()
# async def main():
#     openai.api_key="PON TU CLAVE API DE OPENAI AQUÍ"
#     print("init")
#     async with websockets.serve(MandaMensaje, "localhost", 3333): #type: ignore
#         await asyncio.Future()
# asyncio.run(main())
