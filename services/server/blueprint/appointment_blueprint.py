from flask import Blueprint, jsonify
from flask_swagger_ui import get_swaggerui_blueprint
from controller.appointment_api_handler import AppointmentApiHandler as appointment_api_handler
from flask_cors import cross_origin

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)

appointment_api = Blueprint('appointment_api', __name__, url_prefix='/api/appointment' )

@appointment_api.route("/")
@cross_origin(origin='localhost')
def hello():
    return jsonify(appointment_api_handler.default())

@appointment_api.route('/fetch', methods=['GET'])
@cross_origin(origin='localhost')
def fetch():
    try:
        all_appointments = appointment_api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/appointment/fetch")
    return jsonify(all_appointments), 200

@appointment_api.route('/add', methods=['POST'])
@cross_origin(origin='localhost')
def add():
    try:
        ret_val = appointment_api_handler.add()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/appointment/add")
    return jsonify(ret_val), 200


@appointment_api.app_errorhandler(Exception)
@cross_origin(origin='localhost')
def handle_error(error, messg="Unknown Error", api_name="appointment_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': messg
        }
    }
    return jsonify(response), code