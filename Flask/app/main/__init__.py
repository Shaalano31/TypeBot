from flask import Blueprint

main = Blueprint("main", __name__)

# Import routes to register them with the blueprint
from . import home_routes, typebot_routes
