## SIMULATING FAILURE POINTS

### 1. Introduce a Bug

Modify `docker-compose.yml` by renaming the database service while leaving the `DATABASE_URL` unchanged.

Original configuration:

```yaml
services:
  app:
    build: .
    environment:
      DATABASE_URL: "postgresql://user:pass@db:5432/myapp"

  db:
    image: postgres:15
```

Broken configuration:

```yaml
services:
  app:
    build: .
    environment:
      DATABASE_URL: "postgresql://user:pass@db:5432/myapp"

  database:
    image: postgres:15
```

### Why This Breaks

The application attempts to connect to `db:5432`, but Docker only creates a service named `database`. Because the hostname `db` no longer exists, the database connection fails.

---

### 2. Commit and Push the Broken Change

```bash
git add docker-compose.yml
git commit -m "test: simulate broken db connection"
git push origin main
```

Pushing this change triggers the GitHub Actions pipeline.

---

### 3. Observe the Pipeline Failure

Navigate to:

`GitHub → Repository → Actions`

The **build-and-test** workflow should fail (red ✗).

Example error from the logs:

```
Error: connect ECONNREFUSED db:5432
```

or

```
could not connect to server: Name or service not known
```

This confirms the pipeline correctly detects the misconfigured database connection.

---------------------------------------------------------------------

