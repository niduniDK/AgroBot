from .intent_classifier import classify_intent
from llm.groq_client import identify_crop
from .get_crop_details import get_crop_details
from .get_disease_details import get_disease_details
from .get_pests_details import get_pest_details
from .handle_general_questions import handle_general_questions
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    history: list

@router.post("/chat")
def get_response(msg: ChatRequest) -> str:
    query = msg.query
    history = msg.history
    intent = classify_intent(query)
    if intent == 'crop_details':
        crop_name = identify_crop(query)
        return get_crop_details(crop_name, history)
    elif intent == 'disease_details':
        return get_disease_details(query,history)
    elif intent == 'pest_details':
        return get_pest_details(query, history)
    else:
        return handle_general_questions(query, history)