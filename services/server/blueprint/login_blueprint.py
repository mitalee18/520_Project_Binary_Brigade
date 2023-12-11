from flask import Blueprint, jsonify
from flask_swagger_ui import get_swaggerui_blueprint
from controller.login_api_handler import LoginApiHandler as login_api_handler
from flask_cors import cross_origin

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)

login_api = Blueprint('login_api', __name__, url_prefix='/api/user/login' )

@login_api.route("/")
@cross_origin(origin='localhost')
def hello():
    return jsonify(login_api_handler.default())

@login_api.route('/fetch', methods=['GET'])
@cross_origin(origin='localhost')
def fetch():
    try:
        all_cats = login_api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/login/fetch")
    return jsonify(all_cats), 200

@login_api.route('/add', methods=['POST'])
@cross_origin(origin='localhost')
def add():
    try:
        ret_val = login_api_handler.add()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/login/add")
    return jsonify(ret_val), 200


@login_api.app_errorhandler(Exception)
def handle_error(error, messg="Unknown Error", api_name="login_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': messg
        }
    }
    return jsonify(response), code