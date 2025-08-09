## PR 1: Fix Windows editor integration using Bun spawn API

### Summary
This PR fixes editor integration issues on Windows by replacing Bun's shell API with the spawn API. The shell API was causing terminal editors like vim and edit.exe to fail with "handle invalid" errors, and it wasn't properly resolving Windows batch files like code.cmd for VS Code. The spawn API provides proper stdio inheritance for terminal editors and better command resolution on Windows.

### Related Tasks
No associated task.

> **📋 Important:** All PRs must have an associated task in the backlog.
> - If no task exists, create one first using: `backlog task create "Your task title"`
> - Follow the [task guidelines](../src/guidelines/agent-guidelines.md) when creating tasks
> - Tasks should be atomic, testable, and well-defined with clear acceptance criteria

### Task Checklist
- [ ] I have created a corresponding task in `backlog/tasks/`
- [ ] The task has clear acceptance criteria
- [ ] I have added an implementation plan to the task
- [ ] All acceptance criteria in the task are marked as completed

### Testing
Tested the changes locally on Windows with VS Code (using the code command) and Microsoft Edit (using the edit command). Both editors now open correctly, and file paths with spaces are handled properly. The implementation also includes an updated isEditorAvailable function that uses spawn for detection.

Sorry for not following the checklist and creating a task beforehand. These changes have only been tested on Windows, and you may want to close this PR if you prefer to create a proper task first, or take it over to test on macOS and Linux platforms as well.

---

## PR 2: Prioritize project config over environment variables for editor

### Summary
This PR changes the editor resolution priority so that project-specific configuration takes precedence over global environment variables. Previously, if you had EDITOR set globally, it would always override your project's defaultEditor setting. This made it impossible to use different editors for different projects. Now the priority is: project config first, then EDITOR environment variable, then platform default.

### Related Tasks
No associated task.

> **📋 Important:** All PRs must have an associated task in the backlog.
> - If no task exists, create one first using: `backlog task create "Your task title"`
> - Follow the [task guidelines](../src/guidelines/agent-guidelines.md) when creating tasks
> - Tasks should be atomic, testable, and well-defined with clear acceptance criteria

### Task Checklist
- [ ] I have created a corresponding task in `backlog/tasks/`
- [ ] The task has clear acceptance criteria
- [ ] I have added an implementation plan to the task
- [ ] All acceptance criteria in the task are marked as completed

### Testing
Updated the existing tests to reflect the new priority order and verified that the project's defaultEditor setting now correctly overrides the EDITOR environment variable. All editor utility tests pass with the new behavior.

Sorry for not following the checklist and creating a task beforehand. These changes have only been tested on Windows, and you may want to close this PR if you prefer to create a proper task first, or take it over to test on other platforms as well.

---

## PR 3: Skip all git operations when checkActiveBranches is false

### Summary
This PR optimizes performance for large git repositories by completely skipping git operations when checkActiveBranches is set to false. Previously, even with this setting disabled, the tool would still fetch remote branches and load remote tasks, which could take significant time on large repos. Now when checkActiveBranches is false, it only loads local and completed tasks, skipping all git fetch operations and remote branch listings entirely.

### Related Tasks
No associated task.

> **📋 Important:** All PRs must have an associated task in the backlog.
> - If no task exists, create one first using: `backlog task create "Your task title"`
> - Follow the [task guidelines](../src/guidelines/agent-guidelines.md) when creating tasks
> - Tasks should be atomic, testable, and well-defined with clear acceptance criteria

### Task Checklist
- [ ] I have created a corresponding task in `backlog/tasks/`
- [ ] The task has clear acceptance criteria
- [ ] I have added an implementation plan to the task
- [ ] All acceptance criteria in the task are marked as completed

### Testing
Built and tested the changes locally on a large repository. When checkActiveBranches is set to false, the board and task commands now load significantly faster as they skip all remote operations. The existing core tests continue to pass.

Sorry for not following the checklist and creating a task beforehand. These changes have only been tested on Windows, and you may want to close this PR if you prefer to create a proper task first, or take it over to test on other platforms as well.