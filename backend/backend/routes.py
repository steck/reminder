from flask import Blueprint, jsonify
from typing import Dict, Any

api_bp = Blueprint('api', __name__)

@api_bp.route('/items', methods=['GET'])
def get_items() -> Dict[str, Any]:
    """Get list of items
    
    Returns:
        Dict[str, Any]: JSON response with items
    """
    return jsonify({
        "message": "List of items",
        "items": []
    })
