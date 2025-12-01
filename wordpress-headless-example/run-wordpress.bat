@echo off
echo ========================================
echo   The Rooms - WordPress + Frontend
echo ========================================
echo.

echo Starting WordPress Docker container...
cd wordpress
start "WordPress" cmd /k "docker-compose up"
timeout /t 3 /nobreak >nul

echo.
echo Starting Next.js frontend...
cd ..\frontend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo.
echo Frontend will be available at: http://localhost:3000
echo WordPress will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the frontend server
echo (WordPress will continue running in separate window)
echo.

call npm run dev

pause

