from flask import Blueprint, jsonify
from flask_swagger_ui import get_swaggerui_blueprint
from controller.patient_api_handler import PatientApiHandler as patient_api_handler

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)

patient_api = Blueprint('patient_api', __name__, url_prefix='/api/patient')

@patient_api.route("/")
def hello():
    return jsonify(patient_api_handler.default())

@patient_api.route('/fetch', methods=['GET'])
def fetch():
    try:
        all_patients = patient_api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/patient/fetch")
    return jsonify(all_patients), 200

@patient_api.route('/add', methods=['POST'])
def add():
    try:
        ret_val = patient_api_handler.add()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/patient/add")
    return jsonify(ret_val), 200

@patient_api.app_errorhandler(Exception)
def handle_error(error, messg="Unknown Error", api_name="patient_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': messg
        }
    }
    return jsonify(response), code