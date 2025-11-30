@echo off
cls
echo.
echo ========================================
echo   GET NGROK URL
echo ========================================
echo.
echo This will show your ngrok public URL
echo (Make sure ngrok is running first!)
echo.
pause

REM Try to get URL from ngrok API
echo [INFO] Fetching ngrok URL...
curl -s http://localhost:4040/api/tunnels >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] ngrok is not running or not accessible
    echo.
    echo Please start ngrok first:
    echo   1. Run START-NGROK.bat
    echo   2. Wait for it to start
    echo   3. Then run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   YOUR PUBLIC URL
echo ========================================
echo.

REM Try to extract URL using PowerShell
for /f "tokens=*" %%i in ('powershell -Command "$response = Invoke-RestMethod -Uri 'http://localhost:4040/api/tunnels'; $response.tunnels[0].public_url"') do (
    set "NGROK_URL=%%i"
    echo   !NGROK_URL!
    echo.
    echo Copy this URL and share it globally!
    echo.
    goto :url_found
)

:url_found
if "!NGROK_URL!"=="" (
    echo [INFO] Could not auto-detect URL
    echo.
    echo Please check the ngrok window or visit:
    echo   http://localhost:4040
    echo.
) else (
    echo ========================================
    echo.
    echo Share this URL with anyone, anywhere!
    echo.
)

pause

