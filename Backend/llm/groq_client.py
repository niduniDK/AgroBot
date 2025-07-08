import requests
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_MODEL = 'llama3-70b-8192'

def query_qroq(prompt: str) -> str:
    response = requests.post(
        'https://api.groq.com/openai/v1/chat/completions',
        headers = {
            'Authorization': f"Bearer {GROQ_API_KEY}",
            'Content-type': 'application/json'
        },
        json={
            'model': GROQ_MODEL,
            'messages': [{'role': 'user', 'content': prompt}],
            'temperature':0.0
        }
    )

    if response.ok:
        data = response.json()
        return data['choices'][0]['message']['content']
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return "Error in API request"
    
def identify_crop(query: str) -> str:
    prompt = f"""
    You are an expert on identifying crops based on user queries.
    For example, Query: "What is the best environment for growing tomatoes?"
    Crop: "Tomato"
    Identify the crop from the following query:
    Query: "{query}"
    Crop:
"""
    response = requests.post(
        'https://api.groq.com/openai/v1/chat/completions',
        headers = {
            'Authorization': f"Bearer {GROQ_API_KEY}",
            'Content-type': 'application/json'
        },
        json={
            'model': GROQ_MODEL,
            'messages': [{'role': 'user', 'content': prompt}],
            'temperature': 0.0
        }
    )
    if response.ok:
        data = response.json()
        return data['choices'][0]['message']['content']
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return "Error in API request"