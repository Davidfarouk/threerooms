@echo off
setlocal enabledelayedexpansion
cls
echo.
echo ========================================
echo   GET WEBSITE URL FOR PHONE TESTING
echo ========================================
echo.

cd /d "%~dp0"

REM Get local IP address
echo [INFO] Detecting your local IP address...
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set "IP=%%a"
    set "IP=!IP:~1!"
    if not "!IP!"=="" (
        set "LOCAL_IP=!IP!"
        goto :ip_found
    )
)

:ip_found
if "!LOCAL_IP!"=="" (
    echo [ERROR] Could not detect IP address automatically.
    echo.
    echo Please find it manually:
    echo   1. Open Command Prompt
    echo   2. Type: ipconfig
    echo   3. Look for "IPv4 Address" (usually 192.168.x.x)
    echo.
    pause
    exit /b 1
)

echo [OK] Your local IP: !LOCAL_IP!
echo.

REM Check if Next.js is running
echo [INFO] Checking if Next.js is running...
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Next.js is not running on port 3000
    echo.
    echo Please start it first:
    echo   1. Run GO.bat
    echo   2. Or: cd wordpress-headless-example\frontend ^&^& npm run dev
    echo.
    set "NEXTJS_RUNNING=NO"
) else (
    echo [OK] Next.js is running
    set "NEXTJS_RUNNING=YES"
)
echo.

REM Setup Windows Firewall
echo [INFO] Setting up Windows Firewall...
netsh advfirewall firewall show rule name="Next.js Port 3000" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Creating firewall rule (may require admin)...
    netsh advfirewall firewall add rule name="Next.js Port 3000" dir=in action=allow protocol=TCP localport=3000 >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Firewall rule created
    ) else (
        echo [WARNING] Could not create firewall rule automatically
        echo [INFO] You may need to allow port 3000 manually in Windows Firewall
    )
) else (
    echo [OK] Firewall rule already exists
)
echo.

echo ========================================
echo   YOUR WEBSITE URL
echo ========================================
echo.
echo Open this URL on your phone (same WiFi network):
echo.
echo   http://!LOCAL_IP!:3000
echo.
echo ========================================
echo.

if "!NEXTJS_RUNNING!"=="NO" (
    echo [IMPORTANT] Make sure Next.js is running before testing!
    echo.
)

echo Instructions:
echo   1. Make sure your phone is on the SAME WiFi network
echo   2. Open browser on phone
echo   3. Type: http://!LOCAL_IP!:3000
echo   4. If it doesn't work, check Windows Firewall settings
echo.
echo ========================================
echo.
pause
