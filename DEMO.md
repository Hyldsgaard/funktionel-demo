# Demo Script

This repo is a sandbox for showing the modern AI-assisted development workflow with
**VS Code + Claude Code + GitHub**. The app itself (a tiny task list) is just an excuse —
the point is the *workflow* around it.

Below are repeatable demo flows. Pick whichever fits your audience.

---

## 0. The app

A vanilla HTML/CSS/JS task list — no build step. Open it two ways:

```bash
# Simplest: just open the file
open index.html

# Or serve it (nicer for live reload / matching the deployed version)
python3 -m http.server 8000   # then visit http://localhost:8000
```

Live version (GitHub Pages): **https://hyldsgaard.github.io/funktionel-demo/**

---

## 1. The core loop: issue → branch → PR → review → merge → ship

This is the headline demo.

1. **Pick an issue.** Open the repo's Issues tab — there are pre-seeded ones to choose from.
2. **Create a branch** for the work:
   ```bash
   git switch -c feature/dark-mode
   ```
3. **Let Claude Code do the work.** In the terminal or VS Code, ask:
   > "Solve issue #2 — add a dark-mode toggle."

   Claude reads the issue, edits the files, and explains what it changed.
4. **Review the diff** in VS Code's Source Control panel, then commit and push:
   ```bash
   git add -A && git commit -m "Add dark-mode toggle (closes #2)"
   git push -u origin feature/dark-mode
   ```
5. **Open a PR** (the PR template fills in automatically):
   ```bash
   gh pr create --fill
   ```
6. **Watch CI run.** The `CI` check validates JS syntax and HTML on every PR.
7. **Have Claude review the PR:**
   > "Review this PR for correctness and simplicity."
8. **Merge**, then refresh the GitHub Pages URL — the change is live.

---

## 2. Branches

Show why branches keep `main` safe:

```bash
git switch -c feature/edit-tasks   # start work
# ...make changes...
git switch main                    # main is untouched
git switch feature/edit-tasks      # back to your work
```

---

## 3. Git worktrees — parallel work without stashing

Worktrees let you check out multiple branches at once, each in its own folder. Great for
working on two issues simultaneously, or reviewing a PR while keeping your own work open.

```bash
# Create a second working copy on a new branch, in a sibling folder
git worktree add ../funktionel-demo-darkmode -b feature/dark-mode

# Now you have two folders, two branches, zero stashing:
#   funktionel-demo            -> main (or whatever you had)
#   funktionel-demo-darkmode   -> feature/dark-mode

# Open the new one in a fresh VS Code window and run Claude there in parallel
code ../funktionel-demo-darkmode

# See all worktrees
git worktree list

# When done, remove it (and delete the branch if merged)
git worktree remove ../funktionel-demo-darkmode
```

Demo idea: run **two Claude Code sessions** in two worktrees, each solving a different
issue at the same time.

---

## 4. Letting Claude solve a GitHub issue end-to-end

From a checkout, just point Claude at an issue number:

> "Have a look at issue #1 and fix it. Open a PR when you're done."

Claude can read the issue with `gh issue view`, make the change, push a branch, and open a PR.

---

## 5. Letting Claude review a pull request

> "Review PR #7 — flag any bugs and suggest simplifications."

Claude can fetch the diff with `gh pr diff`, review it, and (optionally) post inline comments.

---

## Reset between demos

To re-run a demo cleanly:

```bash
git switch main && git pull
git branch -D feature/dark-mode 2>/dev/null   # delete local demo branch
```

Re-open or re-create issues as needed from the Issues tab.
