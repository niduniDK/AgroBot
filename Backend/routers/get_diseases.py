from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi import Form
import shutil
import uuid
from PIL import Image
import numpy as np
from pydantic import BaseModel
from typing import List, Dict
from dotenv import load_dotenv
import requests
import os
import joblib
from tensorflow.keras.models import load_model
import json

load_dotenv()

router = APIRouter()

API_KEY = os.getenv('API_KEY')
API_URL = f"https://perenual.com/api/pest-disease-list?key={API_KEY}"

with open('F:\My Projects\AgroBot\Backend\class_labels.json','r') as f:
    class_labels = json.load(f)

disease_prediction_model = load_model('F:\My Projects\AgroBot\Backend\ml_models\disease_detection_model.h5')

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
    

@router.post('/predict_disease')
def predict_disease(
    file: UploadFile = File(...)
):
    try:
        temp_filename = f"temp_{uuid.uuid4()}.jpg"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        print(1)
        print(f"File loaded: {temp_filename}")
        img = Image.open(temp_filename).convert("RGB").resize((128, 128))
        img_array = np.array(img) / 255.0
        img_array = img_array.reshape(1, 128, 128, 3)


        pred_idx = disease_prediction_model.predict(img_array).argmax(axis=1)[0]
        pred = class_labels[pred_idx]
        os.remove(temp_filename)  

        return JSONResponse(content={"prediction": pred})
    except Exception as e:
        print(f"Error predicting disease: {e}")
        return JSONResponse(content={"error": "Failed to predict disease"}, status_code=500)