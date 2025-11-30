# The Rooms Poundbury - Complete Website Documentation

## 📋 Overview

Complete headless WordPress + Next.js website for The Rooms Poundbury therapy clinic. This is a production-ready, fully dynamic website where all content can be managed through WordPress without code changes.

## 🚀 Quick Start

### One-Click Setup (Recommended)
Just run one file - it does everything:
```batch
GO.bat
```

This automatically:
- Sets up WordPress Docker container
- Installs and activates WordPress plugin
- Imports all content from JSON files
- Uploads all media to WordPress
- Links images to content
- Optimizes images
- Starts the website

**That's it!** No need to run multiple files. Just `GO.bat` and you're done.

### Share & Test on Mobile

**Quick Method - Use Mobile Hotspot:**
1. **Create hotspot on your phone** (Settings → Hotspot)
2. **Connect your computer** to phone's hotspot
3. **Run:** `GET-PHONE-URL.bat` to get the IP
4. **Access from phone:** Use the URL shown (phone is on same network as computer)
5. **Share hotspot with friends** - they connect and use same URL

**Using ngrok (For Different Networks/Countries):**
```batch
START-NGROK.bat
```
- Automatically installs ngrok if needed
- Creates public URL instantly
- Works from anywhere in the world
- Perfect for sharing with users in different countries
- No manual installation needed!

## 🌐 URLs

- **Website**: http://localhost:3000
- **WordPress**: http://localhost:8080
- **WordPress Admin**: http://localhost:8080/wp-admin
  - Default login: `admin` / `admin` (change after first login!)

## 📁 Project Structure

```
├── README.md                      # This comprehensive documentation
├── GO.bat                         # ⭐ ONE-CLICK SETUP (does everything)
│
├── the-rooms-architecture.php     # WordPress plugin (main file)
├── import-new-resources.php       # Imports services & therapists from JSON
├── import-existing-content.php    # Imports logos, gallery, rental options
├── upload-all-media-to-wordpress.php  # Uploads all images to WordPress
├── link-images-to-content.php    # Links uploaded images to content
│
├── new resources/                 # Source data files
│   ├── therapies_by_service.json # Services data
│   ├── therapists_directory.json # Therapists data
│   └── [therapist images]        # Therapist photos
│
└── wordpress-headless-example/    # Main project folder
    ├── frontend/                  # Next.js application
    │   ├── src/
    │   │   ├── app/              # All pages (App Router)
    │   │   ├── components/       # React components
    │   │   └── lib/              # Utilities (WordPress API, etc.)
    │   └── public/resources/     # Static assets (images, logos)
    └── wordpress/                 # WordPress Docker setup
        └── docker-compose.yml
```

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, featured services, team preview, accreditation logos |
| `/about-us` | About The Rooms, history, royal visit, gallery |
| `/therapies` | All services archive (grid view) |
| `/service/[slug]` | Individual service page with details, therapists, booking info |
| `/meet-the-team` | All team members archive (grid view) |
| `/team/[slug]` | Individual team member profile with qualifications, fees, contact |
| `/contact-us` | Contact form and information |
| `/hire-therapy-room-dorchester` | Room rental information and options |

## 🎯 Features

### ✅ Fully Dynamic Content Management
- **Homepage Hero**: Editable from WordPress Admin → Settings → Homepage Settings
- **Accreditation Logos**: Add/remove/reorder from WordPress Admin → Accreditation Logos
- **Gallery Items**: Manage room photos from WordPress Admin → Gallery Items
- **Rental Options**: Edit rental options from WordPress Admin → Rental Options
- **Services**: All service content editable in WordPress
- **Team Members**: All therapist profiles editable in WordPress

### ✅ Image Optimization
- Automatic image optimization (WebP/AVIF conversion)
- Responsive image sizes
- Priority loading for above-the-fold images
- All images uploaded to WordPress Media Library

### ✅ Performance
- Next.js 14 with App Router
- Incremental Static Regeneration (ISR)
- Optimized caching (5 min dev, 1 min production)
- Modern image formats

## 🔧 Development

### First Time Setup
1. Run `GO.bat` - it does everything automatically
2. Wait for setup to complete
3. Visit http://localhost:3000

### Daily Development
1. Start WordPress: `cd wordpress-headless-example && docker-compose up -d`
2. Start Frontend: `cd wordpress-headless-example/frontend && npm run dev`
3. Visit http://localhost:3000

### Adding New Content

#### Add a New Therapist
1. WordPress Admin → Team → Add New
2. Fill in all fields in the organized meta boxes:
   - **Basic Information**: Position, Credentials, Years of Experience
   - **Therapy & Qualifications**: Type of Therapy, Qualifications, Registrations
   - **Contact & Pricing**: Email, Phone, Website, Fees Structure
   - **Bio & Specializations**: Specializations, About/Bio
3. Set Featured Image (therapist photo)
4. Link to Services (select which services they offer)
5. Publish

#### Add a New Service
1. WordPress Admin → Services → Add New
2. Fill in all fields:
   - **Service Details**: Tagline, About/Description
   - **Therapeutic Information**: Therapeutic Approaches, Conditions Treated, Services Offered
   - **Pricing & Booking**: Price Range, Duration, Booking Information
   - **Accreditation Note**: Optional note about accreditation
3. Link to Practitioners (select therapists who offer this service)
4. Set Featured Image (optional)
5. Publish

#### Add an Accreditation Logo
1. WordPress Admin → Accreditation Logos → Add New
2. Enter logo name as title
3. Set Featured Image (upload logo)
4. Add Alt Text in "Logo Details" meta box
5. Set Order number (0 = first, 1 = second, etc.)
6. Publish

#### Add a Gallery Item
1. WordPress Admin → Gallery Items → Add New
2. Enter title
3. Set Featured Image (upload photo)
4. Select Gallery Category:
   - "our-space" → Shows on About page
   - "therapy-rooms" → Shows on Hire Room page
5. Add Caption (optional)
6. Set Order number
7. Publish

## 📊 Content Import

### Importing from JSON Files
The `GO.bat` script automatically imports:
- **Services** from `new resources/therapies_by_service.json`
- **Therapists** from `new resources/therapists_directory.json`

### Manual Import (if needed)
```batch
docker cp import-new-resources.php wordpress_site:/var/www/html/
docker exec wordpress_site php /var/www/html/import-new-resources.php
```

## 🖼️ Media Management

### All Media in WordPress
All images are uploaded to WordPress Media Library for easy migration:
- Therapist headshots (20 images)
- Accreditation logos (11 images)
- Clinic photos (14+ images)
- Gallery items

### Adding New Therapist Photos
**Recommended Method (WordPress):**
1. WordPress Admin → Team → Edit therapist
2. Set Featured Image → Upload new photo
3. Save

**Alternative Method (Files):**
1. Add image to `new resources/` folder
2. Run `GO.bat` (it will copy and link automatically)

## 🐛 Troubleshooting

### WordPress Not Working
1. Check Docker is running
2. Run: `cd wordpress-headless-example && docker-compose up -d`
3. Wait 10 seconds for WordPress to start
4. Check: http://localhost:8080

### Frontend Not Loading
1. Check WordPress is running: http://localhost:8080
2. Check plugin is activated (WordPress Admin → Plugins)
3. Clear Next.js cache: Delete `wordpress-headless-example/frontend/.next`
4. Restart: `cd wordpress-headless-example/frontend && npm run dev`

### Content Not Showing
1. Check plugin is activated
2. Go to Settings → Permalinks → Save Changes
3. Run import again: `GO.bat` (or manually run import scripts)
4. Check browser console for errors

### Images Not Loading
1. Check images are in WordPress Media Library
2. Verify Featured Images are set for content
3. Check `wordpress-headless-example/frontend/public/resources/` for static fallbacks
4. Clear Next.js cache

### Duplicate Content
- The import script automatically removes duplicates
- If you see duplicates, check WordPress Admin and delete duplicate posts
- Clear Next.js cache and restart

## 🔐 Security

### Change Default WordPress Password
1. WordPress Admin → Users → Your Profile
2. Generate new password
3. Save

### Production Deployment
- Change all default passwords
- Use environment variables for sensitive data
- Enable HTTPS
- Set up proper backups
- Configure proper file permissions

## 📚 Technologies

- **WordPress**: Headless CMS (backend)
- **Next.js 14**: React framework with App Router (frontend)
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations
- **Docker**: WordPress containerization
- **PHP**: WordPress plugin and import scripts

## 🚢 Migration Guide

### Exporting WordPress
1. WordPress Admin → Tools → Export
2. Export All Content
3. Download export file

### Exporting Media
All media is in WordPress Media Library. To export:
1. WordPress Admin → Media
2. Download all media files
3. Or use a plugin like "All-in-One WP Migration"

### Importing to New WordPress
1. Install WordPress on new server
2. Install plugin: Copy `the-rooms-architecture.php` to `wp-content/plugins/`
3. Activate plugin
4. Import content: Tools → Import → WordPress
5. Upload media files
6. Run import scripts to link images

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check WordPress error logs
3. Verify all services are running
4. Review troubleshooting section above

## 📝 License

This project is proprietary software for The Rooms Poundbury.

---

**Last Updated**: December 2024
**Version**: 1.0.0
