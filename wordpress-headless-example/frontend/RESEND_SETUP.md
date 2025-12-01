# Resend Email Service Setup

## Quick Setup (5 minutes)

### 1. Sign Up for Resend
1. Go to https://resend.com
2. Click "Sign Up" (free tier available - 3,000 emails/month)
3. Verify your email address

### 2. Get Your API Key
1. After signing in, go to **API Keys** in the sidebar
2. Click **"Create API Key"**
3. Name it: "The Rooms Poundbury Website"
4. Copy the API key (starts with `re_`)

### 3. Verify Your Domain (Optional but Recommended)
1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Enter: `theroomspoundbury.co.uk`
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually a few minutes)

**Note**: If you don't verify the domain, you can still send emails, but they'll be from `onboarding@resend.dev` (less professional). Domain verification allows `noreply@theroomspoundbury.co.uk`.

### 4. Add API Key to Environment Variables
Add to your `.env.local` file:
```env
RESEND_API_KEY=re_your_api_key_here
```

### 5. Test the Contact Form
1. Restart your dev server: `npm run dev`
2. Go to `/contact-us`
3. Fill out and submit the form
4. Check `info@theroomspoundbury.co.uk` inbox

## Email Configuration

The contact form is configured to:
- **Send to**: `info@theroomspoundbury.co.uk`
- **From**: `noreply@theroomspoundbury.co.uk` (after domain verification)
- **Reply-To**: The user's email (so you can reply directly)

## Production Deployment

When deploying to Vercel/Netlify:
1. Go to your project settings
2. Add environment variable: `RESEND_API_KEY`
3. Paste your Resend API key
4. Redeploy

## Troubleshooting

**Emails not sending?**
- Check that `RESEND_API_KEY` is set in `.env.local`
- Check Resend dashboard for error logs
- Verify domain if using custom "from" address

**Getting rate limited?**
- Free tier: 3,000 emails/month
- Upgrade if needed: https://resend.com/pricing

## Alternative: Use Your Email (If Resend Doesn't Work)

If you prefer to use your existing email provider, you can use SMTP instead. Contact me and I can set up Nodemailer with your SMTP settings.

