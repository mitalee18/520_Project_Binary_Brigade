from flask import Flask
from models import db
import time
from routes import web_api

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")
    print(app.config)
    app.register_blueprint(web_api)
    app.app_context().push()
    time.sleep(5)
    with app.app_context():
        db.init_app(app)
        db.create_all()
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8080)


