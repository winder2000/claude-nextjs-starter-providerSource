#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import json
import subprocess
from datetime import datetime

# Get environment
project_dir = os.environ.get('CLAUDE_PROJECT_DIR')
env_path = os.path.join(project_dir, '.env')

# Read webhook URL
webhook_url = None
try:
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('SLACK_WEBHOOK_URL='):
                webhook_url = line.split('=', 1)[1].strip().strip('"')
                break
except Exception as e:
    print(f"Error reading .env: {e}")
    exit(1)

if not webhook_url:
    print("Error: SLACK_WEBHOOK_URL not set")
    exit(1)

# Prepare data
project_name = os.path.basename(project_dir)
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
message = "사용자 입력 대기 중"

# Create payload
payload = {
    "username": "Claude Code",
    "text": "🔔 권한 요청 알림",
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*프로젝트:* {project_name}\n*상태:* {message}\n*시간:* {timestamp}"
            }
        }
    ],
    "icon_emoji": ":bell:"
}

# Convert to JSON
json_str = json.dumps(payload, ensure_ascii=False)

print(f"DEBUG: PROJECT_NAME = '{project_name}'")
print(f"DEBUG: MESSAGE = '{message}'")
print(f"DEBUG: TIMESTAMP = '{timestamp}'")
print(f"DEBUG: PAYLOAD = {json_str}")

# Send via curl
try:
    result = subprocess.run([
        'curl', '-X', 'POST',
        '-H', 'Content-Type: application/json; charset=utf-8',
        '--data', json_str,
        webhook_url
    ], capture_output=True, text=True, timeout=10)

    print(f"Response: {result.stdout}")
    if result.returncode == 0 and "ok" in result.stdout:
        print("Slack 알림이 성공적으로 전송되었습니다.")
    else:
        print(f"Response returned, check Slack: {result.stdout}")
except Exception as e:
    print(f"Error: {e}")
    exit(1)
