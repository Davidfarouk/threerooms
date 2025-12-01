# Quick Start Guide

## For Testing Email Form (Fastest)

**Just want to test the contact form?** Use this:

1. Double-click: `wordpress-headless-example/run.bat`
   - Starts frontend only
   - Loads `.env.local` automatically
   - Ready in ~10 seconds

2. Go to: `http://localhost:3000/contact-us`
3. Test the form!

## For Full Setup (First Time or After Changes)

**Need WordPress + Frontend?** Use this:

1. Double-click: `GO.bat` (in `lucie` directory)
   - Sets up WordPress
   - Imports content
   - Starts frontend
   - Takes 2-5 minutes

## What GO.bat Does

When you run `GO.bat`, it:
1. ✅ Checks/starts WordPress Docker container
2. ✅ Installs WordPress plugin
3. ✅ Imports content (services, team, etc.)
4. ✅ Uploads media
5. ✅ Starts Next.js frontend server

**Note**: If you've already run it before and just want to test, use `run.bat` instead - it's much faster!

## Environment Variables

The `.env.local` file in `frontend/` folder is automatically loaded by Next.js when you run:
- `npm run dev`
- `run.bat`
- `GO.bat` (which calls run.bat)

So your Resend API key will work automatically! ✅

