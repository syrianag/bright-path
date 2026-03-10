## All Graduation Requirement Evidence Will Be Here!!

# 1. Variables for DevOps + Prisma

- **DevOps (CI/CD) variables and secrets** are managed securely using **GitHub Secrets**. These are never hardcoded in the repository or workflow files. Instead, they are referenced in the GitHub Actions workflow (see `.github/workflows/ci.yml`) using syntax like `${{ secrets.DATABASE_URL }}`.
	- **Examples:**
		- `DATABASE_URL` (Prisma database connection string)
		- `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` (for deployment)

- **Prisma variables** (such as `DATABASE_URL`) are also required locally and in CI/CD. Locally, they are stored in the `.env` file (not committed to git). In CI/CD, they are injected from GitHub Secrets.
	- See `.env.example` for a template of required variables.

### Where can the instructor find them?

- **GitHub Secrets:**
	- Go to the repository on GitHub → Settings → Secrets and variables → Actions.
	- Here, you will see all secrets used by the CI/CD pipeline.

- **Workflow usage:**
	- Open `.github/workflows/ci.yml` to see how secrets are referenced and injected into jobs.

- **Local development:**
	- Developers use a `.env` file in the project root. The required variables are listed in `.env.example`.

**Summary:**
> All sensitive variables are managed securely via GitHub Secrets for CI/CD and via `.env` for local development. No secrets are stored in code or YAML files. See the workflow and `.env.example` for details.

