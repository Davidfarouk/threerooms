# Ngrok Setup Guide

## What is Ngrok?

Ngrok creates a secure tunnel from the internet to your local development server, allowing you to:
- Test your website on your phone
- Share with friends on different WiFi networks
- Access from anywhere in the world
- Test on real devices without deploying

## Quick Start

### Option 1: Using the Batch File (Easiest)

1. **Make sure Next.js is running:**
   - Run `GO.bat` (which starts Next.js automatically)
   - Or manually: `cd wordpress-headless-example\frontend && npm run dev`

2. **Start ngrok:**
   - Run `START-NGROK.bat`
   - Copy the URL that appears (e.g., `https://abc123.ngrok.io`)
   - Share it or use it on your phone!

### Option 2: Manual Setup

1. **Download ngrok:**
   - Go to: https://ngrok.com/download
   - Download for Windows
   - Extract `ngrok.exe`

2. **Add to PATH (Optional but Recommended):**
   - Copy `ngrok.exe` to a folder in your PATH (e.g., `C:\Windows\System32`)
   - Or add the folder containing ngrok.exe to your PATH environment variable

3. **Run ngrok:**
   ```bash
   ngrok http 3000
   ```

## How It Works

1. **Ngrok creates a tunnel:**
   - Public URL: `https://abc123.ngrok.io` (example)
   - Points to: `http://localhost:3000` (your local server)

2. **Access from anywhere:**
   - Phone: Open `https://abc123.ngrok.io` in mobile browser
   - Friend's computer: Share the URL
   - Any device: Works from anywhere!

3. **Security:**
   - URL is random and hard to guess
   - HTTPS encrypted
   - Only works while ngrok is running

## Important Notes

### ⚠️ Free ngrok Limitations:
- **URL changes each time** (unless you have a paid plan)
- **Session expires** after 2 hours (free plan)
- **Limited requests** per minute (free plan)

### ✅ Best Practices:
- **Start Next.js first** - Make sure `http://localhost:3000` is running
- **Keep ngrok running** - Don't close the window while testing
- **Share the URL** - Copy the HTTPS URL (not HTTP)
- **Test quickly** - Free URLs expire after 2 hours

## Troubleshooting

### "ngrok not found"
- Download ngrok from https://ngrok.com/download
- Extract `ngrok.exe` to this folder, OR
- Add ngrok to your PATH environment variable

### "Connection refused"
- Make sure Next.js is running on port 3000
- Check: http://localhost:3000 works in your browser
- Restart Next.js if needed

### "Tunnel not found"
- Free ngrok URLs expire after 2 hours
- Just restart `START-NGROK.bat` to get a new URL

### Website loads but images don't show
- Images are served from `localhost:8080` (WordPress)
- You need to also tunnel WordPress port, OR
- Use ngrok for both ports (requires paid plan or two ngrok instances)

## Advanced: Tunnel Both Ports

If you want to tunnel both Next.js (3000) and WordPress (8080):

1. **Terminal 1:** `ngrok http 3000` (for Next.js)
2. **Terminal 2:** `ngrok http 8080` (for WordPress)

Then update `wordpress-headless-example/frontend/.env.local`:
```
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-ngrok-url.ngrok.io
```

## Paid Ngrok Features

If you need:
- **Fixed URL** (doesn't change each time)
- **Custom domain**
- **No time limits**
- **More requests**

Sign up for ngrok paid plan: https://ngrok.com/pricing

---

**Ready to test!** Run `START-NGROK.bat` and share the URL! 🚀

