# 🚀 Course Platform Monorepo

This is a full-stack **Monorepo** project built with **NestJS**, **GraphQL**, **Prisma**, and **PostgreSQL**, supporting user roles (`ADMIN`, `STUDENT`, `CREATOR`), authentication (email/password and Google OAuth), and learning features like courses, videos, podcasts, roadmaps, and more.

---

## 📁 Project Structure

apps/
└── api/ # Main backend application
packages/
└── prisma/ # Shared Prisma schema and migrations
└── common/ # Shared enums, guards, decorators, etc.

---

## 🛠 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (recommended)
- [PostgreSQL](https://www.postgresql.org/) (locally or hosted)
- [Docker](https://www.docker.com/) (optional for DB)

---

## ⚙️ Environment Configuration

Create a `.env` file inside `apps/api/`:

```env
# Database
DATABASE_URL=postgresql://<USER>:<PASSWORD>@localhost:5432/<DB_NAME>

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
GOOGLE_REDIRECT_URL=http://localhost:3000/auth/redirect
```

📁 Technologies Used
NestJS with GraphQL (code-first)

Prisma ORM

PostgreSQL

JWT + Google OAuth

Role-based Guards

Monorepo with NPM Workspaces
# Dashboard-Monorepo
# Dashboard-Monorepo
# Dashboard-Monorepo
# Dashboard-Monorepo
# Dashboard-Monorepo
