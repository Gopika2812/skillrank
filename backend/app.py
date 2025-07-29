from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os


app = Flask(__name__)
CORS(app)

# MongoDB connection 
MONGO_URI = "mongodb+srv://pg281204:5AKbxTQqGWJZdTnv@login.z6azdcc.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["skillrank"]
users_collection = db["users"]


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
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
