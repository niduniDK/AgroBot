from llm.gemini_client import generate_response

def handle_general_questions(query: str, history: list) -> str:
    prompt = f"""
You are AgroBot, an AI assistant for agriculture.Answer the user questions in a concise and informative manner. Use simple words that can be understood by a person with poor literacy.
Question: {query}
Response:
    """
    return generate_response(prompt, history)