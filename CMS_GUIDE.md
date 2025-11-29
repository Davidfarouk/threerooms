# The Rooms Poundbury - Website Management Guide

**Welcome to your new website!**
This guide explains how to update text, images, and add new content to your website without needing to know any code.

---

## 🧠 How It Works (For Non-Techies)
You might be wondering: *"Where is all this information saved?"*

*   **The Backend (WordPress)**: This is your "Vault". All your text, **images, and media** are safely stored here.
*   **The Frontend (The Website)**: This is your "Display Window". It automatically talks to the Vault to fetch text and **display images directly from WordPress**.

**What this means for you:**
*   **Text & Content:** You change it in WordPress.
*   **Images & Photos:** You upload them to the **WordPress Media Library**. The website will automatically "see" them. You do **not** need to send photos to a developer.
*   **Exceptions:** The only images *not* in WordPress are permanent design elements (like the site logo or background patterns), which live in the code because they rarely change.

---

## 🔑 1. Logging In

1.  Go to your website address followed by `/wp-admin` (e.g., `yourwebsite.com/wp-admin`).
2.  Enter your **Username** and **Password**.
3.  You will see the **WordPress Dashboard**.

---

## 📝 2. Managing Content

### A. Editing Standard Pages (About, Contact, etc.)
1.  On the left menu, click **Pages**.
2.  Click on the page you want to edit (e.g., "About Us").
3.  **Title**: Change the page title at the very top.
4.  **Content**: Use the main text editor to change the paragraphs, headings, and lists.
5.  **Update**: Click the blue **Update** button on the right to save.
    *   *Note: Changes may take ~60 seconds to appear on the live site.*

### B. Managing Therapists (The Team)
Your website has a special section for your team members.

**To Add a New Therapist:**
1.  On the left menu, click **Team** -> **Add New**.
2.  **Name**: Enter their full name in the Title box.
3.  **Bio**: Write their biography in the main text box.
4.  **Photo**: On the right sidebar, look for **Featured Image**. Click "Set featured image" and upload their headshot.
    *   *Tip: Use a square or portrait image for best results.*
5.  **Details (Custom Fields)**: Scroll down to the "Team Member Details" section. Fill in:
    *   **Position**: e.g., "Senior Physiotherapist"
    *   **Credentials**: e.g., "BSc (Hons), MCSP"
    *   **Specializations**: Comma-separated list (e.g., "Back Pain, Sports Injury")
6.  Click **Publish**.

### C. Managing Services (Therapies)
**To Add a New Service:**
1.  On the left menu, click **Services** -> **Add New**.
2.  **Title**: Name of the therapy (e.g., "Acupuncture").
3.  **Description**: Detailed description in the main box.
4.  **Service Details**: Scroll down to fill in:
    *   **Tagline**: A short, catchy summary (appears on cards).
    *   **Price Range**: e.g., "£50 - £80".
    *   **Duration**: e.g., "45 - 60 mins".
5.  Click **Publish**.

---

## 🖼️ 3. Media & Images

### Where do they go?
There are two ways to handle images:

1.  **The "Media Library" (The Central Hub)**
    *   **Where is it?**: Look at the **black menu on the left** of your dashboard. Click on **Media**.
    *   **What is it?**: This is like the "Camera Roll" for your website. You can see every single image ever uploaded here.
    *   **How to use**: Click **Add New** to drag and drop photos from your computer.

2.  **"Featured Images" (For Specific Pages/People)**
    *   **Where is it?**: When you are editing a specific Therapist or Service, look at the **right-hand sidebar**.
    *   **What is it?**: This is the "Main Photo" for that specific person or page.
    *   **How to use**: Click the box that says **Set featured image**. You can then choose a photo you already uploaded to the Media Library.
*   **Best Practices**:
    *   **Size**: Try to keep images under 300KB. Large images slow down the site.
    *   **Dimensions**: For team photos, try to keep them consistent (e.g., all square).
    *   **Naming**: Name your files before uploading (e.g., `sarah-jones-physio.jpg` instead of `IMG_9921.jpg`). This helps Google find your site!

---

## ⚠️ 4. Important Notes

*   **"Headless" Delay**: Because your site is super-fast and secure, there is a tiny delay (about 1 minute) between when you click "Update" in WordPress and when you see it on the live website. This is normal!
*   **Don't Change Slugs**: The "URL Slug" (the web address part, like `/about-us`) connects the page to the design code. Try to avoid changing these unless necessary.
*   **Backups**: Your hosting provider usually handles this, but it's good practice to export your content (Tools -> Export) once a month.
