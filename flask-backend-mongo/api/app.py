from flask import Flask, request, jsonify
from bson.json_util import dumps
from bson.objectid import ObjectId
import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/Palabras/<code>", methods=['GET'])
def get_movie(code):
    con = db.get_connection()
    dbldesa = con.ldesa
    try:
        select_colection = dbldesa.palabras
        response = app.response_class(
            response=dumps(select_colection.find_one({'_id': ObjectId(code)})),
            status=200,
            mimetype='application/json'
        )
        return response
    finally:
        con.close()
        print("Connection closed")

@app.route("/Palabras", methods=['GET'])
def get_palabras():
    con = db.get_connection()
    dbldesa = con.ldesa
    try:
        palabras = dbldesa.palabras
        response = app.response_class(
            response=dumps(
                palabras.find()
            ),
            status=200,
            mimetype='application/json'
        )
        return response
    finally:
        con.close()
        print("Connection closed")

@app.route("/Palabras", methods=['POST'])
def create():
    data = request.get_json()
    con = db.get_connection()
    dbldesa = con.ldesa 
    try:
        palabras = dbldesa.palabras
        palabras.insert_one(data)
        return jsonify({"message":f"Created: {data}"})
    finally:
        con.close()
        print("Connection closed")

@app.route("/Palabras/<code>", methods=['PUT'])
def update(code):
    data = request.get_json()
    con = db.get_connection()
    dbldesa = con.ldesa 
    try:
        palabras = dbldesa.palabras
        palabras.replace_one(
            {'_id': ObjectId(code)},
            data, True
        )
        return jsonify({"message":f"Updated id: {code}"})
    finally:
        con.close()
        print("Connection closed")

@app.route("/Palabras/<code>", methods=['DELETE'])
def delete(code):
    con = db.get_connection()
    dbldesa = con.ldesa 
    try:
        palabras = dbldesa.palabras
        palabras.delete_one({'_id': ObjectId(code)})
        return jsonify({"message":f"Deleted id: {code}"})
    finally:
        con.close()
        print("Connection closed")

@app.route("/Materias", methods=['POST']) 
def create_materias (): 
    data = request.get_json() 
    con = db.get_connection() 
    dbldesa = con.ldesa 
    try: 
        materia= dbldesa.materias
        materia.insert_one(data) 
        return jsonify({"message":f"created: {data}"}) 
    finally: 
        con.close() 
        print("Connection closed") 

@app.route("/Materias", methods=['GET'])
def get_materias():
    con = db.get_connection()
    dbldesa = con.ldesa
    try:
        materias = dbldesa.materias
        response = app.response_class(
            response=dumps(
                materias.find()
            ),
            status=200,
            mimetype='application/json'
        )
        return response
    finally:
        con.close()
        print("Connection closed")

@app.route("/Materias/<code>", methods=['GET'])
def get_materia_alone(code):
    con = db.get_connection()
    dbldesa = con.ldesa
    try:
        materias = dbldesa.materias
        response = app.response_class(
            response=dumps(materias.find_one({'_id': ObjectId(code)})),
            status=200,
            mimetype='application/json'
        )
        return response
    finally:
        con.close()
        print("Connection closed")        

@app.route("/Materias/<code>", methods=['PUT'])
def update_materias(code):
    data = request.get_json()
    con = db.get_connection()
    dbldesa = con.ldesa 
    try:
        materia = dbldesa.materias
        materia.replace_one(
            {'_id': ObjectId(code)},
            data, True
        )
        return jsonify({"message":f"Updated _id: {code}"})
    finally:
        con.close()
        print("Connection closed")

@app.route("/Materias/<code>", methods=['DELETE'])
def delete_materia(code):
    con = db.get_connection()
    dbldesa = con.ldesa 
    try:
        materia = dbldesa.materias
        materia.delete_one({'_id': ObjectId(code)})
        return jsonify({"message":f"Deleted _id: {code}"})
    finally:
        con.close()
        print("Connection closed")

@app.route("/reset/<code>", methods=['DELETE'])
def emergency_reset(code):
    con = db.get_connection()
    dbldesa = con.ldesa 
    try:
        dbldesa.drop_collection(code)
        return jsonify({"message":f"Deleted collection: {code}"})
    finally:
        con.close()
        print("Connection closed")