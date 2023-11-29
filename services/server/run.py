from flask import Flask
from flask_restful import Api
from model.models import db
import time
from routes import server_api

def create_app():
    app = Flask(__name__)
    api = Api(app)
    app.config.from_object("config.config.Config")
    print(app.config)
    app.register_blueprint(server_api)
    app.app_context().push()
    time.sleep(5)
    with app.app_context():
        db.init_app(app)
        db.create_all()
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8081)


