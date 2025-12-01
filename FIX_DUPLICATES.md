# Fix WordPress Duplicates

## Problem
The import script was creating duplicate rental options because it wasn't properly checking for existing posts.

## Solution

### 1. Fixed Import Script
The `import-existing-content.php` script now properly checks for duplicates before creating new posts.

### 2. Cleanup Existing Duplicates

**Option A: Use WordPress Admin (Recommended)**
1. Go to WordPress Admin → Rental Options
2. You'll see a "Duplicate Status" column showing which posts are duplicates
3. Select the duplicate posts (checkboxes)
4. Choose "Remove Duplicates (Keep First)" from Bulk Actions dropdown
5. Click Apply

**Option B: Use Cleanup Script**
```batch
docker cp cleanup-duplicates.php wordpress_site:/var/www/html/cleanup-duplicates.php
docker exec wordpress_site php /var/www/html/cleanup-duplicates.php
```

### 3. Prevention
- The WordPress plugin now prevents creating new duplicates manually
- The import script now properly checks for duplicates
- `GO.bat` will automatically run cleanup after import

## What Was Fixed

1. **Import Script** (`import-existing-content.php`):
   - Added proper duplicate checking function
   - Uses direct database query for reliable duplicate detection
   - Prevents creating duplicates during import

2. **WordPress Plugin** (`the-rooms-architecture.php`):
   - Added duplicate prevention on save
   - Added duplicate detection column in admin
   - Added bulk cleanup action

3. **GO.bat**:
   - Now runs cleanup script after import
   - Automatically removes any duplicates created before the fix

## After Running GO.bat

The script will:
1. Import content (now with proper duplicate checking)
2. Automatically clean up any existing duplicates
3. Show you how many duplicates were removed

You should see:
```
[6.5/9] Cleaning up any duplicate rental options...
  ✓ Keeping: "1-1 Therapy" (ID: 123, created: 2025-11-30)
  ✗ Removing duplicate: "Small Workshops, Seminars & Supervision" (ID: 456, created: 2025-12-01)
=== Cleanup Complete ===
Total rental options checked: 4
Duplicates removed: 1
Unique rental options remaining: 3
```

## Verification

After cleanup, check WordPress Admin → Rental Options:
- Should only see 3 unique rental options
- No duplicates
- "Duplicate Status" column should show "✓ Unique" for all

