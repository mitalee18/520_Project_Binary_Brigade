from flask import Blueprint, jsonify
from flask import request
from flask_swagger_ui import get_swaggerui_blueprint
from controller.patient_api_handler import PatientApiHandler
from controller.appointment_api_handler import AppointmentApiHandler
from flask_cors import cross_origin

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)

patient_api = Blueprint('patient_api', __name__, url_prefix='/api/patient')
patient_api_handler = PatientApiHandler()
appointment_api_handler = AppointmentApiHandler()

@patient_api.route("/")
@cross_origin(origin='localhost')
def hello():
    return jsonify(patient_api_handler.default())

@patient_api.route('/get-patient-schedule', methods=['GET'])
@cross_origin(origin='localhost')
def fetch():
    try:
        user_id = int(request.args.get('user_id'))  # read into integer type
        all_patients = appointment_api_handler.get_patient_schedule(user_id)
    except Exception as e:
        return handle_error(e,
                            'Internal Server Error: Please try again.',
                            f"Error[{type(e)}]{str(e)}",
                            "api/patient/get-patient-schedule",
                            500)
    return jsonify(all_patients), 200


@patient_api.app_errorhandler(Exception)
def handle_error(error, messg="Unknown Error", error_trace="Unknown Error", api_name="patient_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'trace': error_trace,
            'message': messg,
        }
    }
    return jsonify(response), code