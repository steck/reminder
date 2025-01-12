from flask import Blueprint, jsonify, request
from typing import Dict, Any, Tuple
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies
)
from ..models.user import User
from .. import db

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register() -> Tuple[Dict[str, Any], int]:
    """Register a new user"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
        
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 409
        
    user = User(email=email)
    user.set_password(password)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        "message": "User registered successfully",
        "user": {
            "email": user.email
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login() -> Tuple[Dict[str, Any], int]:
    """Login user and return JWT tokens"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
        
    user = User.query.filter_by(email=email).first()
    
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
        
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    response = jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "refresh_token": refresh_token
    })
    
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    
    return response, 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout() -> Tuple[Dict[str, Any], int]:
    """Logout user by clearing JWT cookies"""
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200
