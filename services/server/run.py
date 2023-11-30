from flask import Flask
from model.models import db
import time
from blueprint.user_blueprint import user_api

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.config.Config")
    print(app.config)
    app.register_blueprint(user_api)
    app.app_context().push()
    time.sleep(5)
    with app.app_context():
        db.init_app(app)
        db.create_all()
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8080)


