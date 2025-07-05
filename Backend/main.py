import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import get_diseases, user_authentication

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5174', 'http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
)

app.include_router(get_diseases.router, prefix='/diseases', tags=['Diseases'])
app.include_router(user_authentication.router, prefix='/user', tags=['Authentication'])

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)