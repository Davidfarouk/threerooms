@echo off
setlocal enabledelayedexpansion
cls
echo.
echo ========================================
echo   NGROK - SHARE WEBSITE GLOBALLY
echo ========================================
echo.
echo This will:
echo   1. Install ngrok (if needed)
echo   2. Start ngrok tunnel
echo   3. Show you the public URL to share
echo.
echo Perfect for sharing with users in different countries!
echo.
pause

cd /d "%~dp0"

REM Check if ngrok exists in current directory
if exist "ngrok.exe" (
    echo [OK] ngrok.exe found in current directory
    set "NGROK_PATH=ngrok.exe"
    goto :start_ngrok
)

REM Check if ngrok is in PATH
where ngrok >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] ngrok found in system PATH
    set "NGROK_PATH=ngrok"
    goto :start_ngrok
)

REM ngrok not found - download it
echo.
echo ========================================
echo   INSTALLING NGROK
echo ========================================
echo.
echo [INFO] ngrok not found. Downloading...
echo.

REM Create temp directory for download
if not exist "temp_ngrok" mkdir "temp_ngrok"

REM Download ngrok using PowerShell
echo [INFO] Downloading ngrok for Windows...
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip' -OutFile 'temp_ngrok\ngrok.zip'}"

if not exist "temp_ngrok\ngrok.zip" (
    echo.
    echo [ERROR] Failed to download ngrok automatically
    echo.
    echo Please download manually:
    echo   1. Go to: https://ngrok.com/download
    echo   2. Download for Windows
    echo   3. Extract ngrok.exe to this folder: %~dp0
    echo   4. Run this script again
    echo.
    pause
    exit /b 1
)

echo [INFO] Extracting ngrok...
powershell -Command "Expand-Archive -Path 'temp_ngrok\ngrok.zip' -DestinationPath 'temp_ngrok' -Force"

REM Move ngrok.exe to current directory
if exist "temp_ngrok\ngrok.exe" (
    move "temp_ngrok\ngrok.exe" "ngrok.exe" >nul 2>&1
    echo [OK] ngrok installed successfully
    set "NGROK_PATH=ngrok.exe"
) else (
    echo [ERROR] Failed to extract ngrok
    pause
    exit /b 1
)

REM Cleanup
rmdir /s /q "temp_ngrok" 2>nul

:start_ngrok
echo.
echo ========================================
echo   CHECKING NEXT.JS
echo ========================================
echo.

REM Check if Next.js is running
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Next.js is not running on port 3000
    echo.
    echo Please start it first:
    echo   1. Run GO.bat (starts Next.js automatically)
    echo   2. Or: cd wordpress-headless-example\frontend ^&^& npm run dev
    echo.
    echo Press any key to continue anyway (ngrok will start but won't work until Next.js is running)...
    pause
    echo.
) else (
    echo [OK] Next.js is running on port 3000
)

echo.
echo ========================================
echo   STARTING NGROK
echo ========================================
echo.
echo [INFO] Starting ngrok tunnel...
echo [INFO] This will create a public URL you can share globally!
echo.
echo The ngrok URL will appear below.
echo Copy the HTTPS URL and share it!
echo.
echo ========================================
echo.

REM Start ngrok in background and capture output
start "Ngrok Tunnel" cmd /k "%NGROK_PATH% http 3000"

REM Wait a moment for ngrok to start
timeout /t 3 /nobreak >nul

REM Try to get the URL from ngrok's API
echo [INFO] Getting ngrok URL...
timeout /t 2 /nobreak >nul

REM Try to fetch URL from ngrok API
for /f "tokens=*" %%i in ('curl -s http://localhost:4040/api/tunnels 2^>nul ^| findstr /C:"public_url"') do (
    set "API_RESPONSE=%%i"
)

REM Alternative: Show instructions
echo.
echo ========================================
echo   YOUR PUBLIC URL
echo ========================================
echo.
echo A new window opened with ngrok running.
echo.
echo Look for a line like this in the ngrok window:
echo.
echo   Forwarding   https://abc123.ngrok.io -^> http://localhost:3000
echo.
echo Copy the HTTPS URL (https://...) and share it!
echo.
echo You can also view it in your browser:
echo   http://localhost:4040
echo.
echo ========================================
echo.
echo [INFO] ngrok is running in a separate window
echo [INFO] Keep that window open while testing
echo [INFO] Close it when done (Ctrl+C in that window)
echo.
echo ========================================
echo.
pause
