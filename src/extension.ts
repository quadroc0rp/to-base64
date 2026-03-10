import * as vscode from "vscode";
import { processFilesToBase64 } from "./processor";

/**
 * Activates the to-base64 extension.
 * Registers the 'to-base64.encode' command that encodes selected files to Base64.
 *
 * @param context - The extension context for subscriptions and state
 */
export function activate(context: vscode.ExtensionContext) {
	/**
	 * Command handler for 'to-base64.encode'.
	 * Handles single/multi-selection, filters to files only, and launches encoding.
	 *
	 * @param uri - Primary selected URI (last clicked in multi-select)
	 * @param uris - Array of all selected URIs (undefined for single-select)
	 */
	const disposable = vscode.commands.registerCommand(
		"to-base64.encode",
		async (uri: vscode.Uri, uris: vscode.Uri[]) => {
			const selectedUris = uris && uris.length > 0 ? uris : [uri];

			const validUris = selectedUris.filter(
				(u): u is vscode.Uri => u !== undefined,
			);

			if (validUris.length === 0) {
				vscode.window.showWarningMessage("No files selected");
				return;
			}

			const fileUris: vscode.Uri[] = [];
			for (const u of selectedUris) {
				try {
					const stat = await vscode.workspace.fs.stat(u);
					if (stat.type === vscode.FileType.File) {
						fileUris.push(u);
					}
				} catch {
					fileUris.push(u);
				}
			}

			if (fileUris.length === 0) {
				vscode.window.showWarningMessage(
					"Please select at least one file",
				);
				return;
			}

			if (fileUris.length > 10) {
				const confirm = await vscode.window.showWarningMessage(
					`Encode ${fileUris.length} files to base64?`,
					{ modal: true },
					"Yes",
					"Cancel",
				);
				if (confirm !== "Yes") {
					return;
				}
			}

			await processFilesToBase64(fileUris);
		},
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
