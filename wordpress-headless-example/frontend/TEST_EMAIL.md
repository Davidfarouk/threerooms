# Test Contact Form Email

## ✅ API Key Added

Your Resend API key has been added to `.env.local`:
```
RESEND_API_KEY=re_3b6Srz5j_3QhLs5EdsPXVvXgTk7o3Vi53
```

## 🧪 How to Test

### 1. Restart Your Dev Server
The server needs to restart to load the new environment variable:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 2. Test the Contact Form
1. Go to: `http://localhost:3000/contact-us`
2. Fill out the form:
   - Name: Test User
   - Email: your-email@example.com (use your real email to test)
   - Phone: (optional)
   - Message: This is a test message
3. Click "Send Message"

### 3. Check Results

**Success:**
- You'll see: "Thank you! Your message has been sent. We will get back to you soon."
- Check `info@theroomspoundbury.co.uk` inbox
- Email should arrive within seconds

**If Error:**
- Check browser console (F12) for errors
- Check server terminal for error messages
- Common issues:
  - Domain not verified (emails will come from `onboarding@resend.dev`)
  - API key invalid
  - Rate limit reached

## 📧 Email Details

- **To**: `info@theroomspoundbury.co.uk`
- **From**: `onboarding@resend.dev` (until domain is verified)
- **Reply-To**: The user's email (so you can reply directly)
- **Subject**: "New Contact Form Submission from [Name]"

## 🔧 Troubleshooting

### "Email service not configured"
- Make sure `.env.local` exists in `frontend/` folder
- Restart the dev server after adding the key
- Check that `RESEND_API_KEY` is set correctly

### "Failed to send email"
- Check Resend dashboard for error logs: https://resend.com/emails
- Verify API key is correct
- Check if you've hit rate limits (free tier: 3,000/month)

### Domain Verification (Optional)
To send from `noreply@theroomspoundbury.co.uk`:
1. Go to Resend dashboard → Domains
2. Add `theroomspoundbury.co.uk`
3. Add DNS records to your domain
4. Wait for verification
5. Update `from` email in `src/app/api/contact/route.ts`

## ✅ Ready to Test!

Restart your server and try the form. The email should arrive at `info@theroomspoundbury.co.uk`!

