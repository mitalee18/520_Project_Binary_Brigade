from flask import Blueprint, jsonify, request
from flask_swagger_ui import get_swaggerui_blueprint
from controller.user_api_handler import UserApiHandler as user_api_handler
from controller.patient_api_handler import PatientApiHandler as patient_api_handler
from controller.doctor_api_handler import DoctorApiHandler as doctor_api_handler
from controller.admin_api_handler import AdminApiHandler as admin_api_handler
from controller.login_api_handler import LoginApiHandler as login_api_handler
from flask_cors import cross_origin



SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = 'http://patienttracker.swagger.io/v1/swagger.json'  # Our API url (can of course be a local resource)


user_api = Blueprint('user_api', __name__, url_prefix='/api/user')

@user_api.route("/")
@cross_origin(origin='localhost')
def hello():
    return jsonify(user_api_handler.default())

@user_api.route('/signup', methods=["POST"])
@cross_origin(origin='localhost')
def signup():
    try:
        user_type = request.json.get('user_type')
        if user_type==0:
            query_response = patient_api_handler.signup()
        elif user_type==1:
            query_response = doctor_api_handler.signup()
        else:
            query_response = admin_api_handler.signup()
        signup_response = user_api_handler.add(query_response.user_id)

    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/signup")
    return jsonify(signup_response), 200

@user_api.route('/login', methods=["POST"])
@cross_origin(origin='localhost')
def login():
    try:
        user_type = request.json.get('user_type')
        login_response = user_api_handler.login()

    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/login")
    
    if login_response["status"] == 200:
        return jsonify(login_response), 200
    elif login_response["status"] == 400:
        return jsonify(login_response), 400


@user_api.route('/create-profile', methods=['POST'])
@cross_origin(origin='localhost')
def create_profile():
    try:
        user_type = request.json.get('user_type')
        print(user_type, type(user_type))
        if user_type==0:
            profile = patient_api_handler.add()
        elif user_type==1:
            profile = doctor_api_handler.add()
        else:
            profile = admin_api_handler.add()
        
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/create-profile")
    return jsonify(profile), 200

# @user_api.route('/getUserInfo/<email>', methods=["GET"])
# def get_user_info(email):
#     try:
#         user = user_api_handler.get_user_info(email)
#         print(user)
#     except Exception as e:
#         return handle_error(e, f"Error[{type(e)}]{str(e)}", "api/user/getUserInfo")
#     return jsonify(user), 200


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