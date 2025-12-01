# 🚀 Vercel Deployment Guide

## Quick Setup (5 minutes)

### 1. Connect to Vercel

1. Go to https://vercel.com
2. Sign up/Login (use GitHub to connect)
3. Click **"Add New Project"**
4. Import from GitHub: **`Davidfarouk/threerooms`**

### 2. Configure Project

**Important Settings:**

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `wordpress-headless-example/frontend` ⚠️ **CRITICAL!**
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 3. Environment Variables

Click **"Environment Variables"** and add:

```env
NEXT_PUBLIC_SITE_URL=https://www.theroomspoundbury.co.uk
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-domain.com/wp-json/wp/v2
NEXT_PUBLIC_GA_ID=G-LYG9SWH7F9
RESEND_API_KEY=re_3b6Srz5j_3QhLs5EdsPXVvXgTk7o3Vi53
```

**Important:**
- Replace `your-wordpress-domain.com` with your actual WordPress URL
- All variables should be set for **Production**, **Preview**, and **Development**

### 4. Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your site will be live at: `https://your-project.vercel.app`

### 5. Connect Custom Domain

1. Go to **Settings** → **Domains**
2. Add: `www.theroomspoundbury.co.uk`
3. Follow DNS instructions
4. Wait for SSL (automatic, usually 1-2 minutes)

---

## ⚠️ Important Notes

### Root Directory
**MUST be set to**: `wordpress-headless-example/frontend`

If you don't set this, Vercel will look for `package.json` in the wrong place and fail!

### WordPress URL
Update `NEXT_PUBLIC_WORDPRESS_API_URL` to your production WordPress URL:
- Example: `https://api.theroomspoundbury.co.uk/wp-json/wp/v2`
- Or: `https://your-wordpress-hosting.com/wp-json/wp/v2`

### Resend Domain
**Before going live**, verify your domain in Resend:
- Go to https://resend.com/domains
- Add `theroomspoundbury.co.uk`
- Add DNS records
- Wait for verification

---

## 📋 Post-Deployment Checklist

- [ ] Site loads at custom domain
- [ ] All pages work (Home, About, Services, Team, Contact)
- [ ] Images load correctly
- [ ] Contact form sends emails
- [ ] Google Analytics tracking works
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Test on mobile devices
- [ ] Check page speed

---

## 🔧 Troubleshooting

### Build Fails
- Check root directory is set correctly
- Verify all environment variables are set
- Check build logs for errors

### Images Not Loading
- Verify WordPress URL is correct
- Check `next.config.js` allows your WordPress domain
- Ensure WordPress media is accessible

### Contact Form Not Working
- Verify `RESEND_API_KEY` is set
- Check Resend domain is verified
- Check Vercel function logs

### WordPress API Errors
- Verify `NEXT_PUBLIC_WORDPRESS_API_URL` is correct
- Check WordPress REST API is enabled
- Ensure WordPress is accessible via HTTPS

---

## 🎯 Next Steps After Deployment

1. **Google Search Console**
   - Add property: `https://www.theroomspoundbury.co.uk`
   - Submit sitemap: `/sitemap.xml`

2. **Test Everything**
   - All pages
   - Contact form
   - Mobile responsiveness

3. **Monitor**
   - Check Vercel analytics
   - Monitor Google Analytics
   - Check Resend dashboard for emails

---

**Your code is on GitHub and ready for Vercel!** 🚀

Repository: https://github.com/Davidfarouk/threerooms

