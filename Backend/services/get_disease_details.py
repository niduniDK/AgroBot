import os
from dotenv import load_dotenv
import requests
from llm.gemini_client import generate_response

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_URL = 'https://perenual.com/api/pest-disease-list?key={API_KEY}'

def get_disease_details(query: str, history: list) -> str:
    try:
        response = requests.get(API_URL.format(API_KEY=API_KEY))
        response.raise_for_status()
        data = response.json()
        disease = identify_disease(query, history)
        disease_details = {}
        if disease:
            for item in data['data']:
                if item['common_name'].lower() == disease.lower() or item['scientific_name'].lower() == disease.lower() and item['type'] == 'disease':
                    disease_details.update(item)
        
        prompt = f"""
        You are AgroBot, an AI assistant for agriculture. Give conscise and informative explanation about {disease} using {disease_details} Give step by step process for remedies.
"""
        chat_response = generate_response(prompt, history)
        return chat_response
    except Exception as e:
        print(f"Error fetching disease details: {e}")
        return "Sorry, I couldn't fetch the disease details at the moment. Please try again later."


def identify_disease(query: str, history: list) -> str:
    prompt = f"""
    You are AgroBot an AI assistant for agriculture. Your task is to identify the disease based on the user queries.
    Give only the disease name in the response.
    Query: "{query}"
    Disease:"""
    response = generate_response(prompt, history)
    if response:
        return response.strip()
    else:
        return None