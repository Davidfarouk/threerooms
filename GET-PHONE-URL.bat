@echo off
setlocal enabledelayedexpansion
cls

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set "IP=%%a"
    set "IP=!IP:~1!"
    if not "!IP!"=="" (
        set "LOCAL_IP=!IP!"
        goto :found
    )
)

:found
if "!LOCAL_IP!"=="" (
    echo ERROR: Could not detect IP address
    pause
    exit /b 1
)

REM Setup firewall
netsh advfirewall firewall show rule name="Next.js Port 3000" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    netsh advfirewall firewall add rule name="Next.js Port 3000" dir=in action=allow protocol=TCP localport=3000 >nul 2>&1
)

echo.
echo ========================================
echo   PHONE TESTING URL
echo ========================================
echo.
echo Open this on your phone (same WiFi):
echo.
echo   http://!LOCAL_IP!:3000
echo.
echo ========================================
echo.
pause

