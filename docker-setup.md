# Docker + CI Setup Checklist

**Complete every item before beginning Docker + CI work.**

## Create Repository
- [ ] Create GitHub repo named `brightpath-tutoring`
- [ ] Clone repo locally
- [ ] Confirm you are inside project folder (`pwd`)

## Project Setup
- [ ] Run `npm init -y`
- [ ] Install dependencies:
  - [ ] dotenv
  - [ ] -D prisma@6
  - [ ] @prisma/client@6
- [ ] Run `npx prisma init`

## Set Up Database
- [ ] Choose ONE option:
  - **Neon (Recommended)**
    - [ ] Create Neon project
    - [ ] Copy connection string
    - [ ] Paste into `.env` as `DATABASE_URL`
  - **OR Local Postgres**
    - [ ] Install PostgreSQL
    - [ ] Create database named `brightpath`
    - [ ] Update `.env` with local connection string

## Configure Prisma
- [ ] Add `Associates` model to `schema.prisma`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Run `npx prisma generate`

## Create Nextjs Server
- [ ] Install Nextjs

## Commit Initial Working Version
- [ ] `git add .`
- [ ] `git commit -m "Initial BrightPath app"`
- [ ] `git push origin main`

## Create Feature Branch
- [ ] `git checkout -b feature/docker-setup`
- [ ] Push branch to GitHub

## Prepare Docker + CI Structure
- [ ] Create `Dockerfile`
- [ ] Create `docker-compose.yml`

## GitHub Actions
- [ ] Create `.github/workflows/ci.yml`
- [ ] Commit and push branch
