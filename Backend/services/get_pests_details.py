import os
from dotenv import load_dotenv
import requests
from llm.gemini_client import generate_response

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_URL = 'https://perenual.com/api/pest-pest-list?key={API_KEY}'

def get_pest_details(query: str, history: list) -> str:
    try:
        response = requests.get(API_URL.format(API_KEY=API_KEY))
        response.raise_for_status()
        data = response.json()
        pest = identify_pest(query, history)
        pest_details = {}
        if pest:
            for item in data['data']:
                if item['common_name'].lower() == pest.lower() or item['scientific_name'].lower() == pest.lower() and item['type'] == 'pest':
                    pest_details.update(item)
        
        prompt = f"""
        You are AgroBot, an AI assistant for agriculture. Give conscise and informative explanation about {pest} using {pest_details} Give step by step process for remedies.
"""
        chat_response = generate_response(prompt, history)
        return chat_response
    except Exception as e:
        print(f"Error fetching pest details: {e}")
        return "Sorry, I couldn't fetch the pest details at the moment. Please try again later."


def identify_pest(query: str, history: list) -> str:
    prompt = f"""
    You are AgroBot an AI assistant for agriculture. Your task is to identify the pest based on the user queries.
    Give only the pest name in the response.
    Query: "{query}"
    Pest:"""

    response = generate_response(prompt, history)
    if response:
        return response.strip()
    else:
        return None