# The Rooms Poundbury - Headless WordPress Project

A premium, modern wellness clinic website built with **Next.js 14** (Frontend) and **Headless WordPress** (Backend).

## 🏗️ Architecture

This project uses a decoupled architecture:

*   **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
    *   *Role*: Handles the UI, routing, animations, and SEO.
    *   *Data Fetching*: Fetches content from WordPress via REST API using Incremental Static Regeneration (ISR) for high performance.
*   **Backend**: WordPress (Dockerized).
    *   *Role*: Content Management System (CMS).
    *   *Customization*: Uses a custom plugin (`the-rooms-architecture`) to define custom post types (Services, Team, Case Studies) and fields.

## 🚀 Quick Start

### Prerequisites
*   **Docker Desktop** (installed and running)
*   **Node.js** (v18 or higher)

### 1. Initial Setup
Run the setup script to initialize the environment:
```batch
cd d:\lucie
SETUP.bat
```

### 2. Start the Application
To start both the WordPress backend and Next.js frontend:
```batch
START.bat
```
*   **Frontend**: [http://localhost:3000](http://localhost:3000)
*   **Backend Admin**: [http://localhost:8080/wp-admin](http://localhost:8080/wp-admin)

### 3. Import Initial Content (Optional)
If the site is empty, run the import script to populate it with dummy data:
```batch
IMPORT.bat
```

## 🛠️ Development Workflow

### Frontend Development
The frontend code is located in the `frontend/` directory.
*   **Run Dev Server**:
    ```bash
    cd frontend
    npm run dev
    ```
*   **Build for Production**:
    ```bash
    cd frontend
    npm run build
    npm start
    ```
*   **Key Directories**:
    *   `src/app`: Page routes and layouts.
    *   `src/components`: Reusable UI components.
    *   `src/lib`: Utilities and API fetch functions.

### Backend Management
The backend is a standard WordPress instance running in Docker.
*   **Access Admin**: Go to [http://localhost:8080/wp-admin](http://localhost:8080/wp-admin).
*   **Manage Content**:
    *   **Services**: Add/Edit therapeutic services.
    *   **Team Members**: Manage therapist profiles.
    *   **Case Studies**: Add patient success stories.
*   **Plugin Development**:
    *   The custom plugin is located at `wordpress/plugins/the-rooms-architecture`.
    *   Edits to `the-rooms-architecture.php` are instantly reflected in the container (volume mounted).

## 📂 Project Structure

```
wordpress-headless-example/
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/             # App Router Pages
│   │   ├── components/      # UI Components
│   │   └── lib/             # API & Utilities
│   ├── public/              # Static Assets
│   └── ...
├── wordpress/                # WordPress Configuration
│   ├── plugins/             # Custom Plugins
│   └── docker-compose.yml   # Docker Orchestration
├── README.md                 # This Documentation
└── ...
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1.  Push the `frontend` folder to a Git repository.
2.  Connect to Vercel or Netlify.
3.  Set Environment Variables:
    *   `NEXT_PUBLIC_WORDPRESS_URL`: The URL of your live WordPress site (e.g., `https://api.your-site.com`).

### Backend (Hosting)
1.  Deploy WordPress to a hosting provider (DigitalOcean, WP Engine, etc.).
2.  Install the `the-rooms-architecture` plugin (zip the folder from `wordpress/plugins/` and upload).
3.  Ensure the REST API is accessible.

## 🐛 Troubleshooting

### "API Connection Failed"
*   Ensure Docker is running (`docker ps`).
*   Check if WordPress is accessible at `http://localhost:8080`.
*   Verify `NEXT_PUBLIC_WORDPRESS_URL` in `frontend/.env.local`.

### "Content Not Updating"
*   Next.js uses caching. Wait for the revalidation period (default 5 mins in dev) or restart the Next.js server.

### "Missing Content Types in Admin"
*   Ensure the "The Rooms Architecture" plugin is **Activated** in WordPress Plugins menu.
