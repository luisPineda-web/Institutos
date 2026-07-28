"""
Chatbot básico usando la API de Anthropic (Claude).

Requisitos:
    pip install anthropic

Configuración:
    Necesitas una API key de Anthropic. Consíguela en:
    https://console.anthropic.com/

    Luego, configúrala como variable de entorno:
        Windows (PowerShell):  $env:ANTHROPIC_API_KEY="tu-api-key-aqui"
        Mac/Linux (bash):      export ANTHROPIC_API_KEY="tu-api-key-aqui"

Uso:
    python chatbot_basico.py
"""

import os
from anthropic import Anthropic

# --- Configuración del agente ---
MODELO = "claude-sonnet-4-6"  # Modelo a usar
SYSTEM_PROMPT = (
    "Eres un asistente amable y útil. Respondes de forma clara y concisa "
    "en español, salvo que el usuario te escriba en otro idioma."
)


def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("⚠️  No encontré la variable de entorno ANTHROPIC_API_KEY.")
        print("Configúrala antes de correr este script (ver instrucciones arriba).")
        return

    client = Anthropic(api_key=api_key)

    # Aquí guardamos el historial de la conversación
    historial = []

    print("🤖 Chatbot básico (escribe 'salir' para terminar)\n")

    while True:
        entrada_usuario = input("Tú: ").strip()

        if entrada_usuario.lower() in ("salir", "exit", "quit"):
            print("¡Hasta luego! 👋")
            break

        if not entrada_usuario:
            continue

        # Agregamos el mensaje del usuario al historial
        historial.append({"role": "user", "content": entrada_usuario})

        try:
            respuesta = client.messages.create(
                model=MODELO,
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                messages=historial,
            )

            texto_respuesta = respuesta.content[0].text
            print(f"\nAgente: {texto_respuesta}\n")

            # Agregamos la respuesta del agente al historial también
            historial.append({"role": "assistant", "content": texto_respuesta})

        except Exception as e:
            print(f"\n⚠️ Ocurrió un error al llamar a la API: {e}\n")


if __name__ == "__main__":
    main()