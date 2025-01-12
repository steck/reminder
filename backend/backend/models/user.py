from uuid import uuid4
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from .. import db

class User(db.Model):
    """User model for authentication"""
    __tablename__ = 'users'
    
    id = db.Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'
