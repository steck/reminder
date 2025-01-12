from flask import Flask
from flask_migrate import Migrate
from .config import Config
from . import db
from .models import User  # Keep User import for migrations

def create_app(test_config=None):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Load configuration
    if test_config is None:
        app.config.from_object(Config)
    else:
        app.config.from_mapping(test_config)

    # Initialize database
    db.init_app(app)
    migrate = Migrate(app, db)

    # Import and register routes
    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp)
    from .routes.movies import movies_bp
    app.register_blueprint(movies_bp)

    return app
