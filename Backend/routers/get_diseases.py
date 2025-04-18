from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import requests
import os

load_dotenv()

router = APIRouter()

API_KEY = os.getenv('API_KEY')
API_URL = f"https://perenual.com/api/pest-disease-list?key={API_KEY}"

class Disease(BaseModel):
    id: int
    common_name: str
    image_url: str

    class Config:
        orm_mode = True


@router.get("/disease_list", response_model=List[Disease])
def get_diseases_list():
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        data = response.json()
        diseases = [Disease(
            id=disease['id'],
            common_name=disease['common_name'],
            image_url=disease['images'][0]['regular_url'] if disease.get('images') else ""
        ) for disease in data['data']]
        return diseases
    except requests.RequestException as e:
        print(f"Error fetching data from API: {e}")
        return []