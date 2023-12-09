from flask import Flask
from flask_restful import Api
from model.models import db
import time
from blueprint.user_blueprint import user_api
from blueprint.login_blueprint import login_api
from blueprint.patient_blueprint import patient_api
from config.config import SwaggerConfig

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.config.DBConfig")
    api = Api(app)
    print(app.config)

    #user blueprint registered
    app.register_blueprint(user_api)
    app.register_blueprint(login_api)
    app.register_blueprint(patient_api)

    #swagger blueprint registered
    app.register_blueprint(SwaggerConfig.SWAGGER_BLUEPRINT, url_prefix = SwaggerConfig.SWAGGER_URL)

    app.app_context().push()
    time.sleep(5)
    with app.app_context():
        db.init_app(app)
        db.create_all()
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8081)


