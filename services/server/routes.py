from flask import Blueprint, jsonify
from controller import api_handler

server_api = Blueprint('server_api', __name__)

@server_api.route("/")
def hello():
    return jsonify(api_handler.default())

@server_api.route('/fetch_login', methods=['GET'])
def fetch_login():
    try:
        all_cats = api_handler.fetch_login()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "server_api/fetch_login")
    return jsonify(all_cats), 200

@server_api.route('/add_login', methods=['POST'])
def add_login():
    try:
        ret_val = api_handler.add_login()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "server_api/add_login")
    return jsonify(ret_val), 200


@server_api.app_errorhandler(Exception)
def handle_error(error, messg="Unknown Error", api_name="server_api/", code=500):
    response = {
        'status': code,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': messg
        }
    }
    return jsonify(response), code