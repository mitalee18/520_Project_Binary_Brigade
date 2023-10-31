from flask import Blueprint, jsonify
import api

web_api = Blueprint('web_api', __name__)
# errors = Blueprint('errors', __name__)

@web_api.route("/")
def hello():
    return jsonify(api.default())

@web_api.route('/fetch', methods=['GET'])
def fetch():
    all_cats = api.fetch()
    return jsonify(all_cats), 200

@web_api.route('/add', methods=['POST'])
def add():
    ret_val = api.add()
    return jsonify(ret_val), 200