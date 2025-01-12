# Package initialization
from flask_sqlalchemy import SQLAlchemy

# Initialize extensions
db = SQLAlchemy()

# Create the application instance
def create_app():
    from .app import create_app
    return create_app()

app = create_app()
