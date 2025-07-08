from llm.groq_client import query_qroq

def classify_intent(query: str) -> str:
    prompt = f"""
    You are an expert in classifying user queries into specific intents.
    Classify the following query  into one of the following intents:
    [crop_details, disease_details, pest_details, general_questions]

    For example:
    Query: "What is the best environment for growing tomatoes?
    Intent: crop_details

    Query: "There are brown spots on my leaves, what should I do?"
    Intent: disease_details

    Query: "How do I get rid of aphids on my plants?"
    Intent: pest_details

    Query: "What is the best crops for Weligama?"
    Intent: general_questions

    Query:"{query}"
    Intent:
"""
    response = query_qroq(prompt)
    if response:
        return response.strip().lower()
    else:
        return "general_questions"