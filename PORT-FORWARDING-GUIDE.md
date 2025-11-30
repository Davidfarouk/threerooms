# Port Forwarding Guide - Share Website Without ngrok

## Overview

This guide shows you how to share your website with friends on different WiFi networks using router port forwarding - **no additional software needed!**

## ⚠️ Important Security Note

Port forwarding exposes your local server to the internet. Only do this temporarily for testing. Close the port forwarding when done.

## Method 1: Same WiFi Network (Easiest - No Setup)

**Best for:** Testing on your phone while at home

### Steps:
1. **Get your computer's local IP:**
   - Run `SHARE-LOCAL.bat` - it will show your IP
   - Or manually: Open Command Prompt → `ipconfig` → Look for "IPv4 Address"
   - Example: `192.168.1.100`

2. **Make sure Next.js is running:**
   - Run `GO.bat` or start Next.js manually

3. **Access from phone:**
   - Make sure phone is on **same WiFi network**
   - Open browser on phone
   - Go to: `http://192.168.1.100:3000` (use your actual IP)

**That's it!** No port forwarding needed for same network.

---

## Method 2: Different Networks (Router Port Forwarding)

**Best for:** Sharing with friends on different WiFi networks

### Step 1: Find Your Router's Public IP

1. Open browser
2. Go to: https://whatismyipaddress.com
3. Copy your **Public IPv4 Address**
   - Example: `123.45.67.89`
   - This is what friends will use to access your site

### Step 2: Access Router Admin Panel

1. **Find router IP:**
   - Open Command Prompt
   - Type: `ipconfig`
   - Look for "Default Gateway"
   - Example: `192.168.1.1` or `192.168.0.1`

2. **Login to router:**
   - Open browser
   - Go to: `http://192.168.1.1` (use your Default Gateway)
   - Login with admin credentials
     - Common defaults: `admin/admin` or `admin/password`
     - Check router label for default credentials

### Step 3: Configure Port Forwarding

**Router settings vary, but look for:**
- "Port Forwarding"
- "Virtual Server"
- "NAT Forwarding"
- "Applications & Gaming"

**Create new rule with:**
- **Service Name:** Next.js Website
- **External Port:** 3000 (or any port you want, like 8080)
- **Internal IP:** Your computer's local IP (from Step 1 of Method 1)
- **Internal Port:** 3000
- **Protocol:** TCP
- **Enable:** Yes

**Example:**
```
Service Name: Next.js
External Port: 3000
Internal IP: 192.168.1.100
Internal Port: 3000
Protocol: TCP
Status: Enabled
```

### Step 4: Configure Windows Firewall

1. **Open Windows Defender Firewall:**
   - Windows Key → Search "Firewall"
   - Click "Windows Defender Firewall"

2. **Create Inbound Rule:**
   - Click "Advanced Settings"
   - Click "Inbound Rules" → "New Rule"
   - Select "Port" → Next
   - Select "TCP" → Specific local ports: `3000` → Next
   - Select "Allow the connection" → Next
   - Check all profiles (Domain, Private, Public) → Next
   - Name: "Next.js Port 3000" → Finish

### Step 5: Share with Friends

1. **Get your public IP:**
   - Visit: https://whatismyipaddress.com
   - Copy the IPv4 address

2. **Share the URL:**
   - `http://YOUR_PUBLIC_IP:3000`
   - Example: `http://123.45.67.89:3000`

3. **Friends can access:**
   - From any WiFi network
   - From mobile data
   - From anywhere in the world!

---

## Troubleshooting

### Phone Can't Connect (Same Network)

1. **Check WiFi:**
   - Both devices on same network?
   - Try disconnecting and reconnecting phone WiFi

2. **Check Firewall:**
   - Windows Firewall blocking port 3000?
   - Temporarily disable firewall to test

3. **Check Router:**
   - Some routers block device-to-device communication
   - Check router settings for "AP Isolation" or "Client Isolation"
   - Disable if enabled

4. **Check IP Address:**
   - Make sure you're using the correct local IP
   - IP might change if you reconnect to WiFi

### Friends Can't Connect (Different Network)

1. **Check Port Forwarding:**
   - Is rule enabled in router?
   - Is internal IP correct?
   - Router might need restart after changes

2. **Check Public IP:**
   - Public IP might have changed (if dynamic)
   - Check again: https://whatismyipaddress.com

3. **Check ISP:**
   - Some ISPs block incoming connections
   - May need to contact ISP to allow it

4. **Check Firewall:**
   - Windows Firewall allows port 3000?
   - Router firewall allows incoming connections?

### Port Already in Use

If port 3000 is already used:
- Change Next.js port: `cd wordpress-headless-example/frontend && set PORT=3001 && npm run dev`
- Update port forwarding to use new port
- Or use a different external port in router (e.g., 8080 → 3000)

---

## Security Best Practices

### ⚠️ Important:
- **Only enable port forwarding temporarily** for testing
- **Disable when done** - don't leave it open permanently
- **Don't share your public IP publicly** - only with trusted friends
- **Consider using a password** if you leave it open

### When Done Testing:
1. **Disable port forwarding** in router settings
2. **Remove firewall rule** (optional, but recommended)
3. **Restart router** (optional, clears any cached rules)

---

## Alternative: Use Mobile Hotspot

**Easiest method if router access is difficult:**

1. **Create mobile hotspot** on your phone
2. **Connect computer** to phone's hotspot
3. **Connect phone** to same hotspot
4. **Use local IP** method (Method 1)
5. **Share hotspot** with friends - they connect and use local IP

**Pros:**
- No router configuration needed
- Works anywhere
- Easy to set up

**Cons:**
- Uses mobile data
- Limited to hotspot range
- Friends need to be nearby

---

## Quick Reference

### Same Network:
- **Your IP:** Run `SHARE-LOCAL.bat` or `ipconfig`
- **URL:** `http://YOUR_LOCAL_IP:3000`
- **Example:** `http://192.168.1.100:3000`

### Different Networks:
- **Public IP:** https://whatismyipaddress.com
- **URL:** `http://YOUR_PUBLIC_IP:3000`
- **Example:** `http://123.45.67.89:3000`

### Check if Working:
- **Local:** `curl http://localhost:3000`
- **Network:** `curl http://YOUR_IP:3000` (from another device)

---

**Ready to share!** Run `SHARE-LOCAL.bat` to get started! 🚀

