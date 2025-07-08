import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)
gemini_client = genai.GenerativeModel("gemini-2.0-flash")

def generate_response(query: str, history: list) -> str:
    prompt = (
        f"You are AgroBot, an AI assistant for agriculture. "
        f"Answer the user questions in a concise and informative manner. "
        f"Use simple words that can be understood by a person with poor literacy.Give the response line by line. Use the {history} to understand messages.\n"
        f"Question: {query}\nResponse:"
    )
    try:
        response = gemini_client.generate_content(prompt)
        if hasattr(response, "text") and response.text:
            return response.text.strip()
        else:
            return "Sorry, something went wrong. Please try again later."
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Sorry, something went wrong. Please try again later."