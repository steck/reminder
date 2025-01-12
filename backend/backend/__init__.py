from flask import Flask
from .config import Config

def create_app(test_config=None):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Load configuration
    if test_config is None:
        app.config.from_object(Config)
    else:
        app.config.from_mapping(test_config)

    # Import and register routes
    from .routes import api_bp
    app.register_blueprint(api_bp)

    return app
