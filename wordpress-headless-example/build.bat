@echo off
echo ========================================
echo   The Rooms - Production Build
echo ========================================
echo.

cd frontend

echo Checking for node_modules...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Building for production...
echo.

call npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Build Successful!
    echo ========================================
    echo.
    echo To start the production server, run:
    echo   npm start
    echo.
) else (
    echo.
    echo ========================================
    echo   Build Failed!
    echo ========================================
    echo.
)

pause

