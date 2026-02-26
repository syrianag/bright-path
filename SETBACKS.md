## Docker Images 

# Error: Failed to connect to the docker API 

# Solution: Install Docker Image 

In terminal I put (docker info) to see verfiy that I am using Linux 

Inserted this line of code below:
docker pull node:20-alpine

This is telling docker to pull and install the latest version of Node

------------------------------------------------------------------------------

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


