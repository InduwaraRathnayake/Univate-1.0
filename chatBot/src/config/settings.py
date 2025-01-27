import os
# from functools import lru_cache
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB settings
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
DB_NAME = 'Univate01'
COLLECTION_NAME = 'modules'

# API settings
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
MODEL_NAME = 'gemini-1.5-pro'

# CORS settings
CORS_ORIGINS = ["http://localhost:3000"]

# class Settings:
#     MONGODB_URI: str = os.getenv("MONGODB_URI")
#     GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")
#     ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
#     @property
#     def is_production(self):
#         return self.ENVIRONMENT == "production"

# @lru_cache()
# def get_settings():
#     return Settings() 