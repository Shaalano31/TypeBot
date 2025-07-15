from functools import wraps
from flask import request, jsonify, current_app
import jwt

blacklist = set()

def blacklist_token(token):
    blacklist.add(token)

def is_token_blacklisted(token):
    return token in blacklist

def verify_token_from_request(request):
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.replace("Bearer ", "")

    if is_token_blacklisted(token):
        return "revoked"

    try:
        payload = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return "expired"
    except jwt.InvalidTokenError:
        return "invalid"
    except Exception:
        return "missing"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        payload = verify_token_from_request(request)

        if payload == "revoked":
            return jsonify(message="Token has been revoked"), 401
        elif payload == "expired":
            return jsonify(message="Token expired"), 401
        elif payload == "invalid":
            return jsonify(message="Invalid token"), 401
        elif payload == "missing":
            return jsonify(message="Missing or malformed token"), 401

        # Inject the payload into the route function
        return f(payload=payload, *args, **kwargs)

    return decorated