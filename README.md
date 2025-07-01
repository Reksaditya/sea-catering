# SEA Catering Website

This is the frontend of **SEA Catering**, a meal subscription web application built using **Next.js**, **Tailwind CSS**, and **TypeScript**. The application allows users to subscribe to meal plans, customize their preferences, and manage their subscriptions.

## 🚀 Features

- 🌐 Public landing page with meal plan selection
- 👤 User authentication and profile management
- 📅 Meal subscription and plan customization
- 📦 Admin dashboard to manage subscriptions and metrics
- 💬 Toast notifications and modals for interaction
- 🔐 Token-based authentication using `localStorage`

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** React Hooks
- **API Communication:** Fetch + RESTful API
- **Auth:** JWT-based, stored in `localStorage`
- **Date Handling:** date-fns

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Reksaditya/sea-catering.git
cd sea-catering
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

Create a `.env.local` file in the root directory and set the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Adjust the URL based on your backend server.

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app in your browser.

## 📁 Folder Structure

```
/app                # App Router structure
/components         # Reusable UI components
/lib                # Utility functions (e.g., api.ts)
/pages              # Fallback pages
/public             # Images and static assets
/styles             # Global styles
```

## 🔐 Authentication

- JWT token is stored in `localStorage`
- Role-based access (`admin`, `user`) is handled on both client and server
- Protected routes redirect unauthorized users

## 🛠️ Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
```

## 👨🏻‍💻 Admin Access
To access admin dashboard, login to account below: <br>
Email : admin123@gmail.com <br>
Password : Admin#123

## 👤 Author
[Reksaditya](https://github.com/Reksaditya)

Copyright (c) 2025 Reksaditya
