@echo off
cls
echo.
echo ========================================
echo   THE ROOMS POUNDBURY - COMPLETE SETUP
echo ========================================
echo.
echo This will do EVERYTHING:
echo   1. Setup WordPress plugin
echo   2. Activate plugin (automated)
echo   3. Flush permalinks (automated)
echo   4. Import services and therapists from JSON
echo   5. Import logos, gallery, and rental options
echo   6. Copy resources
echo   7. Upload all media to WordPress
echo   8. Link images to content
echo   9. Start the website
echo.
pause

cd /d "%~dp0"

echo.
echo ========================================
echo   STEP 1/9: SETUP WORDPRESS
echo ========================================
echo.

echo [1/9] Checking WordPress container...
docker ps --filter "name=wordpress_site" --format "{{.Names}}" | findstr /C:"wordpress_site" >nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting WordPress container...
    cd wordpress-headless-example
    docker-compose up -d
    cd ..
    echo Waiting for WordPress to start...
    timeout /t 15 /nobreak >nul
)
echo [OK] WordPress container running
echo.

echo [2/9] Installing WordPress Plugin...
docker cp the-rooms-architecture.php wordpress_site:/var/www/html/wp-content/plugins/the-rooms-architecture/the-rooms-architecture.php
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to copy plugin
    pause
    exit /b 1
)
echo [OK] Plugin installed
echo.

echo [3/9] Activating Plugin (automated)...
docker exec wordpress_site wp plugin activate the-rooms-architecture --allow-root >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Could not auto-activate plugin. Please activate manually:
    echo   http://localhost:8080/wp-admin -^> Plugins
) else (
    echo [OK] Plugin activated
)
echo.

echo [4/9] Flushing Permalinks (automated)...
docker exec wordpress_site wp rewrite flush --allow-root >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Could not auto-flush permalinks. Please do manually:
    echo   Settings -^> Permalinks -^> Save Changes
) else (
    echo [OK] Permalinks flushed
)
echo.

echo ========================================
echo   STEP 2/9: IMPORTING NEW RESOURCES
echo ========================================
echo.

echo [5/9] Importing new resources data (services and therapists)...
if exist "new resources\therapies_by_service.json" (
    docker exec wordpress_site mkdir -p /var/www/html/temp-resources
    docker cp "new resources\therapies_by_service.json" wordpress_site:/var/www/html/temp-resources/therapies_by_service.json 2>nul
    docker cp "new resources\therapists_directory.json" wordpress_site:/var/www/html/temp-resources/therapists_directory.json 2>nul
    docker cp import-new-resources.php wordpress_site:/var/www/html/import-new-resources.php
    docker exec wordpress_site php /var/www/html/import-new-resources.php
    echo [OK] New resources data imported from JSON
) else (
    echo [SKIP] New resources JSON files not found, skipping import
)
echo.

echo [6/9] Importing existing content (logos, gallery, rental options)...
docker cp import-existing-content.php wordpress_site:/var/www/html/import-existing-content.php
docker exec wordpress_site php /var/www/html/import-existing-content.php
echo [OK] Existing content imported
echo.

echo [7/9] Linking images to content...
docker cp link-images-to-content.php wordpress_site:/var/www/html/link-images-to-content.php
docker exec wordpress_site php /var/www/html/link-images-to-content.php
echo [OK] Images linked to content
echo.

echo ========================================
echo   STEP 3/9: COPYING RESOURCES
echo ========================================
echo.

echo [7/9] Setting up optimized resources directory...
if not exist "wordpress-headless-example\frontend\public" mkdir "wordpress-headless-example\frontend\public"
if not exist "wordpress-headless-example\frontend\public\resources" mkdir "wordpress-headless-example\frontend\public\resources"
if not exist "wordpress-headless-example\frontend\public\resources\Therapist Headshots" mkdir "wordpress-headless-example\frontend\public\resources\Therapist Headshots"
if not exist "wordpress-headless-example\frontend\public\resources\Logos" mkdir "wordpress-headless-example\frontend\public\resources\Logos"

REM Copy new therapist images from new resources folder
if exist "new resources\*.png" (
    echo [INFO] Copying new therapist images...
    copy "new resources\aimee overington.png" "wordpress-headless-example\frontend\public\resources\Therapist Headshots\Aimee Overington.png" >nul 2>&1
    copy "new resources\Chrissy Fraser.png" "wordpress-headless-example\frontend\public\resources\Therapist Headshots\Chrissy Fraser.png" >nul 2>&1
    copy "new resources\elizabeth bray.png" "wordpress-headless-example\frontend\public\resources\Therapist Headshots\Elizabeth Bray.png" >nul 2>&1
    copy "new resources\melika clason .png" "wordpress-headless-example\frontend\public\resources\Therapist Headshots\Melika Clason.png" >nul 2>&1
    echo [OK] New therapist images copied
)

REM Check if optimized resources already exist (check for image files or subdirectories)
dir /b "wordpress-headless-example\frontend\public\resources\*.jpg" >nul 2>&1
if %ERRORLEVEL% EQU 0 goto :resources_exist
dir /b "wordpress-headless-example\frontend\public\resources\*.png" >nul 2>&1
if %ERRORLEVEL% EQU 0 goto :resources_exist
dir /b "wordpress-headless-example\frontend\public\resources\*.jpeg" >nul 2>&1
if %ERRORLEVEL% EQU 0 goto :resources_exist
dir /b "wordpress-headless-example\frontend\public\resources\Logos" >nul 2>&1
if %ERRORLEVEL% EQU 0 goto :resources_exist
dir /b "wordpress-headless-example\frontend\public\resources\Therapist Headshots" >nul 2>&1
if %ERRORLEVEL% EQU 0 goto :resources_exist

REM No optimized resources found
echo [WARN] Optimized resources not found in: wordpress-headless-example\frontend\public\resources
echo [INFO] Please ensure optimized resources are in place before running GO.bat
goto :resources_done

:resources_exist
echo [OK] Optimized resources directory ready
echo [INFO] All resources are in: wordpress-headless-example\frontend\public\resources
echo [INFO] - Therapist Headshots: wordpress-headless-example\frontend\public\resources\Therapist Headshots
echo [INFO] - Logos: wordpress-headless-example\frontend\public\resources\Logos
echo [INFO] - Other images and files: wordpress-headless-example\frontend\public\resources

:resources_done
echo.

echo ========================================
echo   STEP 4/9: UPLOAD MEDIA TO WORDPRESS
echo ========================================
echo.

echo [9/9] Uploading all media to WordPress Media Library...
if exist "wordpress-headless-example\frontend\public\resources" (
    echo [INFO] Copying resources to WordPress container...
    docker exec wordpress_site mkdir -p /var/www/html/temp-resources-upload
    docker cp "wordpress-headless-example\frontend\public\resources" wordpress_site:/var/www/html/temp-resources-upload/ 2>nul
    docker cp upload-all-media-to-wordpress.php wordpress_site:/var/www/html/upload-all-media-to-wordpress.php
    docker exec wordpress_site php /var/www/html/upload-all-media-to-wordpress.php
    echo [OK] All media uploaded to WordPress
) else (
    echo [SKIP] Resources folder not found, skipping media upload
)
echo.

echo ========================================
echo   STEP 5/9: SETUP FRONTEND
echo ========================================
echo.

echo [9/9] Setting up frontend dependencies...
cd wordpress-headless-example\frontend

REM Install dependencies if needed
if not exist node_modules (
    echo Installing npm packages...
    call npm install
) else (
    echo [OK] Dependencies already installed
)
cd ..\..
echo [OK] Frontend ready
echo.

echo ========================================
echo   VERIFICATION
echo ========================================
echo.

docker exec wordpress_site php -r "define('WP_USE_THEMES', false); require('/var/www/html/wp-load.php'); echo 'Services: ' . wp_count_posts('service')->publish . PHP_EOL; echo 'Team: ' . wp_count_posts('team')->publish . PHP_EOL; echo 'Pages: ' . wp_count_posts('page')->publish . PHP_EOL;"

echo.
echo ========================================
echo   STEP 6/9: STARTING SERVICES
echo ========================================
echo.

echo Starting WordPress...
docker ps --filter "name=wordpress_site" --format "{{.Names}}" | findstr /C:"wordpress_site" >nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting WordPress container...
    cd wordpress-headless-example
    docker-compose up -d
    cd ..
    timeout /t 10 /nobreak >nul
)
echo [OK] WordPress: http://localhost:8080
echo.

echo Starting Next.js Frontend...
echo This will open in a new window...
echo.
cd wordpress-headless-example
start "Next.js Dev Server" cmd /k "run.bat"
cd ..

echo.
echo ========================================
echo   ✅ EVERYTHING IS READY!
echo ========================================
echo.
echo Website: http://localhost:3000
echo WordPress Admin: http://localhost:8080/wp-admin
echo.
echo The Next.js server is running in a new window.
echo Close that window to stop the server.
echo.
pause
