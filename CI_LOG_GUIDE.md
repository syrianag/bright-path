# Reading CI Logs – The Level 10 Skill

When a pipeline fails, GitHub shows you a red ✗. Here is how to find the exact problem:

Follow these steps every time a pipeline fails — the answer is always in the log.

## Common failure signatures

| What you see in the log                | What it means                                             |
|----------------------------------------|----------------------------------------------------------|
| Error: connect ECONNREFUSED            | App tried to connect to the DB before it was ready        |
| relation "X" does not exist            | Migrations didn't run, or ran against the wrong database  |
| error Command "test" not found         | test script is missing from package.json                  |
| Permission denied (publickey)          | EC2_KEY secret is wrong or missing                       |
| npm ERR! code ELIFECYCLE               | A test failed — scroll up to see which assertion         |

**Pro Tip:** Always scroll to the very top of a failing step's output, not just the bottom. The root cause error often appears first, followed by cascading errors that are less useful.

---

> This file is automatically read by the team as a reference for troubleshooting CI failures. Keep it up to date with new error patterns and solutions as they are discovered.
