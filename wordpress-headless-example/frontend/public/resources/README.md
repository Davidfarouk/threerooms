# Optimized Resources Directory

This directory contains all optimized resources used by the website. This is the **source of truth** for all media files.

## Directory Structure

```
resources/
├── Therapist Headshots/     # All therapist profile images
├── Logos/                   # Accreditation and organization logos
├── *.jpg, *.png, *.jpeg     # Other images (clinic photos, etc.)
└── *.txt                    # Text files for services content
```

## Important Notes

1. **This is the optimized resources folder** - all images here should be optimized for web use
2. **GO.bat will use this directory** - it checks for existing optimized resources and uses them
3. **New therapist images** - When you add new therapist images to `new resources/`, run `copy-therapist-images.bat` or GO.bat will copy them automatically
4. **Do not delete this folder** - This contains all the optimized media files

## Adding New Therapist Images

1. Place the image file in `new resources/` folder with the therapist's name
2. Run `copy-therapist-images.bat` or run `GO.bat` (it will copy automatically)
3. Update `wordpress-headless-example/frontend/src/lib/teamHeadshots.ts` to map the new image

## File Naming Convention

- Therapist images: `[First Name] [Last Name].png` (e.g., "Aimee Overington.png")
- Store in: `Therapist Headshots/` subdirectory

