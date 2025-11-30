@echo off
echo ========================================
echo   PUSH TO GITHUB
echo ========================================
echo.

echo Step 1: Create a GitHub repository
echo ------------------------------------
echo 1. Go to: https://github.com/new
echo 2. Repository name: the-rooms-poundbury-website
echo 3. Description: Headless WordPress + Next.js website for The Rooms Poundbury
echo 4. Choose Public or Private
echo 5. DO NOT initialize with README
echo 6. Click "Create repository"
echo.
pause

echo.
echo Step 2: Enter your GitHub username
echo ------------------------------------
set /p GITHUB_USER="Enter your GitHub username: "

if "%GITHUB_USER%"=="" (
    echo Error: GitHub username is required
    pause
    exit /b 1
)

echo.
echo Step 3: Adding remote and pushing...
echo ------------------------------------

git remote add origin https://github.com/%GITHUB_USER%/the-rooms-poundbury-website.git 2>nul
if errorlevel 1 (
    git remote set-url origin https://github.com/%GITHUB_USER%/the-rooms-poundbury-website.git
)

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Possible reasons:
    echo - Repository doesn't exist yet (create it first)
    echo - Authentication required (GitHub will prompt you)
    echo - Wrong username
    echo.
    echo Try running this script again after creating the repository.
    echo.
) else (
    echo.
    echo ========================================
    echo   SUCCESS!
    echo ========================================
    echo.
    echo Your code has been pushed to GitHub!
    echo Repository: https://github.com/%GITHUB_USER%/the-rooms-poundbury-website
    echo.
)

pause

