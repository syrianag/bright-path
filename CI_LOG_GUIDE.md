# CI Log Reading Guide – Level 10 Skill

When a pipeline fails, GitHub shows a red ✗. Here’s how to find the exact problem:

## Step-by-step Log Reading
1. Open the failed workflow run in GitHub Actions.
2. Click the failed job and step to view the log.
3. **Scroll to the very top** of the failing step’s output. The root cause error often appears first.

## Common Failure Signatures
| Log Message                        | What it Means                                      |
|------------------------------------|----------------------------------------------------|
| Error: connect ECONNREFUSED        | App tried to connect to the DB before it was ready  |
| relation "X" does not exist         | Migrations didn’t run, or ran against wrong DB      |
| error Command "test" not found      | test script missing from package.json               |
| Permission denied (publickey)      | EC2_KEY secret is wrong or missing                  |
| npm ERR! code ELIFECYCLE           | A test failed — scroll up for the assertion         |

## Pro Tips
- Always scroll to the very top of a failing step’s output, not just the bottom.
- The root cause error often appears first, followed by cascading errors.

---

This file is automatically included in your repository for quick reference. Share it with your team and link it in your CI documentation for best results.
