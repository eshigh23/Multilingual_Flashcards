
from flask import jsonify

def get_message():
    try:
        return {"text": "Hi from flasky <3333"}, 200
    except Exception as e:
        return {"error": str(e)}, 400