## Docker Images 

# Error: Failed to connect to the docker API 

# Solution: Install Docker Image 

In terminal I put (docker info) to see verfiy that I am using Linux 

Inserted this line of code below:
docker pull node:20-alpine

This is telling docker to pull and install the latest version of Node

---------------------------------------------------------------------------

## Database and app connect via Docker Compose

# Error: My docker-compose.yml only defined the app service BUT did not include a database service. When adding a DB URL it needs to be present in both the .env file and schema.prisma. It was unfortunately only shown in the .env file. 

# Solution: Adding the database block to the schema.prisma file 

-----------------------------------------------------------------------

## URL being shown in schema.prisma which resulted in docker compose up not running 

# Error: In my schema.prisma I had the Database URL listed not knowing that it is not allowed in that file and actually needs to go into my prisma.config.ts

# Solution: Delete from schema.prisma and add to prisma.config.ts

----------------------------------------------------------------------------

## Build was not added to package.json to create Next.js project

# Error: Add a build script to your package.json. If you are using a framework like Next.js, it should be something like "build": "next build". 

# Solution: Add these scripts to the packapge.json file
    "build": "next build",
    "dev": "next dev",
    "start": "next start"

-------------------------------------------------------------------------------------

## Issue: Postgres Container Fails to Start (Missing Password)

### Error Message

## Error: Database is uninitialized and superuser password is not specified.
## You must specify POSTGRES_PASSWORD to a non-empty value for the superuser.

## Solution: Updated YAML file 

---------------------------------------------------------------------------
## 🚨 CI Pipeline Failure (GitHub Actions)

### ❌ Error: CI Job `build-and-test` Failed With Exit Code 1

**Description**  
The GitHub Actions CI pipeline failed during the `build-and-test` job.  
The failure occurred because the pipeline attempted to run tests **before** required infrastructure (Docker Compose services and PostgreSQL) was available.  
Additionally, required environment variables such as `DATABASE_URL` and `POSTGRES_PASSWORD` were not defined in the CI environment.

This caused Prisma, tests, and Docker services to fail in the GitHub Actions runner, even though the application worked locally.

---

### ✅ Solution: Reorder CI Steps and Define Required Environment Variables

**Actions Taken**
- Reordered CI steps to start Docker services **before** running tests
- Added required environment variables directly to the CI pipeline
- Ensured PostgreSQL was fully ready before Prisma commands and tests ran
- Added Prisma client generation and database migrations to CI
- Improved log collection for easier debugging

**Result**  
The CI pipeline now:
- Starts infrastructure correctly
- Waits for the database to be available
- Runs Prisma and tests reliably
- Produces consistent, repeatable builds

This aligns the CI environment with production-like behavior and prevents false test failures.

---

### 💡 Key Takeaway
Local development environments hide missing assumptions (like `.env` files and running databases).  
CI pipelines must explicitly define **all dependencies, environment variables, and execution order** to ensure reliable automation. 

---------------------------------------------------------------------------------------------
## Prisma migrate deploy fails with missing datasource.url

### Error
Prisma reported that `datasource.url` was required even though `DATABASE_URL`
was set. This occurred because Prisma 7 requires an explicit
`migrate.datasourceUrl` in `prisma.config.ts` and does not read the URL
automatically.

### Solution
Updated `prisma.config.ts` to include a `migrate` block with
`datasourceUrl: process.env.DATABASE_URL`, removed the URL from
`schema.prisma`, and ensured only one datasource block existed.

----------------------------------------------------------------

## Simulating Failure 
Ran git revert HEAD to intentionally get rid of one change but instead got rid of all changes in that commit. 

## Solution: git checkout HEAD~1 -- docker-compose.yml 
This needs to be used when i only want to revert one file not all 

---------------------------------------------------------------------------------

What is appleboy?

// "appleboy/ssh-action is a GitHub Action that allows the CI pipeline to establish an SSH connection to a remote server, such as an AWS EC2 instance, so automated deployment commands can run remotely." 

-----------------------------------------------------------------------
## Build & Test failed in Github 
# Issue(s): 
1. Build Docker container ❌ (Dockerfile missing)
2. Load environment variables ❌ (.env missing)
3. Start containers

## Solution: Not resolved yet 
