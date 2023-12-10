from flask import Blueprint, jsonify
from flask_swagger_ui import get_swaggerui_blueprint
from controller.doctor_api_handler import DoctorApiHandler as doctor_api_handler

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)

doctor_api = Blueprint('doctor_api', __name__, url_prefix='/api/doctor')

@doctor_api.route("/")
def hello():
    return jsonify(doctor_api_handler.default())

@doctor_api.route('/fetch', methods=['GET'])
def fetch():
    try:
        all_doctors = doctor_api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/doctor/fetch")
    return jsonify(all_doctors), 200

@doctor_api.route('/add', methods=['POST'])
def add():
    try:
        ret_val = doctor_api_handler.add()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/doctor/add")
    return jsonify(ret_val), 200

@doctor_api.app_errorhandler(Exception)
def handle_error(error, messg="Unknown Error", api_name="doctor_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': messg
        }
    }
    return jsonify(response), code