// src/test/utils.ts (workspace-agnostic version)
import * as fs from "fs/promises";
import * as path from "path";
import * as vscode from "vscode";

/**
 * Get absolute path to a fixture file.
 * Uses __dirname which points to out/test/ after compilation.
 */
export function getFixturePath(
	subpath: string,
	type: "input" | "expected",
): string {
	return path.join(__dirname, "fixtures", type, subpath);
}

/**
 * Read fixture file as Uint8Array using Node.js fs.
 * This bypasses VS Code API and works without a workspace.
 */
export async function readFixture(
	subpath: string,
	type: "input" | "expected",
): Promise<Uint8Array> {
	const filePath = getFixturePath(subpath, type);
	const buffer = await fs.readFile(filePath);
	return new Uint8Array(buffer);
}

/**
 * Create a temporary test file using OS temp directory.
 * Returns a vscode.Uri for use with VS Code APIs.
 */
export async function createTempFile(
	basename: string,
	content: Uint8Array,
): Promise<vscode.Uri> {
	const os = await import("os");
	const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "to-base64-test-"));
	const filePath = path.join(tempDir, basename);
	await fs.writeFile(filePath, content);
	return vscode.Uri.file(filePath);
}
