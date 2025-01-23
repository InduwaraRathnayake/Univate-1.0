from fastapi import APIRouter, HTTPException
import logging

from src.models.schemas import Query, ChatResponse
from src.services.course_bot import CourseBot

logger = logging.getLogger(__name__)
router = APIRouter()
bot = None

@router.on_event("startup")
async def startup_event():
    global bot
    try:
        bot = CourseBot()
        logger.info("CourseBot initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize CourseBot: {str(e)}")
        raise

@router.post("/chat", response_model=ChatResponse)
async def chat(query: Query):
    try:
        logger.info(f"Received query: {query.message}")
        
        if not bot:
            raise HTTPException(status_code=500, detail="ChatBot not initialized")
            
        response = bot.generate_response(query.message)
        logger.info(f"Generated response successfully")
        
        return ChatResponse(response=response)
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 