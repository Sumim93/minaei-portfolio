# Sumim — website folder guide

This folder is everything for **sumim.art**. Copy the whole folder to another
computer and you can carry on from there.

## What's where

| Folder | What it is |
|---|---|
| **Originals/Paintings/** | Full-resolution photos of every painting, named by number and title (e.g. `11 - A Sudden Dread (2026).jpg`). **Your master copies — keep these safe.** |
| **Originals/Series Photos/** | Original photos used on the Series page. |
| **Originals/Studio - Now in the Works/** | Studio photos used in "In the studio" on the homepage. |
| **portfolio/** | The website itself. Whatever is in here goes live when it's pushed to GitHub. You don't need to touch it by hand. |
| `CLAUDE.md` | Notes for Claude about how the site is built, so it can pick up where we left off. |

The website keeps its **own** copies of the images (resized for fast loading)
inside `portfolio/`. Changing a file in `Originals/` doesn't change the site.
To add or replace a painting, ask Claude (see below).

## Moving to another computer

1. **Copy the whole `Painter_Portfolio` folder** (USB stick, external drive, or cloud).
   You can skip the folder `.claude\worktrees` inside it — those are temporary
   copies Claude made while working (about 1 GB) and aren't needed.
2. **Install on the new computer:**
   - Git for Windows — https://git-scm.com/download/win
   - GitHub CLI — https://cli.github.com
   - The Claude desktop app
3. **Sign in to GitHub** — open a terminal and run `gh auth login`, choose
   *GitHub.com* → *HTTPS* → *Login with a web browser*, and sign in as **Sumim93**.
   Then run `gh auth setup-git`.
4. **Open the copied `Painter_Portfolio` folder in Claude Code** and say something
   like "check everything is connected". Claude reads `CLAUDE.md` and knows the setup.

No copy of the folder to hand? The website part is always on GitHub
(`github.com/Sumim93/minaei-portfolio`) — but the **Originals** folder is only
on your computers, so keep a backup of it somewhere (external drive or cloud).

## Adding a new painting

1. Put the full-resolution photo in `Originals/Paintings/`, named
   `NN - Title (Year).jpg` (next number in the list).
2. Ask Claude: *"Add the new painting [title], [year], [size] cm"*.
   Claude makes the web-sized copies and the three brushwork close-ups, writes
   the note, and publishes it. The site updates about 30 seconds after.
