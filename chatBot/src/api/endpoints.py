from fastapi import APIRouter, HTTPException
import logging

from src.models.schemas import Query, ChatResponse, BotConfig
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
    

@router.post("/configure", response_model=dict)
async def configure_bot(config: BotConfig):
    try:
        if config.temperature is not None:
            bot.set_temperature(config.temperature)
        if config.max_tokens is not None:
            bot.set_max_tokens(config.max_tokens)
        if config.system_prompt is not None:
            bot.update_system_prompt(config.system_prompt)
            
        return {"message": "Bot configuration updated successfully"}
    except Exception as e:
        logger.error(f"Error configuring bot: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/clear-history")
async def clear_history():
    try:
        bot.clear_chat_history()
        return {"message": "Chat history cleared successfully"}
    except Exception as e:
        logger.error(f"Error clearing chat history: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "healthy"}