from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
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
    scientific_name: str
    other_names: List[str]
    family: str
    image_url: str
    descriptions: List[Dict[str, str]]
    solutions: List[Dict[str, str]]

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
            scientific_name=disease['scientific_name'],
            other_names=[name for name in disease['other_name']] if disease.get('other_name') else [],
            family=disease['family'] if disease.get('family') else "",
            image_url=disease['images'][0]['regular_url'] if disease.get('images') else "",
            descriptions=[{"subtitle": item["subtitle"], "description":item["description"]} for item in disease['description']],
            solutions=[{"subtitle": item["subtitle"], "description":item["description"]} for item in disease['solution']]
        ) for disease in data['data']]
        return diseases
    except requests.RequestException as e:
        print(f"Error fetching data from API: {e}")
        return []