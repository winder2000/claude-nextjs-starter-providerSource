#!/bin/bash
# Claude Code Task Complete Hook
# 요청 작업 완료 시 슬랙 메시지 전송

export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# .env 파일 로드
if [ -f "$CLAUDE_PROJECT_DIR/.env" ]; then
    source "$CLAUDE_PROJECT_DIR/.env"
else
    echo "오류: .env 파일을 찾을 수 없습니다"
    exit 1
fi

if [ -z "$SLACK_WEBHOOK_URL" ]; then
    echo "오류: SLACK_WEBHOOK_URL이 설정되지 않았습니다"
    exit 1
fi

# 변수 설정
PROJECT_NAME=$(basename "$CLAUDE_PROJECT_DIR")
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
TASK_STATUS="작업 완료"

echo "DEBUG: PROJECT_NAME = '$PROJECT_NAME'" >&2
echo "DEBUG: TASK_STATUS = '$TASK_STATUS'" >&2
echo "DEBUG: TIMESTAMP = '$TIMESTAMP'" >&2

# JSON 문자열 생성
PAYLOAD=$(printf '{
  "username": "Claude Code",
  "text": "✅ 작업 완료 알림",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*프로젝트:* %s\n*상태:* %s\n*시간:* %s"
      }
    }
  ],
  "icon_emoji": ":white_check_mark:"
}' "$PROJECT_NAME" "$TASK_STATUS" "$TIMESTAMP")

echo "DEBUG: PAYLOAD = '$PAYLOAD'" >&2

# curl로 전송 (UTF-8 바이너리)
RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  --data-binary @- \
  "$SLACK_WEBHOOK_URL" <<< "$PAYLOAD")

echo "DEBUG: RESPONSE = '$RESPONSE'" >&2

if echo "$RESPONSE" | grep -q "ok"; then
    echo "Slack 알림이 성공적으로 전송되었습니다." >&2
    exit 0
else
    echo "Slack 알림 전송에 실패했습니다: $RESPONSE" >&2
    exit 1
fi
