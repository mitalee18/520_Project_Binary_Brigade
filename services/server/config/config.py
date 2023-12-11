import os
from dotenv import load_dotenv
from flask_swagger_ui import get_swaggerui_blueprint
import secrets

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class DBConfig(object):
    #DATABASE CONFIG
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class SwaggerConfig():
    #SWAGGER CONFIG
    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'
    SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
        SWAGGER_URL, 
        API_URL,
        config={
            'app_name': "Patient Tracker APIs"
        }
    )

class JwtSecretKey():
    """
    Generating random bits each time
    """
    JWT_SECRET_KEY = str(secrets.SystemRandom().getrandbits(128))
