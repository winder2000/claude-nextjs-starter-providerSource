# Slack Notification Hook
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$envPath = Join-Path $env:CLAUDE_PROJECT_DIR ".env"
$envContent = Get-Content $envPath -Encoding UTF8
$webhookUrl = $null
foreach ($line in $envContent) {
    if ($line -match "^SLACK_WEBHOOK_URL=(.+)$") {
        $webhookUrl = $matches[1].Trim('"')
        break
    }
}

$projectName = Split-Path $env:CLAUDE_PROJECT_DIR -Leaf
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$payload = @{
    username = "Claude Code"
    text = "u0080uac00uac01 u0080uacbducc81"
    blocks = @(@{
        type = "section"
        text = @{
            type = "mrkdwn"
            text = "*ud504ub85cuc81d:* $projectName`n*uc0c1ud0dc:* uc0acuc6a9uc790 uc785ub825 ub300uae30 uc911`n*uc2dcuac04:* $timestamp"
        }
    })
    icon_emoji = ":bell:"
} | ConvertTo-Json -Depth 10 -Compress

Invoke-WebRequest -Uri $webhookUrl `
    -Method Post `
    -Headers @{"Content-Type" = "application/json; charset=utf-8"} `
    -Body $payload `
    -ErrorAction Stop | Out-Null

Write-Host "OK"