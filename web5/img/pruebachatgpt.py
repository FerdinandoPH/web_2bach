from revChatGPT import Official
prueba=Official.Chatbot(api_key="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")
print(prueba.ask("Elabora un texto argumentativo a favor o en contra del capitalismo")["choices"][0]["text"])