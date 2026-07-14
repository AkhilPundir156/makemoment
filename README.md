Hello Welcome to Make My Moment.# Moment Recorder

**makemymoment** is a full-featured screen recording platform with a **CLI tool**, **browser extension**, and **web dashboard**.  
It allows users to record, upload, and share screen recordings seamlessly using a scalable backend and cloud storage.

---

## 📂 Project Structure

```
makemymoment/
├── apps/
│   ├── web/           # React.js frontend → Vercel
│   ├── server/        # API service → Render
│   ├── cli/           # CLI tool → npm package
│   └── extension/     # Browser extension → Chrome
├── packages/
│   ├── types/         # Shared TypeScript types
│   ├── ui/            # Shared UI components
│   └── tailwind-config/ # Shared Tailwind config & styles
├── turbo.json         # Turborepo pipeline configuration
└── package.json       # Root workspace package.json

```

Each folder contains its own `README.md` describing its purpose and usage.
Shared packages allow consistent types, UI components, and styles across all apps.

---

## 🚀 Features

- **CLI Tool:** Record, upload, and manage screen recordings from the terminal.
- **Browser Extension:** Record screens or tabs directly from the browser.
- **Web Dashboard:** Manage recordings, playback videos, and generate shareable links.
- **Server API:** Handles authentication, presigned S3 uploads, and metadata storage.
- **Cloud Storage:** AWS S3/Cloudflare R2 for storing recordings.

---

## ⚡ Quick Start

1. Clone the repo:

```bash
git clone https://github.com/AkhilPundir156/makemymoment.git
cd makemymoment
```

2. Install dependencies:

```bash
npm install
or
pnpm install
```

3. Start the development server:

```bash
npm run dev
```

4. Format code:

```bash
npm run format
```

5. Check linting:

```bash
npm run lint
```

6. Build the project:

```bash
npm run build
```

---

## 📌 Notes

Web App (apps/web) handles both the frontend dashboard and backend API routes, including authentication, presigned uploads, and database logging.

CLI and Browser Extension upload directly to S3; the web app orchestrates requests and stores metadata.

Each subfolder/package (cli, extension, packages/\*) is independently deployable.
