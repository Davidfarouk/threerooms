@echo off
setlocal enabledelayedexpansion
cls
echo.
echo ========================================
echo   GET NGROK URL
echo ========================================
echo.

REM Try to get URL from ngrok API with retries
set "NGROK_URL="
set "RETRY_COUNT=0"
set "MAX_RETRIES=5"

:retry
echo [INFO] Checking ngrok status (attempt !RETRY_COUNT! of !MAX_RETRIES!)...

REM Try to extract URL using PowerShell with error handling
for /f "tokens=*" %%i in ('powershell -Command "$ErrorActionPreference='SilentlyContinue'; try { $response = Invoke-RestMethod -Uri 'http://localhost:4040/api/tunnels' -TimeoutSec 3 -ErrorAction Stop; if ($response.tunnels -and $response.tunnels.Count -gt 0) { $response.tunnels[0].public_url } } catch { }" 2^>nul') do (
    set "NGROK_URL=%%i"
)

if not "!NGROK_URL!"=="" (
    goto :url_found
)

REM If URL not found, wait and retry
set /a RETRY_COUNT+=1
if !RETRY_COUNT! LSS !MAX_RETRIES! (
    timeout /t 2 /nobreak >nul
    goto :retry
)

REM Still not found - show error
echo.
echo [ERROR] ngrok is not running or not accessible
echo.
echo Please start ngrok first:
echo   1. Run START-NGROK.bat
echo   2. Wait 10-15 seconds for it to fully start
echo   3. Then run this script again
echo.
echo Or check the ngrok window manually:
echo   - Look for: Forwarding https://abc123.ngrok.io
echo   - Or visit: http://localhost:4040
echo.
pause
exit /b 1

:url_found
echo.
echo ========================================
echo   YOUR PUBLIC URL
echo ========================================
echo.
echo   !NGROK_URL!
echo.
echo ========================================
echo.
echo ✅ Copy this URL and share it globally!
echo.
echo This URL works from anywhere in the world.
echo Share it with users in different countries!
echo.
echo ========================================
echo.
pause

