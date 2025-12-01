# Parent Folder Cleanup Summary

## ✅ What Was Removed

1. **Duplicate `frontend/` folder** - Old version with outdated code
2. **Root `node_modules/`** - Should only be in project folder
3. **Root `package.json` & `package-lock.json`** - Not needed at root level
4. **`OPTIMIZATION_SUMMARY.md`** - Old documentation
5. **Duplicate resource files** from `new resources/` folder:
   - `therapies_by_service.md`
   - `therapies_by_service.json`
   - `therapists_directory.json`
   - `theroomspoundbury_therapists.md`

## ✅ What Was Updated

1. **`GO.bat`** - Now uses the new `run.bat` structure for starting frontend
2. **Documentation** - Created comparison docs

## 📁 Current Clean Structure

```
d:\lucie\
├── wordpress-headless-example/     ← MAIN PROJECT (use this!)
│   ├── frontend/                   ← Active frontend code
│   ├── wordpress/                  ← WordPress setup
│   ├── run.bat                     ← Daily dev script
│   ├── run-wordpress.bat           ← Full stack dev
│   └── build.bat                   ← Production build
│
├── GO.bat                          ← Full setup script (uses run.bat)
├── the-rooms-architecture.php      ← WordPress plugin
├── import-*.php                    ← Import scripts
├── upload-all-media-to-wordpress.php
├── link-images-to-content.php
│
├── new resources/                  ← Source data (only images now)
│   └── [therapist images].png
│
├── Documentation/
│   ├── README.md                   ← Main documentation
│   ├── CMS_GUIDE.md
│   ├── GITHUB_SETUP.md
│   ├── SEO_STRATEGY.md
│   └── TECHNICAL_DOCUMENTATION.md
│
└── Tools/
    ├── ngrok.exe
    ├── START-NGROK.bat
    ├── GET-NGROK-URL.bat
    └── PUSH-TO-GITHUB.bat
```

## 🎯 Key Points

1. **Only ONE frontend** - `wordpress-headless-example/frontend/` is the active one
2. **Only ONE wordpress** - `wordpress-headless-example/wordpress/` is the active one
3. **Parent folder** now only contains:
   - Setup/import scripts
   - Documentation
   - Tools (ngrok, etc.)
   - Source data files

## 🚀 How to Use

**Daily Development:**
```batch
cd wordpress-headless-example
run.bat
```

**Full Setup (First Time):**
```batch
GO.bat
```

**Production Build:**
```batch
cd wordpress-headless-example
build.bat
```

