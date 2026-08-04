$ErrorActionPreference = "Stop"

Write-Host "Publishing Dr. Pritam Chattopadhyay's website" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git is not installed. Install Git for Windows, reopen PowerShell, and run this script again."
}

$repoUrl = "https://github.com/PritamY2K/Chattopadhyay.github.io.git"

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

git add .

$status = git status --porcelain
if ($status) {
    git commit -m "Publish or update personal academic website"
} else {
    Write-Host "No local changes to commit." -ForegroundColor Yellow
}

$origin = git remote get-url origin 2>$null
if (-not $origin) {
    git remote add origin $repoUrl
} elseif ($origin -ne $repoUrl) {
    git remote set-url origin $repoUrl
}

git push -u origin main

Write-Host "Upload complete. Check GitHub Settings > Pages, then open:" -ForegroundColor Green
Write-Host "https://pritamy2k.github.io/Chattopadhyay.github.io" -ForegroundColor Green
