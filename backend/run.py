from backend import create_app
import os

# Set development environment
os.environ['FLASK_ENV'] = 'development'

app = create_app()

if __name__ == "__main__":
    app.run(
        debug=True,
        use_reloader=True,  # Enable auto-reloader
        use_debugger=True,  # Enable debugger
        host='0.0.0.0',     # Allow access from other devices
        port=5000           # Default port
    )
