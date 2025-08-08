import { platform } from "node:os";
import { spawn } from "bun";
import type { BacklogConfig } from "../types/index.ts";

/**
 * Get the default editor based on the operating system
 */
function getPlatformDefaultEditor(): string {
	const os = platform();
	switch (os) {
		case "win32":
			return "notepad";
		case "darwin":
			// macOS typically has nano available
			return "nano";
		case "linux":
			return "nano";
		default:
			// Fallback to vi which is available on most unix systems
			return "vi";
	}
}

/**
 * Resolve the editor command based on configuration, environment, and platform defaults
 * Priority: EDITOR env var -> config.defaultEditor -> platform default
 */
export function resolveEditor(config?: BacklogConfig | null): string {
	// First check environment variable
	const editorEnv = process.env.EDITOR;
	if (editorEnv) {
		return editorEnv;
	}

	// Then check config
	if (config?.defaultEditor) {
		return config.defaultEditor;
	}

	// Finally use platform default
	return getPlatformDefaultEditor();
}

/**
 * Check if an editor command is available on the system
 */
export async function isEditorAvailable(editor: string): Promise<boolean> {
	try {
		// Parse the editor command to handle quoted paths
		const parts = splitCommand(editor);
		const command = parts[0]!;

		// Try to spawn the editor with a help flag to check if it exists
		// We use a non-existent file to avoid actually opening anything
		const proc = spawn([command, "--version"], {
			shell: platform() === "win32",
			stdio: ["ignore", "ignore", "ignore"],
		});

		try {
			const exitCode = await Promise.race([
				proc.exited,
				new Promise<number>((resolve) => setTimeout(() => resolve(1), 1000)),
			]);
			// Kill the process if it's still running
			proc.kill();
			// Most editors return 0 or 1 for --version, but some might not have this flag
			// We consider it available if it didn't throw an error during spawn
			return true;
		} catch {
			return false;
		}
	} catch {
		// If spawn throws, the command doesn't exist
		return false;
	}
}

/**
 * Parse a command line respecting quotes
 * e.g., "C:\Program Files\Editor.exe" --wait -> ["C:\Program Files\Editor.exe", "--wait"]
 */
function splitCommand(cmd: string): string[] {
	const re = /[^\s"]+|"([^"]*)"/g;
	const parts: string[] = [];
	cmd.replace(re, (m, q) => {
		parts.push(q ?? m);
		return "";
	});
	return parts;
}

/**
 * Open a file in the editor
 */
export async function openInEditor(filePath: string, config?: BacklogConfig | null): Promise<boolean> {
	const editor = resolveEditor(config);

	try {
		// Parse the editor command to handle quoted paths
		const parts = splitCommand(editor);
		const command = parts[0]!;
		const editorArgs = parts.slice(1);
		const args = [...editorArgs, filePath];

		// Use Bun.spawn with proper stdio inheritance
		const proc = spawn([command, ...args], {
			// On Windows, use shell to resolve .cmd/.bat files
			shell: platform() === "win32",
			// Critical for TUI editors to work properly
			stdio: ["inherit", "inherit", "inherit"],
		});

		const exitCode = await proc.exited;
		return exitCode === 0;
	} catch (error) {
		console.error(`Failed to open editor: ${error}`);
		return false;
	}
}
