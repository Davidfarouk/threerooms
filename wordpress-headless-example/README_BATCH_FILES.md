# Batch Files Guide

Quick-start scripts for Windows development.

## 🚀 Available Scripts

### `run.bat` - Start Frontend Only
Starts the Next.js development server.

**Usage:**
```bash
run.bat
```

**What it does:**
- Checks if dependencies are installed
- Installs them if needed
- Starts the dev server at `http://localhost:3000`

---

### `run-wordpress.bat` - Start WordPress + Frontend
Starts both WordPress (Docker) and the Next.js frontend.

**Usage:**
```bash
run-wordpress.bat
```

**What it does:**
- Starts WordPress in Docker (separate window)
- Starts Next.js frontend
- WordPress: `http://localhost:8080`
- Frontend: `http://localhost:3000`

**Note:** Make sure Docker is running before using this script.

---

### `build.bat` - Production Build
Creates an optimized production build.

**Usage:**
```bash
build.bat
```

**What it does:**
- Checks/installs dependencies
- Runs `npm run build`
- Creates optimized production files in `.next/` folder

**After building:**
- Run `npm start` in the frontend folder to start production server
- Or deploy the `.next` folder to your hosting

---

## 📝 Quick Tips

1. **First Time Setup:**
   - Run `run.bat` - it will install dependencies automatically

2. **Development:**
   - Use `run.bat` for frontend-only development
   - Use `run-wordpress.bat` if you need to edit WordPress content

3. **Production:**
   - Run `build.bat` before deploying
   - Test locally with `npm start` in frontend folder

4. **Stopping Servers:**
   - Press `Ctrl+C` in the terminal
   - For WordPress: Close the Docker window or run `docker-compose down` in wordpress folder

