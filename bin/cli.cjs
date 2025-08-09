#!/usr/bin/env node

const { spawn } = require("node:child_process");
const path = require("node:path");

// Only supports Windows for now
if (process.platform !== "win32") {
	console.error("This package currently only supports Windows. Please install bun and use the original backlog.md package.");
	process.exit(1);
}

const binaryPath = path.join(__dirname, "backlog.exe");

// Spawn the binary with all arguments
const child = spawn(binaryPath, process.argv.slice(2), {
	stdio: "inherit",
	windowsHide: true,
});

// Handle exit
child.on("exit", (code) => {
	process.exit(code || 0);
});

// Handle errors
child.on("error", (err) => {
	if (err.code === "ENOENT") {
		console.error(`Binary not found: ${binaryPath}`);
	} else {
		console.error("Failed to start backlog:", err);
	}
	process.exit(1);
});