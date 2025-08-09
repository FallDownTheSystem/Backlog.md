<h1 align="center">Backlog.md (Custom Windows Build)</h1>
<p align="center">Markdown‑native Task Manager &amp; Kanban visualizer for any Git repository</p>
<p align="center"><em>Custom fork with Windows-specific fixes and improvements</em></p>

<p align="center">
<code>npm i -g @falldownthesystem/backlog.md</code>
</p>

> **Note**: This is a custom Windows-only build. For the original cross-platform version, use <code>npm i -g backlog.md</code>

![Backlog demo GIF using: backlog board](./.github/backlog.gif)


---

> **Backlog.md** turns any folder with a Git repo into a **self‑contained project board**  
> powered by plain Markdown files and a zero‑config CLI.


## Features

* 📝 **Markdown-native tasks** -- manage every issue as a plain `.md` file

* 🔒 **100 % private & offline** -- backlog lives entirely inside your repo

* 📊 **Instant terminal Kanban** -- `backlog board` paints a live board in your shell

* 📤 **Board export** -- `backlog board export` creates shareable markdown reports

* 🌐 **Modern web interface** -- `backlog browser` launches a sleek web UI for visual task management

* 🤖 **AI-ready CLI** -- "Claude, please take over task 33"

* 🔍 **Rich query commands** -- view, list, filter, or archive tasks with ease

* 💻 **Cross-platform** -- runs on macOS, Linux, and Windows

* 🆓 **MIT-licensed & open-source** -- free for personal or commercial use

---

## <img src="./.github/5-minute-tour-256.png" alt="5-minute tour" width="28" height="28" align="center"> Five‑minute tour
```bash
# 1. Make sure you have Backlog.md installed  
npm i -g @falldownthesystem/backlog.md  # Windows-only custom build
# or: npm i -g backlog.md  # Original cross-platform version

# 2. Bootstrap a repo + backlog  
backlog init "My Awesome Project"

# 3. Capture work  
backlog task create "Render markdown as kanban"

# 4. See where you stand  
backlog board view or backlog browser

# 5. Create tasks using Claude-code, Gemini, Codex or Jules
Claude I would like to build a search functionality in the web view that searches for:
* tasks
* docs
* decisions
  Please create relevant tasks to tackle this request.

# 6. Assign tasks to AI
Claude please implement all tasks related to the web search functionality (task-10, task-11, task-12)
* before starting to write code use 'ultrathink mode' to prepare an implementation plan
* use multiple sub-agents when possible and dependencies allow
```


All data is saved under `backlog` folder as human‑readable Markdown with the following format `task-<task-id> - <task-title>.md` (e.g. `task-10 - Add core search functionality.md`).

---

## <img src="./.github/web-interface-256.png" alt="Web Interface" width="28" height="28" align="center"> Web Interface

Launch a modern, responsive web interface for visual task management:

```bash
# Start the web server (opens browser automatically)
backlog browser

# Custom port
backlog browser --port 8080

# Don't open browser automatically
backlog browser --no-open
```

![Web Interface Screenshot](./.github/web.jpeg)

The web interface provides:
- **Interactive Kanban board** with drag-and-drop functionality
- **Task creation and editing** with rich forms and validation
- **Real-time updates** as you manage tasks
- **Responsive design** that works on desktop and mobile
- **Archive tasks** with confirmation dialogs
- **Seamless CLI integration** - changes sync with your markdown files

---

## <img src="./.github/cli-reference-256.png" alt="CLI Reference" width="28" height="28" align="center"> CLI reference

### Project Setup

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Initialize project | `backlog init [project-name]` (creates backlog structure with interactive configuration) |
| Re-initialize | `backlog init` (preserves existing config, allows updates) |

The `backlog init` command provides comprehensive project setup with interactive prompts for:
- **Project name** - identifier for your backlog
- **Auto-commit** - whether to automatically commit task changes to git
- **Default editor** - editor command for opening tasks (detects from environment)
- **Remote operations** - enable/disable fetching tasks from remote branches
- **Web UI settings** - port and browser auto-open preferences
- **Agent guidelines** - AI agent instruction files (CLAUDE.md, .cursorrules, etc.)
- **Claude Code agent** - optional Backlog.md agent for enhanced task management

When re-initializing an existing project, all current configuration values are preserved and pre-populated in prompts, allowing you to update only what you need.

### Task Management

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Create task | `backlog task create "Add OAuth System"`                    |
| Create with description | `backlog task create "Feature" -d "Add authentication system"` |
| Create with assignee | `backlog task create "Feature" -a @sara`           |
| Create with status | `backlog task create "Feature" -s "In Progress"`    |
| Create with labels | `backlog task create "Feature" -l auth,backend`     |
| Create with priority | `backlog task create "Feature" --priority high`     |
| Create with plan | `backlog task create "Feature" --plan "1. Research\n2. Implement"`     |
| Create with AC | `backlog task create "Feature" --ac "Must work,Must be tested"` |
| Create with notes | `backlog task create "Feature" --notes "Started initial research"` |
| Create with deps | `backlog task create "Feature" --dep task-1,task-2` |
| Create sub task | `backlog task create -p 14 "Add Login with Google"`|
| Create (all options) | `backlog task create "Feature" -d "Description" -a @sara -s "To Do" -l auth --priority high --ac "Must work" --notes "Initial setup done" --dep task-1 -p 14` |
| List tasks  | `backlog task list [-s <status>] [-a <assignee>] [-p <parent>]` |
| List by parent | `backlog task list --parent 42` or `backlog task list -p task-42` |
| View detail | `backlog task 7` (interactive UI, press 'E' to edit in editor) |
| View (AI mode) | `backlog task 7 --plain`                           |
| Edit        | `backlog task edit 7 -a @sara -l auth,backend`       |
| Add plan    | `backlog task edit 7 --plan "Implementation approach"`    |
| Add AC      | `backlog task edit 7 --ac "New criterion,Another one"`    |
| Add notes   | `backlog task edit 7 --notes "Completed X, working on Y"` |
| Add deps    | `backlog task edit 7 --dep task-1 --dep task-2`     |
| Archive     | `backlog task archive 7`                             |

### Draft Workflow

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Create draft | `backlog task create "Feature" --draft`             |
| Draft flow  | `backlog draft create "Spike GraphQL"` → `backlog draft promote 3.1` |
| Demote to draft| `backlog task demote <id>` |

### Board Operations

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Kanban board      | `backlog board` (interactive UI, press 'E' to edit in editor) |
| Export board | `backlog board export [file]` (exports Kanban board to markdown) |
| Export with version | `backlog board export --export-version "v1.0.0"` (includes version in export) |

### Statistics & Overview

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Project overview | `backlog overview` (interactive TUI showing project statistics) |

### Web Interface

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Web interface | `backlog browser` (launches web UI on port 6420) |
| Web custom port | `backlog browser --port 8080 --no-open` |

### Documentation

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Create doc | `backlog doc create "API Guidelines"` |
| Create with path | `backlog doc create "Setup Guide" -p guides/setup` |
| Create with type | `backlog doc create "Architecture" -t technical` |
| List docs | `backlog doc list` |
| View doc | `backlog doc view doc-1` |

### Decisions

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Create decision | `backlog decision create "Use PostgreSQL for primary database"` |
| Create with status | `backlog decision create "Migrate to TypeScript" -s proposed` |

### Agent Instructions

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Update agent files | `backlog agents --update-instructions` (updates .cursorrules, CLAUDE.md, AGENTS.md, GEMINI.md, .github/copilot-instructions.md) |

### Maintenance

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| Cleanup done tasks | `backlog cleanup` (move old completed tasks to completed folder) |

Full help: `backlog --help`

---

## <img src="./.github/configuration-256.png" alt="Configuration" width="28" height="28" align="center"> Configuration

Backlog.md merges the following layers (highest → lowest):

1. CLI flags
2. `backlog/config.yml` (per‑project)
3. `~/backlog/user` (per‑user)
4. Built‑ins

### Configuration Commands

| Action      | Example                                              |
|-------------|------------------------------------------------------|
| View all configs | `backlog config list` |
| Get specific config | `backlog config get defaultEditor` |
| Set config value | `backlog config set defaultEditor "code --wait"` |
| Enable auto-commit | `backlog config set autoCommit true` |
| Bypass git hooks | `backlog config set bypassGitHooks true` |
| Enable cross-branch check | `backlog config set checkActiveBranches true` |
| Set active branch days | `backlog config set activeBranchDays 30` |

### Available Configuration Options

| Key               | Purpose            | Default                       |
|-------------------|--------------------|-------------------------------|
| `defaultAssignee` | Pre‑fill assignee  | `[]`                          |
| `defaultStatus`   | First column       | `To Do`                       |
| `statuses`        | Board columns      | `[To Do, In Progress, Done]`  |
| `dateFormat`      | Date/time format   | `yyyy-mm-dd hh:mm`            |
| `timezonePreference` | Timezone for dates | `UTC`                     |
| `includeDatetimeInDates` | Add time to new dates | `true`              |
| `defaultEditor`   | Editor for 'E' key | Platform default (nano/notepad) |
| `defaultPort`     | Web UI port        | `6420`                        |
| `autoOpenBrowser` | Open browser automatically | `true`            |
| `remoteOperations`| Enable remote git operations | `true`           |
| `autoCommit`      | Automatically commit task changes | `false`       |
| `bypassGitHooks`  | Skip git hooks when committing (uses --no-verify) | `false`       |
| `zeroPaddedIds`   | Pad all IDs (tasks, docs, etc.) with leading zeros | `(disabled)`  |
| `checkActiveBranches` | Check task states across active branches for accuracy | `true` |
| `activeBranchDays` | How many days a branch is considered active | `30` |

> **Note**: Set `remoteOperations: false` to work offline. This disables git fetch operations and loads tasks from local branches only, useful when working without network connectivity.

> **Git Control**: By default, `autoCommit` is set to `false`, giving you full control over your git history. Task operations will modify files but won't automatically commit changes. Set `autoCommit: true` if you prefer automatic commits for each task operation.

> **Git Hooks**: If you have pre-commit hooks (like conventional commits or linters) that interfere with backlog.md's automated commits, set `bypassGitHooks: true` to skip them using the `--no-verify` flag.

> **Performance**: Cross-branch checking ensures accurate task tracking across all active branches but may impact performance on large repositories. You can disable it by setting `checkActiveBranches: false` for maximum speed, or adjust `activeBranchDays` to control how far back to look for branch activity (lower values = better performance).

> **Date/Time Support**: Backlog.md now supports datetime precision for all dates. New items automatically include time (YYYY-MM-DD HH:mm format in UTC), while existing date-only entries remain unchanged for backward compatibility. Use the migration script `bun src/scripts/migrate-dates.ts` to optionally add time to existing items.

---

## <img src="./.github/sharing-export-256.png" alt="Sharing & Export" width="28" height="28" align="center"> Sharing & Export

### Board Export

Export your Kanban board to a clean, shareable markdown file:

```bash
# Export to default Backlog.md file
backlog board export

# Export to custom file
backlog board export project-status.md

# Force overwrite existing file
backlog board export --force

# Export to README.md with board markers
backlog board export --readme

# Include a custom version string in the export
backlog board export --export-version "v1.2.3"
backlog board export --readme --export-version "Release 2024.12.1-beta"
```

Perfect for sharing project status, creating reports, or storing snapshots in version control.

---

<!-- BOARD_START -->

## 📊 Backlog.md Project Status (v1.7.2)

This board was automatically generated by [Backlog.md](https://backlog.md)

Generated on: 2025-08-06 20:33:41

| To Do | In Progress | Done |
| --- | --- | --- |
| **TASK-222** - Improve task and subtask visualization in web UI | └─ **TASK-24.1** - CLI: Kanban board milestone view [@codex] | **TASK-223** - Optimize statistics dashboard loading performance [@claude]<br>*#performance #web-ui #statistics* |
| **TASK-217** - Create web UI for sequences with drag-and-drop<br>*#sequences #web-ui #frontend* |  | **TASK-224** - Add non-interactive flags to init command for automation support [@claude]<br>*#cli #enhancement* |
| **TASK-216** - Add server API endpoints and web UI for sequences<br>*#sequences #api #backend #web-ui #frontend* |  | **TASK-181** - Add statistics dashboard to web UI |
| **TASK-215** - Implement TUI view for sequences<br>*#sequences #tui #ui* |  | **TASK-211** - Add version number display to browser UI<br>*#ui #frontend #enhancement* |
| **TASK-214** - Add CLI command to list sequences (plain text output)<br>*#sequences #cli* |  | **TASK-212** - Improve board export UI formatting and readability<br>*#formatting #dx #cli* |
| **TASK-213** - Compute sequences from task dependencies<br>*#sequences #core* |  | **TASK-206** - Order done column by updatedDate in board export<br>*#board #export #sorting* |
| **TASK-208** - Add paste-as-markdown support in Web UI<br>*#web-ui #enhancement #markdown* |  | **TASK-221** - Add favicon to web interface |
| **TASK-200** - Add Claude Code integration with workflow commands during init<br>*#enhancement #developer-experience* |  | **TASK-220** - Fix Helix editor integration with proper TUI suspension [@claude] |
|  |  | **TASK-175** - Add hour and minute to all dates in drafts, tasks, documents, decisions [@claude] |
|  |  | **TASK-219** - Refactor server component to fix separation of concerns violations<br>*#refactoring #architecture #server* |
|  |  | **TASK-210** - Refactor Nix packaging to build node_modules offline<br>*#nix #build #packaging* |

<!-- BOARD_END -->

---

## Building and Publishing (Custom Windows Build)

This custom fork includes Windows-specific fixes for:
- Editor spawning on corporate Windows environments
- TUI display issues in Windows Terminal
- Loading screen cleanup
- Git error suppression

### Prerequisites

- Windows OS
- Bun installed globally (`powershell -c "irm bun.sh/install.ps1 | iex"`)
- npm account with publish access

### Building

```bash
# Install dependencies
bun install

# Build the Windows binary with embedded version
bun build src/cli.ts --compile --minify --target=bun-windows-x64 --define __EMBEDDED_VERSION__='"1.7.2-custom.X"' --outfile=bin/backlog.exe

# Test the binary
./bin/backlog.exe --version
```

### Publishing to npm

1. Update the version in `package.json`
2. Rebuild the binary with the new version number (see above)
3. Ensure the wrapper script is at `bin/cli.cjs`
4. Publish:

```bash
npm publish --access public --tag latest
```

### Package Structure

```
bin/
├── cli.cjs      # Node.js wrapper script (CommonJS)
└── backlog.exe  # Compiled Windows binary (~120MB)
```

The wrapper script (`cli.cjs`) detects the platform and runs the Windows binary. Non-Windows users will get an error message directing them to the original package.

### Custom Fixes Included

- **Editor Spawning**: Multi-strategy spawning with fallbacks for corporate Windows environments
- **TUI Borders**: Fixed Unicode box-drawing characters for Windows Terminal
- **Loading Screen**: Proper cleanup using text widget instead of log widget
- **Git Errors**: Suppressed stderr output during branch operations

---

### License

Backlog.md is released under the **MIT License** – do anything, just give credit. See [LICENSE](LICENSE).
