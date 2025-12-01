@echo off
echo ========================================
echo   The Rooms Poundbury - Dev Server
echo ========================================
echo.

cd frontend

echo Checking for node_modules...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting Next.js development server...
echo.
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause

