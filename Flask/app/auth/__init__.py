from flask import Blueprint

# Define the Blueprint
auth = Blueprint("auth", __name__)

# Import routes to register them with the blueprint
from . import routes