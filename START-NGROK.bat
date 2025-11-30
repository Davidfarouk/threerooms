@echo off
cls
echo.
echo ========================================
echo   START NGROK - SHARE YOUR WEBSITE
echo ========================================
echo.
echo This will create a public URL so you can:
echo   - Test on your phone
echo   - Share with friends on different WiFi
echo   - Access from anywhere
echo.
echo Make sure:
echo   1. Your Next.js server is running (http://localhost:3000)
echo   2. ngrok is installed (download from https://ngrok.com/download)
echo.
pause

cd /d "%~dp0"

REM Check if ngrok is installed
where ngrok >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo   NGROK NOT FOUND
    echo ========================================
    echo.
    echo ngrok is not installed or not in your PATH.
    echo.
    echo To install ngrok:
    echo   1. Go to: https://ngrok.com/download
    echo   2. Download for Windows
    echo   3. Extract ngrok.exe to a folder in your PATH
    echo      (or add it to your PATH environment variable)
    echo   4. Or place ngrok.exe in this folder: %~dp0
    echo.
    echo Alternatively, you can run ngrok manually:
    echo   ngrok http 3000
    echo.
    pause
    exit /b 1
)

echo.
echo [INFO] Checking if Next.js is running on port 3000...
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo   WARNING: NEXT.JS NOT RUNNING
    echo ========================================
    echo.
    echo Next.js server is not running on http://localhost:3000
    echo.
    echo Please start it first:
    echo   1. Run GO.bat (which starts Next.js automatically)
    echo   2. Or manually: cd wordpress-headless-example\frontend ^&^& npm run dev
    echo.
    echo Press any key to continue anyway (ngrok will start but won't work until Next.js is running)...
    pause
)

echo.
echo ========================================
echo   STARTING NGROK
echo ========================================
echo.
echo [INFO] Starting ngrok tunnel to http://localhost:3000
echo [INFO] This will create a public URL you can share
echo.
echo The ngrok URL will appear below.
echo Copy it and share with friends or use on your phone!
echo.
echo Press Ctrl+C to stop ngrok when done.
echo.
echo ========================================
echo.

REM Start ngrok
ngrok http 3000

pause

