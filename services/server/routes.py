from flask import Blueprint, jsonify
import api_handler

server_api = Blueprint('server_api', __name__)

@server_api.route("/")
def hello():
    return jsonify(api_handler.default())

@server_api.route('/fetch', methods=['GET'])
def fetch():
    try:
        all_cats = api_handler.fetch()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "server_api/fetch")
    return jsonify(all_cats), 200

@server_api.route('/add', methods=['POST'])
def add():
    try:
        ret_val = api_handler.add()
    except Exception as e:
        return handle_error(e, f"Error[{type(e)}]{str(e)}", "server_api/add")
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