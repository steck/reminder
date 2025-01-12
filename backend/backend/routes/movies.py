from flask import Blueprint, jsonify, request
from typing import Dict, Any, Tuple
from functools import wraps
from ..services.tmdb_service import TMDBService
import logging

movies_bp = Blueprint('movies', __name__, url_prefix='/movies')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def log_request(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        logger.info(f"Request: {request.method} {request.path}")
        return f(*args, **kwargs)
    return decorated_function

@movies_bp.route('/', methods=['GET'])
@log_request
def get_movies() -> Tuple[Dict[str, Any], int]:
    """Get list of popular movies from TMDB
    
    Returns:
        Tuple[Dict[str, Any], int]: JSON response with movies and HTTP status code
    """
    try:
        page = request.args.get('page', default=1, type=int)
        
        # Validate page parameter
        if page < 1 or page > 1000:
            return jsonify({
                "error": "Invalid page number. Must be between 1 and 1000"
            }), 400
            
        movies = TMDBService.get_popular_movies(page=page)
        
        if not movies:
            return jsonify({
                "message": "No movies found",
                "page": page,
                "movies": []
            }), 404
            
        return jsonify({
            "message": "List of popular movies",
            "page": page,
            "movies": movies
        }), 200
        
    except Exception as e:
        logger.error(f"Error in get_movies: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500
