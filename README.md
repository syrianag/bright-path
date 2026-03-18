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


---

## 🔐 Environment Variables: Usage & Best Practices

Environment variables are used throughout the BrightPath Tutoring application to securely and flexibly configure the app across all environments:

- **Application Code:**
	- The config/appConfig.js module reads variables like `PORT`, `NODE_ENV`, `DATABASE_URL`, and `MAX_ASSOCIATES` from the environment, making them available to all parts of the app.
	- This allows you to control app behavior (e.g., max associates) and environment-specific settings without code changes.

- **Prisma Database Configuration:**
	- Prisma uses the `DATABASE_URL` environment variable to connect to the correct database for development, testing, or production.
	- This variable is loaded from `.env`, Docker, or CI secrets, ensuring the database connection is always secure and appropriate for the environment.

- **Docker Containers:**
	- Docker Compose passes environment variables (like `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`) into containers using the `environment` or `env_file` fields.
	- This enables seamless configuration of both the app and database containers, and supports overrides for local, staging, or production setups.

- **CI Pipelines (GitHub Actions):**
	- The CI workflow injects secrets (e.g., `DATABASE_URL`, `EC2_HOST`, `EC2_SSH_KEY`) as environment variables, never hardcoding credentials in code or config files.
	- This ensures sensitive data is protected and the pipeline can run safely in any environment.

### Why Use Environment Variables?

- **Security:** Secrets and credentials are never stored in code. They are injected at runtime from secure sources (e.g., .env files, GitHub Secrets).
- **Portability:** The same codebase runs in development, CI, and production by simply changing environment variables—no code changes required.
- **Flexibility:** Easily switch databases, ports, or feature flags by updating environment variables, not code.
- **Best Practice:** This approach is recommended for all modern Node.js, Docker, and cloud-native applications.

See `.env.example` for required variables and reference the EVIDENCE.md for how environment variables are used in CI/CD and cloud deployment.

---


---

## 🚦 CI Pipeline Validation

This project uses a robust GitHub Actions CI/CD pipeline to ensure code quality, secure deployment, and compliance with Level 10 DevOps assessment requirements.

### How the Pipeline Works

- **Two jobs:**
	- `build-and-test`: Builds containers, runs migrations, tests, and lints the code.
	- `deploy`: Deploys to production **only if** `build-and-test` succeeds (uses `needs: build-and-test`).
- **Controlled job dependencies:**
	- The `deploy` job will **not run** if `build-and-test` fails, preventing broken code from being deployed.
- **Failure detection:**
	- If any step (e.g., tests or lint) fails, the pipeline stops and shows a red ❌ in the Actions tab.
	- You can expand each step in the Actions log to see which command failed and why.

### Secure Secrets Handling

- **No secrets in YAML:**
	- All sensitive data (e.g., `DATABASE_URL`, API keys) are injected using GitHub Secrets, never hardcoded in the workflow file.
	- Example: `${{ secrets.DATABASE_URL }}`
- **Why not store secrets in YAML?**
	- Secrets in YAML are visible to anyone with repo access and can be leaked in logs or PRs.
	- GitHub Secrets are encrypted, access-controlled, and injected at runtime only.
- **What happens if you echo a secret?**
	- GitHub automatically masks secrets in logs. If you try to `echo $DATABASE_URL`, the value will appear as `***` in the logs.

### What Happens When a Step Fails?

- The pipeline stops at the failed step, marks the job as failed (red X), and skips any dependent jobs (e.g., `deploy`).
- The Actions log shows exactly which step failed and the error output.

### How to Demonstrate Pipeline Failure and Success

1. **To demonstrate failure (red X):**
	 - Introduce a lint or test error (e.g., add a syntax error or failing test).
	 - Push to `main` or open a PR. The `build-and-test` job will fail, and `deploy` will be skipped.
	 - Take a screenshot of the failed workflow in the Actions tab.

2. **To demonstrate success (green check):**
	 - Fix all errors so tests and lint pass.
	 - Push again. The pipeline should complete successfully, and `deploy` will run (on `main`).
	 - Take a screenshot of the successful workflow.

---

### Assessment Q&A

**Q: Why should secrets not be stored directly in YAML?**
A: Secrets in YAML are visible to anyone with repo access and can be leaked in logs or PRs. GitHub Secrets are encrypted, access-controlled, and injected at runtime only, preventing accidental exposure.

**Q: What happens if you try to echo a GitHub secret?**
A: GitHub automatically masks secrets in logs. If you try to `echo $DATABASE_URL`, the value will appear as `***` in the logs.

**Q: Why does the deploy job not run if build-and-test fails?**
A: The `deploy` job uses `needs: build-and-test`, so it only runs if the previous job succeeds. This prevents broken code from being deployed.

**Q: How can you identify which step failed in the Actions log?**
A: In the Actions log, failed steps are marked with a red X and show error output. You can expand each step to see which command failed and why.

---

For more details, see `.github/workflows/ci.yml` and `EVIDENCE.md`.









