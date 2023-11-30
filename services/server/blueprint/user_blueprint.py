from flask import Blueprint, jsonify
from controller.user_api_handler import UserApiHandler as user_api_handler

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