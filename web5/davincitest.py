import os
import openai
openai.api_key = "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"
resultado=openai.Completion.create(
  model="text-davinci-003",
  prompt="Cuenta una breve historia sobre un gato llamado Tiziano",
  max_tokens=500,
  temperature=0
)
print(resultado)
print(resultado["choices"][0]["text"]) #type: ignore