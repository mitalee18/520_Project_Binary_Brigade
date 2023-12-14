from flask import Blueprint, jsonify
from flask import request
from flask_swagger_ui import get_swaggerui_blueprint
from controller.doctor_api_handler import DoctorApiHandler
from controller.appointment_api_handler import AppointmentApiHandler
from flask_cors import cross_origin

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)

doctor_api = Blueprint('doctor_api', __name__, url_prefix='/api/doctor')
appointment_api_handler = AppointmentApiHandler()
doctor_api_handler = DoctorApiHandler()

@doctor_api.route("/")
@cross_origin(origin='localhost')
def hello():
    return jsonify(doctor_api_handler.default())

@doctor_api.route('/fetch', methods=['GET'])
@cross_origin(origin='localhost')
def fetch():
    try:
        all_doctors = doctor_api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/doctor/fetch")
    return jsonify(all_doctors), 200

@doctor_api.route('/get-available-time', methods=['GET'])
@cross_origin(origin='localhost')
def get_available_time():
    try:
        user_id = int(request.args.get('user_id'))  # read into integer type
        ret_val = appointment_api_handler.get_available_time(user_id)
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/doctor/get-available-time")
    return jsonify(ret_val), 200

@doctor_api.route('/book-appointment', methods=['POST'])
@cross_origin(origin='localhost')
def book_appointment():
    try:
        ret_val = appointment_api_handler.book_appointment()
        if ret_val == 0:
            return jsonify({"status": 400, "message": "Appointment already booked"}), 400
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/doctor/book-appointment")
    return jsonify(ret_val), 200

@doctor_api.route('/get-all-doctor', methods=['GET'])
@cross_origin(origin='localhost')
def get_all_doctor():
    try:
        ret_val = doctor_api_handler.get_all_doctor()
    except Exception as e:
        return handle_error(e,
                            "Internal Server Error.",
                            f"Error[{type(e)}]{str(e)}",
                            "api/doctor/get-all-doctor",
                            code=500)
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