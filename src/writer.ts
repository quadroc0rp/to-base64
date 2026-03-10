import path from "path";
import * as vscode from "vscode";

/**
 * Writes content to a file at the given URI.
 * Shows success/error notifications to the user.
 *
 * @param uri - Target file URI (must use file:// scheme)
 * @param content - String or Uint8Array to write
 * @throws Error if write fails (e.g., permissions, disk full)
 */
export async function createFile(
	uri: vscode.Uri,
	content: string | Uint8Array,
): Promise<void> {
	try {
		const data =
			typeof content === "string"
				? new TextEncoder().encode(content)
				: content;

		await vscode.workspace.fs.writeFile(uri, data);
		vscode.window
			.showInformationMessage(
				`✅ Saved: ${path.basename(uri.fsPath)}`,
				"Open File",
			)
			.then((selection) => {
				if (selection) {
					vscode.commands.executeCommand("vscode.open", uri);
				}
			});
	} catch (error: any) {
		vscode.window.showErrorMessage(
			`❌ Failed to write ${uri.fsPath}: ${error.message}`,
		);
		throw error;
	}
}

/**
 * Generates output filename: appends '.base64'.
 * Prevents accidental overwrites of source files.
 *
 * @example
 * getBase64OutputPath('/path/image.png') → '/path/image.png.base64'
 * getBase64OutputPath('C:\\docs\\README') → 'C:\\docs\\README.base64'
 *
 * @param originalPath - Absolute path to source file
 * @returns Absolute path for Base64 output file
 */
export function getBase64OutputPath(originalPath: string): string {
	const dir = path.dirname(originalPath);
	const basename = path.basename(originalPath);
	return path.join(dir, `${basename}.base64`);
}
