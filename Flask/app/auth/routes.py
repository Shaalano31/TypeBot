import datetime
import jwt
from flask import Blueprint, request, jsonify, current_app
from app.auth.auth_utils import blacklist_token
from app.auth import auth

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == "test@example.com" and password == "123456":
        payload = {
            "sub": username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
        return jsonify(access_token=token)
    return jsonify(message="Invalid credentials"), 401


@auth.route("/logout", methods=["POST"])
def logout():
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.replace("Bearer ", "")

    if not token:
        return jsonify(message="Missing token"), 400

    blacklist_token(token)
    return jsonify(message="Successfully logged out"), 200