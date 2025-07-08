import os
from dotenv import load_dotenv
import requests
from llm.gemini_client import generate_response

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_URL = 'https://perenual.com/api/pest-disease-list?key={API_KEY}'

def get_crop_details(crop_name: str) -> str:
    try:
        response = requests.get(API_URL.format(API_KEY=API_KEY))
        response.raise_for_status()
        data = response.json()
        crop_details = {}
        for item in data['data']:
            if item['plants']['common_name'].lower() == crop_name.lower():
                crop_details.update(item)
        query = f"Provide detailed information about {crop_name} using {crop_details}"
        chat_response = generate_response(query)
        return chat_response
    except Exception as e:
        print(f"Error fetching crop details: {e}")
        return "Sorry, I couldn't fetch the crop details at the moment. Please try again later."