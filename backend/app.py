from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient


app = Flask(__name__)
CORS(app)

# MongoDB connection 
MONGO_URI = "mongodb+srv://pg281204:5AKbxTQqGWJZdTnv@login.z6azdcc.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["skillrank"]
users_collection = db["users"]

# Ensure email is unique
users_collection.create_index("email", unique=True)

@app.route("/signUp", methods=["POST"])
def sign_up():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        users_collection.insert_one({"email": email})
        return jsonify({"message": "Signup successful!"}), 201
    except DuplicateKeyError:
        return jsonify({"error": "Email already exists"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
