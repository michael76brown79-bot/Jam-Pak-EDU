@echo off
REM Jam-Pak EDU - One-Click Launcher
REM This script starts the server and opens the game in your browser

setlocal enabledelayedexpansion

REM Get the project directory
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

REM Kill any existing server processes on port 3001
echo Cleaning up previous sessions...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do (
    taskkill /PID %%a /F 2>nul
)
timeout /t 1 /nobreak >nul

REM Start the server
echo.
echo ============================================
echo  JAM-PAK EDU - Starting...
echo ============================================
echo.
echo Starting game server on http://localhost:3001
echo Launching in 3 seconds...
echo.

start "" node src/server.js

REM Wait for server to start
timeout /t 3 /nobreak >nul

REM Open browser
start http://localhost:3001

REM Show status
echo.
echo ✓ Server started
echo ✓ Opening browser...
echo.
echo If the browser doesn't open, visit: http://localhost:3001
echo.
echo To stop the server, close this window or press Ctrl+C
echo.
echo ============================================
echo.

REM Keep the window open
pause
