import os
from flask import Flask
from flask_cors import CORS
from flask import jsonify
from .routes.temp_route import api_bp


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    
    app.register_blueprint(api_bp)

    app.config["DEBUG"] = True

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)