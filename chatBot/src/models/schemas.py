from pydantic import BaseModel

class Query(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str 