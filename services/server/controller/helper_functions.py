import json
import ast

# Function to convert comma seperated string to list
def convert_comma_seperated_string_to_list(string):
    if string == None:
        return []
    else:
        # strip elements after converting to list
        ret_list = [x.strip() for x in string.split(',')]
        return ret_list

# Function to convert string of list of json to list of json
def convert_string_of_list_of_json_to_list_of_json(string):
    if string == None:
        return []
    else:
        list_of_dicts = ast.literal_eval(string)
        json_list = [json.loads(json.dumps(d)) for d in list_of_dicts]
        return json_list

# Function to convert dictionary to list of json
def convert_dict_to_list_of_json(dict):
    list_of_dicts = [dict]
    json_list = [json.loads(json.dumps(d)) for d in list_of_dicts]
    return json_list
