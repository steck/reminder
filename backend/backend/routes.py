from flask import Blueprint, jsonify, request, current_app
from typing import Dict, Any, Tuple
from .services.tmdb_service import TMDBService
from functools import wraps
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging

api_bp = Blueprint('api', __name__)

# Initialize rate limiter
limiter = Limiter(
    get_remote_address,
    app=current_app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def log_request(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        logger.info(f"Request: {request.method} {request.path}")
        return f(*args, **kwargs)
    return decorated_function

@api_bp.route('/movies', methods=['GET'])
@limiter.limit("10 per minute")
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
