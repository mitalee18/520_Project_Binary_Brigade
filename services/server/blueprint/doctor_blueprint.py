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
        if ret_val['doctor_found_flag'] == 0:
            return handle_error(Exception('Bad Request: Doctor does not exist.'),
                                'Bad Request: Doctor does not exist.',
                                'Bad Request: Doctor does not exist.',
                                "api/doctor/get-available-time",
                                400)
    except Exception as e:
        return handle_error(e,
                            'Internal Server Error: Please try again.',
                            f"Error[{type(e)}]{str(e)}",
                            "api/doctor/get-available-time",
                            500)
    return jsonify(ret_val['available_time']), 200

@doctor_api.route('/book-appointment', methods=['POST'])
@cross_origin(origin='localhost')
def book_appointment():
    try:
        ret_val = appointment_api_handler.book_appointment()
        if ret_val['doctor_found_flag'] == 0:
            return handle_error(Exception('Bad Request: Doctor does not exist.'),
                                'Bad Request: Doctor does not exist.',
                                'Bad Request: Doctor does not exist.',
                                "api/doctor/book-appointment",
                                400)
        elif ret_val['patient_found_flag'] == 0:
            return handle_error(Exception('Bad Request: Patient does not exist.'),
                                'Bad Request: Patient does not exist.',
                                'Bad Request: Patient does not exist.',
                                "api/doctor/book-appointment",
                                400)
        else:
            if ret_val['ret_val'] == 0:
                return handle_error(Exception('Bad Request: Appointment already booked.'),
                                    'Bad Request: Appointment already booked.',
                                    'Bad Request: Appointment already booked.',
                                    "api/doctor/book-appointment",
                                    400)
    except Exception as e:
        return handle_error(e,
                            'Internal Server Error: Please try again.',
                            f"Error[{type(e)}]{str(e)}",
                            "api/doctor/book-appointment",
                            500)
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

@doctor_api.route('/get-doctor-schedule', methods=['GET'])
@cross_origin(origin='localhost')
def get_doctor_schedule():
    try:
        user_id = int(request.args.get('user_id'))  # read into integer type
        all_doctors = appointment_api_handler.get_doctor_schedule(user_id)
        if all_doctors['doctor_found_flag'] == 0:
            return handle_error(Exception('Bad Request: User does not exist.'),
                                'Bad Request: User does not exist.',
                                'Bad Request: User does not exist.',
                                "api/patient/get-doctor-schedule",
                                400)
    except Exception as e:
        return handle_error(e,
                            'Internal Server Error: Please try again.',
                            f"Error[{type(e)}]{str(e)}",
                            "api/doctor/get-doctor-schedule",
                            500)
    return jsonify(all_doctors['doctor_schedule']), 200

@doctor_api.app_errorhandler(Exception)
def handle_error(error, messg="Unknown Error", error_trace="Unknown Error", api_name="doctor_api/", code=500):
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