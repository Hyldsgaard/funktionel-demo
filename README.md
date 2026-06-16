# Funktionel Tasks — AI Workflow Demo

A tiny **task-list web app** that doubles as a sandbox for demonstrating the modern
AI-assisted development workflow using **VS Code**, **Claude Code**, and **GitHub**.

🔗 **Live site:** https://hyldsgaard.github.io/funktionel-demo/

## The app

A vanilla HTML/CSS/JS task list — no build step, no dependencies. Add tasks, mark them
complete, filter them, and clear completed ones. State is saved to `localStorage`.

Open it locally:

```bash
open index.html
# or serve it:
python3 -m http.server 8000   # http://localhost:8000
```

Files:

- `index.html` — markup
- `styles.css` — styling (uses CSS custom properties for theming)
- `app.js` — task logic + persistence

## What this demo shows

- Using **Claude Code** as an AI pair programmer in VS Code
- The **issue → branch → PR → review → merge → ship** loop
- Letting Claude **solve GitHub issues** and **review pull requests**
- Working with **branches** and **git worktrees** for parallel work
- **CI checks** on PRs and **GitHub Pages** deployment

👉 See **[DEMO.md](DEMO.md)** for the step-by-step demo scripts, and the **Issues** tab for
ready-made tasks to work through.

## About

Built by [Funktionel AI](https://funktionel.ai) to demonstrate practical AI-assisted
software development for customers.
