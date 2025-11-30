@echo off
cls
echo.
echo ========================================
echo   SHARE WEBSITE - NO INSTALLATION NEEDED
echo ========================================
echo.
echo This will help you share your website without installing anything.
echo.
echo Two options:
echo   1. Same WiFi Network (Easiest - No setup needed)
echo   2. Different Networks (Requires router port forwarding)
echo.
pause

cd /d "%~dp0"

echo.
echo ========================================
echo   OPTION 1: SAME WIFI NETWORK
echo ========================================
echo.
echo [INFO] Getting your local IP address...
echo.

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set LOCAL_IP=%%a
    set LOCAL_IP=!LOCAL_IP:~1!
    goto :found_ip
)

:found_ip
if "%LOCAL_IP%"=="" (
    echo [ERROR] Could not detect local IP address
    echo.
    echo Please find it manually:
    echo   1. Open Command Prompt
    echo   2. Type: ipconfig
    echo   3. Look for "IPv4 Address" under your WiFi adapter
    echo   4. It will look like: 192.168.1.100
    echo.
) else (
    echo [SUCCESS] Your local IP address is: %LOCAL_IP%
    echo.
    echo ========================================
    echo   ACCESS FROM YOUR PHONE
    echo ========================================
    echo.
    echo Make sure:
    echo   1. Your phone is on the SAME WiFi network
    echo   2. Next.js is running (http://localhost:3000)
    echo   3. Windows Firewall allows connections
    echo.
    echo Open this URL on your phone:
    echo.
    echo   http://%LOCAL_IP%:3000
    echo.
    echo Or scan this QR code (if you have a QR code generator):
    echo   http://%LOCAL_IP%:3000
    echo.
)

echo.
echo ========================================
echo   WINDOWS FIREWALL SETUP
echo ========================================
echo.
echo [INFO] Checking Windows Firewall rules...
echo.

REM Check if port 3000 is allowed
netsh advfirewall firewall show rule name="Next.js Port 3000" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Creating Windows Firewall rule for port 3000...
    echo [INFO] You may be prompted for administrator access.
    echo.
    
    REM Try to create firewall rule (requires admin)
    netsh advfirewall firewall add rule name="Next.js Port 3000" dir=in action=allow protocol=TCP localport=3000 >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Firewall rule created successfully!
    ) else (
        echo [WARNING] Could not create firewall rule automatically.
        echo.
        echo Please create it manually:
        echo   1. Open Windows Defender Firewall
        echo   2. Advanced Settings
        echo   3. Inbound Rules -^> New Rule
        echo   4. Port -^> TCP -^> Specific: 3000
        echo   5. Allow connection
        echo   6. Apply to all profiles
        echo   7. Name: "Next.js Port 3000"
        echo.
    )
) else (
    echo [OK] Firewall rule already exists
)

echo.
echo ========================================
echo   OPTION 2: DIFFERENT NETWORKS
echo ========================================
echo.
echo To share with friends on different WiFi networks,
echo you need to set up router port forwarding.
echo.
echo This requires:
echo   1. Access to your router admin panel
echo   2. Your router's public IP address
echo   3. Port forwarding configuration
echo.
echo See PORT-FORWARDING-GUIDE.md for detailed instructions.
echo.
echo ========================================
echo   QUICK TEST
echo ========================================
echo.
echo Testing if Next.js is accessible...
echo.

curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Next.js is running on localhost:3000
    if not "%LOCAL_IP%"=="" (
        echo [INFO] Try accessing from your phone: http://%LOCAL_IP%:3000
    )
) else (
    echo [WARNING] Next.js is not running on port 3000
    echo.
    echo Please start it first:
    echo   1. Run GO.bat (starts Next.js automatically)
    echo   2. Or manually: cd wordpress-headless-example\frontend ^&^& npm run dev
    echo.
)

echo.
echo ========================================
echo   TROUBLESHOOTING
echo ========================================
echo.
echo If phone can't connect:
echo.
echo 1. Check both devices are on same WiFi
echo 2. Check Windows Firewall allows port 3000
echo 3. Check router doesn't block device-to-device communication
echo 4. Try disabling Windows Firewall temporarily to test
echo 5. Make sure Next.js is actually running
echo.
echo ========================================
echo.
pause

