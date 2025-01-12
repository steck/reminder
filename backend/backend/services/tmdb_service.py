import os
import requests
from typing import List, Dict, Any
from flask import current_app

class TMDBService:
    """Service for interacting with TMDB API"""
    
    @staticmethod
    def get_popular_movies(page: int = 1) -> List[Dict[str, Any]]:
        """Get popular movies from TMDB
        
        Args:
            page (int): Page number to fetch
            
        Returns:
            List[Dict[str, Any]]: List of movie dictionaries
        """
        url = f"{current_app.config['TMDB_BASE_URL']}/movie/popular"
        headers = {
            'Authorization': f'Bearer {current_app.config["TMDB_API_KEY"]}',
            'accept': 'application/json'
        }
        params = {
            'page': page
        }
        
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json().get('results', [])
        except requests.exceptions.RequestException as e:
            current_app.logger.error(f"TMDB API error: {str(e)}")
            return []
