import path from "path";
import * as vscode from "vscode";
import { ExtensionConfig } from "./config";

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
		const dir = path.dirname(uri.fsPath);
		await vscode.workspace.fs.createDirectory(vscode.Uri.file(dir));

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
 * Generates an output file path based on the original file path and user configuration.
 * - If `outputFolder` is set, the output file will be placed there (absolute or relative to workspace).
 * - If `removeOriginalExtension` is true, the original file extension will be removed.
 * - The `filenameSuffix` will be appended to the output filename.
 *
 * @param originalPath - The original file path
 * @param config - User configuration for output path generation
 * @returns The generated output file path
 */
export function getOutputPath(
	originalPath: string,
	config: ExtensionConfig,
): string {
	const dir = path.dirname(originalPath);
	const basename = path.basename(originalPath, path.extname(originalPath));
	const ext = config.removeOriginalExtension
		? ""
		: path.extname(originalPath);

	let outputDir = dir;
	if (config.outputFolder) {
		if (path.isAbsolute(config.outputFolder)) {
			outputDir = config.outputFolder;
		} else {
			const workspaceFolder =
				vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
			if (workspaceFolder) {
				outputDir = path.join(workspaceFolder, config.outputFolder);
			}
		}
	}

	const suffix = config.filenameSuffix;
	const outputFilename = `${basename}${ext}${suffix}`;
	return path.join(outputDir, outputFilename);
}
