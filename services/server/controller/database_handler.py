import os, sys
sys.path.append(os.path.dirname(__file__))

from model.models import db


def get_all(model):
    data = model.query.all()
    return data

def query(model, email):
    data = model.query.filter_by(email_id=email).all()[0]
    return data

def query_by_user_id(model, user_id):
    data = model.query.filter_by(user_id=user_id).all()[0]
    return data

def query_multiple_by_user_id(model, user_id):
    data = model.query.filter_by(user_id=user_id).all()
    return data

def query_multiple_by_id(model, id_type, id_value):
    if id_type == 'doctor_id':
        data = model.query.filter_by(doctor_id=id_value).all()
    elif id_type == 'patient_id':
        data = model.query.filter_by(patient_id=id_value).all()
    elif id_type == 'appointment_id':
        data = model.query.filter_by(appointment_id=id_value).all()
    return data


def add_instance(model, **kwargs):
    try:
        instance = model(**kwargs)
        db.session.add(instance)
        commit_changes()
    except Exception as e:
        print(e)
        raise e


def delete_instance_by_user_id(model, user_id):
    model.query.filter_by(user_id=user_id).delete()
    commit_changes()


def edit_instance(model, user_id, **kwargs):
    instance = model.query.filter_by(user_id=user_id).all()[0]
    for attr, new_value in kwargs.items():
        setattr(instance, attr, new_value)
    commit_changes()


def commit_changes():
    db.session.commit()
