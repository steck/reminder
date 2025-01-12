from flask import Blueprint, jsonify, request
from typing import Dict, Any
from .services.tmdb_service import TMDBService

api_bp = Blueprint('api', __name__)

@api_bp.route('/movies', methods=['GET'])
def get_movies() -> Dict[str, Any]:
    """Get list of popular movies from TMDB
    
    Returns:
        Dict[str, Any]: JSON response with movies
    """
    page = request.args.get('page', default=1, type=int)
    movies = TMDBService.get_popular_movies(page=page)
    
    return jsonify({
        "message": "List of popular movies",
        "page": page,
        "movies": movies
    })
