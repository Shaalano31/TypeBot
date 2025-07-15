from flask import jsonify, current_app
import requests
from app.auth.auth_utils import token_required
from app.main import main
from app.utils.upstream import get_upstream_config

@main.route("/home", methods=["GET"])
@token_required
def home(payload):
    base_url, token, workspace_id = get_upstream_config()
    try:
        upstream_url = f"{base_url}/typebots"
        upstream_resp = requests.get(
            upstream_url,
            headers={"Authorization": f"Bearer {token}"},
            params={"workspaceId": workspace_id},
            timeout=5,
        )
    except requests.exceptions.RequestException as e:
        return jsonify(message=f"Upstream error: {str(e)}"), 502

    return (
        jsonify(upstream_resp.json()),
        upstream_resp.status_code,
        {"Content-Type": "application/json"},
    )
