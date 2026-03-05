# BrightPath Tutoring

BrightPath Tutoring is a **containerized Next.js application** that uses **Prisma ORM** with **PostgreSQL** to manage tutoring associates and users.  
The project is designed with **Docker**, **GitHub Actions CI**, and cloud-ready workflows in mind.

---

## 🚀 Tech Stack

- **Frontend / API**: Next.js
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon for cloud, Postgres container for local)
- **Containerization**: Docker & Docker Compose
- **CI**: GitHub Actions
- **Runtime**: Node.js 20

---

## ✨ Features

- Next.js frontend with API routes
- Prisma ORM with relational models
- PostgreSQL database
- Dockerized development environment
- GitHub Actions CI pipeline
- Cloud-ready database configuration (Neon)

## 📂 Project Structure

├── app/ # Next.js app
├── prisma/
│ ├── schema.prisma # Prisma schema
│ ├── migrations/ # Database migrations
│ └── prisma.config.ts # Prisma v7 configuration
├── docker-compose.yml
├── Dockerfile
├── .github/workflows/ci.yml
├── .env.example
└── README.md

### Getting Started
1. Clone the repository:
	```
	git clone https://github.com/syrianag/brightpath-tutoring.git
	cd brightpath-tutoring
	```
2. Install dependencies:
	```
	npm install
	```
3. Set up environment variables:
	- Copy your database connection string to `.env` as `DATABASE_URL`.

4. Initialize Prisma:
	```
	npx prisma init
	npx prisma migrate dev --name init
	npx prisma generate
	```

### Running the App
To start the development server:
```
npm run dev
```

### Docker
Build and run with Docker Compose:
```
docker compose up --build
```

### CI/CD
GitHub Actions workflow is defined in `.github/workflows/ci.yml`.

### License
ISC

### Test Ran 

### SETBACKS / Failpoints 

### Evidence / Screenshots 

Command: docker compose ps — shows running containers and their status.


Command: docker compose down -v - 

Command: docker compose up -d - 








