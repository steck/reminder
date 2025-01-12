import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    TMDB_API_KEY = os.getenv('TMDB_API_KEY')
    TMDB_BASE_URL = "https://api.themoviedb.org/3"

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
