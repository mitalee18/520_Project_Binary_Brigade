from flask import Blueprint, jsonify
from flask_swagger_ui import get_swaggerui_blueprint
from controller.admin_api_handler import AdminApiHandler as admin_api_handler
from flask_cors import cross_origin

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)

admin_api = Blueprint('admin_api', __name__, url_prefix='/api/admin' )

@admin_api.route("/")
@cross_origin(origin='localhost')
def hello():
    return jsonify(admin_api_handler.default())

@admin_api.route('/fetch', methods=['GET'])
@cross_origin(origin='localhost')
def fetch():
    try:
        all_admins = admin_api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/admin/fetch")
    return jsonify(all_admins), 200

@admin_api.route('/add', methods=['POST'])
@cross_origin(origin='localhost')
def add():
    try:
        ret_val = admin_api_handler.add()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/admin/add")
    return jsonify(ret_val), 200


@admin_api.app_errorhandler(Exception)
@cross_origin(origin='localhost')
def handle_error(error, messg="Unknown Error", api_name="admin_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': messg
        }
    }
    return jsonify(response), code