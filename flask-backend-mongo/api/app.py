from flask import Flask, request, jsonify
from bson.json_util import dumps
from bson.objectid import ObjectId
import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/LdeSA/<code>", methods=['GET']) 

def get_LdeSA(code): 
    con =db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        words = dbLdeSA.words 
        response = app.response_class( 

            response=dumps(words.find_one({'_id': ObjectId(code)})), 
            status=200,  mimetype='application/json'  ) 
        return response 
    finally: 
        con.close() 
        print("Connection closed") 
@app.route("/LdeSA", methods=['GET']) 

def get_LdeSA(): 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        words = dbLdeSA.words 
        response = app.response_class( 
                    response=dumps( words.find() ), status=200,  mimetype='application/json' ) 
        return response 
    finally: 
        con.close() 
        print("Connection closed") 
@app.route("/LdeSA ", methods=['POST']) 

def create(): 
    data = request.get_json() 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        words = dbLdeSA.words
        words.insert_one(data) 
        return jsonify({"message":"OK"}) 
    finally: 
        con.close() 
        print("Connection closed") 

@app.route("/LdeSA/<code>", methods=['PUT']) 

def update(code): 
    data = request.get_json() 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        words = dbLdeSA.words 
        words.replace_one( {'_id': ObjectId(code)}, data, True ) 
        return jsonify({"message":"OK"}) 
    finally: 
        con.close() 
        print("Connection closed") 

@app.route("/LdeSA/<code>", methods=['DELETE']) 
def delete(code): 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        words = dbLdeSA.words 
        words.delete_one({'_id': ObjectId(code)}) 
        return jsonify({"message":"OK"}) 

    finally: 
        con.close() 
        print("Connection closed") 

@app.route("/subjects/<code>", methods=['GET']) 
def get_subjects (code): 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        subjects = dbLdeSA.subjects 
        response = app.response_class( 
            response=dumps(subjects.find_one({'_id': ObjectId(code)})), 
            status=200, 
            mimetype='application/json' 
        ) 
        return response 
    finally: 
        con.close() 
        print("Connection closed") 

@app.route("/subjects", methods=['GET']) 
def get_subjects(): 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        subjects = dbLdeSA.subjects 
        response = app.response_class( 
                    response=dumps( 
                        subjects.find() 
                    ), 
                    status=200, 
                    mimetype='application/json' 
                ) 
        return response 
    finally: 
        con.close() 
        print("Connection closed") 

@app.route("/subjects", methods=['POST']) 

def create_subjects (): 
    data = request.get_json() 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        subjects= dbLdeSA.subjects 
        subjects.insert_one(data) 
        return jsonify({"message":"OK"}) 
    finally: 
        con.close() 
        print("Connection closed") 
@app.route("/subjects/<code>", methods=['PUT']) 
def update_subjects (code): 
    data = request.get_json() 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        subjects= dbLdeSA.subjects 
        subjects.replace_one( 
            {'_id': ObjectId(code)}, 
            data, True 
        ) 
        return jsonify({"message":"OK"}) 
    finally: 
        con.close() 
        print("Connection closed") 
@app.route("/subjects/<code>", methods=['DELETE']) 
def delete_subjects (code): 
    con = db.get_connection() 
    dbLdeSA = con.dbLdeSA 
    try: 
        subjects= dbLdeSA.subjects 
        subjects.delete_one({'_id': ObjectId(code)}) 
        return jsonify({"message":"OK"}) 
    finally: 
        con.close() 
        print("Connection closed") 