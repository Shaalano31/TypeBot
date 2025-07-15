from flask import current_app

def get_upstream_config():
    base_url = current_app.config["BASE_URL"]
    token = current_app.config["TYPEBOT_API_TOKEN"]
    workspace_id = current_app.config["TYPEBOT_WORKSPACE_ID"]
    return base_url, token, workspace_id