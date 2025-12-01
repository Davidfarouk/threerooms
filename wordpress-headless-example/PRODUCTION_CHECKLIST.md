# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment Check

### Code Status
- ✅ All SEO implemented (sitemap, robots.txt, metadata, schema)
- ✅ Google Analytics configured (G-LYG9SWH7F9)
- ✅ Contact form working with Resend
- ✅ Email set to: `info@theroomspoundbury.co.uk`
- ✅ All unused files removed
- ✅ Clean folder structure
- ✅ No hardcoded localhost URLs (uses environment variables)

### ⚠️ Important: Domain Verification Required

**Before deploying, you MUST verify your domain in Resend**, otherwise emails will fail!

1. Go to https://resend.com/domains
2. Add domain: `theroomspoundbury.co.uk`
3. Add DNS records to your domain
4. Wait for verification
5. Then emails to `info@theroomspoundbury.co.uk` will work

**Without domain verification**: Resend free tier only allows sending to your account email (`davidfarouk95@gmail.com`).

---

## 📋 Production Deployment Steps

### 1. Choose Hosting Platform

**Recommended: Vercel** (best for Next.js)
- Free tier available
- Automatic deployments from GitHub
- Built-in environment variables
- CDN included

**Alternative: Netlify**
- Also great for Next.js
- Similar features

### 2. Set Up WordPress Backend

Your WordPress needs to be accessible via HTTPS:

**Options:**
- **Same hosting as frontend** (if supported)
- **Separate WordPress hosting** (SiteGround, WP Engine, etc.)
- **Keep Docker** (if you have a server)

**WordPress URL should be:**
```
https://your-wordpress-domain.com
```
or
```
https://api.theroomspoundbury.co.uk
```

### 3. Environment Variables for Production

Set these in your hosting platform (Vercel/Netlify):

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.theroomspoundbury.co.uk

# WordPress API (CHANGE THIS!)
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-domain.com/wp-json/wp/v2

# Google Analytics
NEXT_PUBLIC_GA_ID=G-LYG9SWH7F9

# Resend Email
RESEND_API_KEY=re_3b6Srz5j_3QhLs5EdsPXVvXgTk7o3Vi53
```

### 4. Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Set root directory: `wordpress-headless-example/frontend`
   - Add environment variables (see above)
   - Deploy!

3. **Configure Domain**:
   - Add `www.theroomspoundbury.co.uk` in Vercel
   - Update DNS records as instructed

### 5. WordPress Setup

1. **Install WordPress** on your hosting
2. **Upload Plugin**:
   - Copy `the-rooms-architecture.php` to `wp-content/plugins/`
   - Activate plugin
3. **Set Permalinks**: Settings → Permalinks → Post Name
4. **Import Content**: Run import scripts or use WordPress admin
5. **Update API URL**: Make sure WordPress REST API is accessible

### 6. DNS Configuration

Update your domain DNS:
- **A Record**: Point `www` to Vercel's IP (or CNAME)
- **CNAME**: Point `www` to Vercel (recommended)
- **Resend DNS**: Add records for email domain verification

### 7. SSL Certificate

- Vercel/Netlify provide free SSL automatically
- WordPress hosting should also have SSL
- Ensure both use HTTPS

### 8. Post-Deployment Verification

- [ ] Website loads at `https://www.theroomspoundbury.co.uk`
- [ ] All pages work (Home, About, Services, Team, Contact)
- [ ] Images load correctly
- [ ] Contact form sends emails
- [ ] Google Analytics tracking works
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] No console errors
- [ ] Mobile responsive
- [ ] WordPress API accessible

### 9. Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://www.theroomspoundbury.co.uk`
3. Verify ownership (HTML file, DNS, or meta tag)
4. Submit sitemap: `https://www.theroomspoundbury.co.uk/sitemap.xml`

### 10. Final Checks

- [ ] Test contact form (check `info@theroomspoundbury.co.uk`)
- [ ] Verify Google Analytics data
- [ ] Check all links work
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Verify SSL certificate

---

## 🔧 Configuration Files

### `.env.local` (Development - Don't commit)
```env
NEXT_PUBLIC_SITE_URL=https://www.theroomspoundbury.co.uk
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
NEXT_PUBLIC_GA_ID=G-LYG9SWH7F9
RESEND_API_KEY=re_3b6Srz5j_3QhLs5EdsPXVvXgTk7o3Vi53
```

### Production Environment Variables (Set in Vercel/Netlify)
```env
NEXT_PUBLIC_SITE_URL=https://www.theroomspoundbury.co.uk
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-domain.com/wp-json/wp/v2
NEXT_PUBLIC_GA_ID=G-LYG9SWH7F9
RESEND_API_KEY=re_3b6Srz5j_3QhLs5EdsPXVvXgTk7o3Vi53
```

---

## ⚠️ Critical: Domain Verification for Email

**You MUST verify your domain in Resend before production**, or emails will fail!

**Steps:**
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter: `theroomspoundbury.co.uk`
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually 5-15 minutes)
6. Once verified, emails to `info@theroomspoundbury.co.uk` will work

**Without verification**: Emails can only go to `davidfarouk95@gmail.com` (your Resend account email).

---

## 📝 What's Already Done

✅ SEO fully implemented
✅ Google Analytics configured
✅ Contact form API created
✅ Email service integrated
✅ Sitemap generator
✅ Robots.txt
✅ Structured data (Schema.org)
✅ Dynamic metadata
✅ Clean codebase
✅ All unused files removed

---

## 🎯 Next Steps

1. **Verify Resend domain** (critical!)
2. **Set up WordPress hosting** (if not done)
3. **Push code to GitHub**
4. **Deploy to Vercel/Netlify**
5. **Configure environment variables**
6. **Test everything**
7. **Submit to Google Search Console**

---

## 🆘 Troubleshooting

**Emails not working?**
- Check Resend domain verification
- Verify `RESEND_API_KEY` in production env vars
- Check Resend dashboard for errors

**WordPress API not accessible?**
- Check `NEXT_PUBLIC_WORDPRESS_API_URL` is correct
- Verify WordPress REST API is enabled
- Check CORS settings if needed

**Images not loading?**
- Verify WordPress URL in `next.config.js` allows your domain
- Check image paths are correct
- Ensure WordPress media is accessible

---

**You're ready for production!** 🚀

