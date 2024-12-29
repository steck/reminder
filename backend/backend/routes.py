from flask import Blueprint

api_bp = Blueprint('api', __name__)

@api_bp.route('/items', methods=['GET'])
def get_items():
    return {"message": "List of items"}