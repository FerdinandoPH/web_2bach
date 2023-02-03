from revChatGPT import Official
chat=Official.Chatbot(api_key="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")

respuesta=chat.ask(input("Qué le preguntamos a chatgpt:"))
print(respuesta["choices"][0]["text"])

