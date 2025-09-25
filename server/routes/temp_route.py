from flask import Blueprint
from ..controllers.temp_controller import get_message

api_bp = Blueprint("api", __name__)

@api_bp.route("/hello")
def message():
    return get_message()