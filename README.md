## BrightPath Tutoring

BrightPath Tutoring is a Next.js application with Prisma ORM for managing tutoring associates and users. The project uses PostgreSQL for data storage and supports Docker and CI workflows.

### Features
- Next.js frontend and API routes
- Prisma ORM with PostgreSQL
- Docker support
- GitHub Actions CI

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





