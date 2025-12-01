# Environment Variables Setup

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.theroomspoundbury.co.uk

# WordPress API
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-LYG9SWH7F9

# Email Service - Resend (Already configured in code)
# Get your API key from: https://resend.com
# See RESEND_SETUP.md for detailed instructions
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

## Notes

- `.env.local` is gitignored and won't be committed
- For production, set these in your hosting platform (Vercel, Netlify, etc.)
- Google Analytics ID is already set: `G-LYG9SWH7F9`

