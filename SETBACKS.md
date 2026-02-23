## Docker Images 

# Error: Failed to connect to the docker API 

# Solution: Install Docker Image 

In terminal I put (docker info) to see verfiy that I am using Linux 

Inserted this line of code below:
docker pull node:20-alpine

This is telling docker to pull and install the latest version of Node

## Database and app connect via Docker Compose

# Error: My docker-compose.yml only defined the app service BUT did not include a database service. When adding a DB URL it needs to be present in both the .env file and schema.prisma. It was unfortunately only shown in the .env file. 

# Solution: Adding the database block to the schema.prisma file 



