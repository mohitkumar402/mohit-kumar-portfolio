@echo off
title Mohit Kumar Portfolio
cd /d "%~dp0"

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install. Make sure Node.js is installed from https://nodejs.org
        pause
        exit /b 1
    )
)

echo Starting development server...
call npm start
pause
