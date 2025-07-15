from flask import jsonify, current_app
import requests
from app.auth.auth_utils import token_required
from app.main import main
from app.utils.upstream import get_upstream_config

@main.route("/typebots/<bot_id>", methods=["GET"])
@token_required
def get_typebot_by_id(payload, bot_id):
    base_url, token, _ = get_upstream_config()
    try:
        upstream_url = f"{base_url}/typebots/{bot_id}"
        upstream_resp = requests.get(
            upstream_url,
            headers={"Authorization": f"Bearer {token}"},
            timeout=5,
        )
    except requests.exceptions.RequestException as e:
        print(f"Error fetching bot {bot_id}:", e)
        return jsonify(message=f"Upstream error: {str(e)}"), 502

    return (
        jsonify(upstream_resp.json()),
        upstream_resp.status_code,
        {"Content-Type": "application/json"},
    )

@main.route("/typebots/<bot_id>/stats", methods=["GET"])
@token_required
def get_typebot_stats_by_id(payload, bot_id):
    base_url, token, _ = get_upstream_config()
    try:
        upstream_url = f"{base_url}/typebots/{bot_id}/analytics/stats"
        upstream_resp = requests.get(
            upstream_url,
            headers={"Authorization": f"Bearer {token}"},
            timeout=5,
        )
        print(f"Upstream response for bot {bot_id}:", upstream_resp.status_code)
        print(upstream_resp.json())
    except requests.exceptions.RequestException as e:
        print(f"Error fetching bot {bot_id}:", e)
        return jsonify(message=f"Upstream error: {str(e)}"), 502

    return (
        jsonify(upstream_resp.json()),
        upstream_resp.status_code,
        {"Content-Type": "application/json"},
    )
