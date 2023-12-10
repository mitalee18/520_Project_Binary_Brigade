from flask import Blueprint, jsonify
import requests
from flask_swagger_ui import get_swaggerui_blueprint
from controller.user_api_handler import UserApiHandler as user_api_handler
from controller.patient_api_handler import PatientApiHandler as patient_api_handler
from controller.doctor_api_handler import DoctorApiHandler as doctor_api_handler
from controller.admin_api_handler import AdminApiHandler as admin_api_handler

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)


user_api = Blueprint('user_api', __name__, url_prefix='/api/user')

@user_api.route("/")
def hello():
    return jsonify(user_api_handler.default())

@user_api.route('/fetch', methods=['GET'])
def fetch():
    try:
        all_cats = user_api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/fetch")
    return jsonify(all_cats), 200

@user_api.route('/add', methods=['POST'])
def add():
    try:
        ret_val = user_api_handler.add()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/add")
    return jsonify(ret_val), 200

@user_api.route('/create-profile', methods=['POST'])
def create_profile():
    try:
        user_type = requests.args.get('user_type')
        if user_type==0:
            profile = patient_api_handler.add()
        elif user_type==1:
            profile = doctor_api_handler.add()
        else:
            profile = admin_api_handler.add()
        
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/create-profile")
    return jsonify(profile), 200


@user_api.app_errorhandler(Exception)
def handle_error(error, messg="Unknown Error", api_name="user_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': messg
        }
    }
    return jsonify(response), code