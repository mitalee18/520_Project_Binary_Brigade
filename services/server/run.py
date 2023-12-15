from flask import Flask
# from flask_restful import Api
from model.models import db
import time
from blueprint.user_blueprint import user_api
from blueprint.patient_blueprint import patient_api
from blueprint.doctor_blueprint import doctor_api
from blueprint.admin_blueprint import admin_api
from blueprint.appointment_blueprint import appointment_api
from config.config import SwaggerConfig
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from waitress import serve
import logging


def create_app():
    app = Flask(__name__)
    app.config.from_object("config.config.DBConfig")
    # Configure the logging
    logging.basicConfig(filename='app.log', level=logging.INFO)
    print(app.config)


    #blueprint registered
    app.register_blueprint(user_api)
    app.register_blueprint(patient_api)
    app.register_blueprint(doctor_api)
    app.register_blueprint(admin_api)
    app.register_blueprint(appointment_api)

    #swagger blueprint registered
    app.register_blueprint(SwaggerConfig.SWAGGER_BLUEPRINT, url_prefix = SwaggerConfig.SWAGGER_URL)

    #for signing the JWT
    app.config.from_object("config.config.JwtSecretKey") 
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    
    jwt = JWTManager(app)

    app.app_context().push()
    time.sleep(5)
    with app.app_context():
        db.init_app(app)
        db.create_all()
    return app


if __name__ == "__main__":
    app = create_app()
    # app.run(host="0.0.0.0", port=8081)
    serve(app, host="0.0.0.0", port=8081)


