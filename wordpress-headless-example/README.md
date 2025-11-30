# The Rooms Poundbury - Website Project

## 📁 Folder Structure

```
wordpress-headless-example/
├── README.md                    # This file - project overview
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/                # Next.js pages (App Router)
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── about-us/        # About page
│   │   │   ├── therapies/       # Services archive
│   │   │   ├── service/[slug]/  # Individual service pages
│   │   │   ├── meet-the-team/   # Team archive
│   │   │   ├── team/[slug]/     # Individual team member pages
│   │   │   ├── case-study/      # Case studies archive
│   │   │   ├── blog/            # Blog archive
│   │   │   ├── contact-us/      # Contact page
│   │   │   └── hire-therapy-room-dorchester/  # Room hire page
│   │   ├── components/          # React components
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   ├── Footer.tsx       # Footer
│   │   │   ├── AnimatedSection.tsx
│   │   │   ├── AnimatedCard.tsx
│   │   │   └── ...
│   │   └── lib/                 # Utilities
│   │       ├── wordpress.ts    # WordPress API helpers
│   │       └── animations.ts    # Animation variants
│   ├── package.json            # Dependencies
│   └── next.config.js          # Next.js config
│
└── wordpress/                   # WordPress backend (Docker)
    └── docker-compose.yml       # Docker configuration
```

## 🏗️ Architecture

### Backend (WordPress)
- **Location**: Docker container (`wordpress_site`)
- **URL**: http://localhost:8080
- **Admin**: http://localhost:8080/wp-admin
- **Plugin**: `the-rooms-architecture.php` (in root folder)
  - Registers Custom Post Types: `service`, `team`, `case_study`
  - Adds custom fields for all content types
  - Exposes REST API endpoints

### Frontend (Next.js)
- **Location**: `frontend/` folder
- **URL**: http://localhost:3000
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Type Safety**: TypeScript

## 🚀 Quick Start

### 1. Setup (First Time)
```batch
cd d:\lucie
SETUP.bat
```

### 2. Activate WordPress Plugin
1. Go to http://localhost:8080/wp-admin
2. Plugins → Activate "The Rooms Architecture"
3. Settings → Permalinks → Save Changes

### 3. Import Content
```batch
IMPORT.bat
```

### 4. Start Website
```batch
START.bat
```

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, featured services, team preview |
| `/about-us` | About The Rooms, history, royal visit |
| `/therapies` | All services archive (grid view) |
| `/service/[slug]` | Individual service page with details |
| `/meet-the-team` | All team members archive (grid view) |
| `/team/[slug]` | Individual team member profile |
| `/case-study` | Case studies archive |
| `/case-study/[slug]` | Individual case study |
| `/blog` | Blog posts archive |
| `/blog/[slug]` | Individual blog post |
| `/contact-us` | Contact form and information |
| `/hire-therapy-room-dorchester` | Room rental information |

## 🎨 Components

### Reusable Components
- **Header**: Navigation with mobile menu
- **Footer**: Links and contact info
- **AnimatedSection**: Scroll-triggered fade-in sections
- **AnimatedCard**: Cards with hover effects
- **AnimatedButton**: Buttons with variants (primary, secondary, outline)
- **StaggerContainer**: Staggered animations for lists

## 🔧 Development

### Start Development Server
```bash
cd frontend
npm run dev
```

### Build for Production
```bash
cd frontend
npm run build
npm start
```

### WordPress API
The frontend fetches data from WordPress REST API:
- Services: `/wp-json/wp/v2/service`
- Team: `/wp-json/wp/v2/team`
- Case Studies: `/wp-json/wp/v2/case_study`
- Pages: `/wp-json/wp/v2/pages`
- Posts: `/wp-json/wp/v2/posts`

## 📝 Content Management

### Adding Services
1. WordPress Admin → Services → Add New
2. Fill in title, content, and custom fields
3. Publish

### Adding Team Members
1. WordPress Admin → Team → Add New
2. Fill in name, bio, position, credentials, contact info
3. Set featured image
4. Publish

### Custom Fields
- **Services**: tagline, price_range, duration, conditions_treated
- **Team**: position, credentials, starting_price, email, phone, bio, specializations
- **Case Studies**: case_summary, symptoms, therapies_used, treatment_process, results, customer_review

## 🐛 Troubleshooting

### WordPress API Not Working
1. Check plugin is activated
2. Go to Settings → Permalinks → Save Changes
3. Test: http://localhost:8080/wp-json/wp/v2/service

### Frontend Not Loading
1. Check WordPress is running: http://localhost:8080
2. Check Next.js is running: http://localhost:3000
3. Clear cache: Delete `frontend/.next` folder
4. Restart: Run `START.bat` again

### Content Not Showing
1. Run `IMPORT.bat` again
2. Check WordPress admin for imported content
3. Verify plugin is activated
4. Check browser console for errors

## 📚 Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **WordPress**: Headless CMS
- **Docker**: Containerized WordPress

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify WordPress plugin is activated
3. Check Docker containers are running
4. Review troubleshooting section above
