from flask import Flask
from flask_cors import CORS
from .main import main
from .auth import auth
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        origins=["http://localhost:3000"],
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
    )

    # Register Blueprints
    app.register_blueprint(main)
    app.register_blueprint(auth)

    return app
