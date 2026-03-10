import * as vscode from "vscode";
import { ExtensionConfig } from "./config";
import toBase64 from "./convertor";
import { readBinaryFile } from "./loader";
import { createFile, getOutputPath } from "./writer";

/**
 * Encodes an array of file URIs to Base64 and saves output files.
 * Shows progress notification with cancellation support.
 *
 * @param fileUris - Array of VS Code URIs pointing to files to encode
 * @returns Promise that resolves when all files are processed (or cancelled)
 */
export async function processFilesToBase64(
	fileUris: vscode.Uri[],
	config: ExtensionConfig,
) {
	const progressOptions: vscode.ProgressOptions = {
		location: vscode.ProgressLocation.Notification,
		title: config.copyToClipboard
			? "Encoding to Base64 and copying to clipboard..."
			: "Encoding to Base64 and saving files...",
		cancellable: true,
	};

	await vscode.window.withProgress(
		progressOptions,
		async (progress, token) => {
			const total = fileUris.length;
			let lastReported = 0;

			for (let i = 0; i < fileUris.length; i++) {
				if (token.isCancellationRequested) {
					vscode.window.showInformationMessage("Encoding cancelled");
					return;
				}

				const uri = fileUris[i];
				const completed = i + 1;

				const currentPercent = Math.round((completed / total) * 100);
				const increment = currentPercent - lastReported;

				try {
					progress.report({
						message: `${completed}/${total}: ${uri.fsPath.split("/").pop()}`,
						increment,
					});

					lastReported = currentPercent;

					const bytes = await readBinaryFile(uri);
					const base64Content = toBase64(bytes);

					if (config.copyToClipboard) {
						await vscode.env.clipboard.writeText(base64Content);
						vscode.window.showInformationMessage(
							`✅ Copied ${uri.fsPath.split("/").pop()} to clipboard as Base64`,
						);
					} else {
						const outputPath = getOutputPath(uri.fsPath, config);
						const outputUri = vscode.Uri.file(outputPath);
						await createFile(outputUri, base64Content);
					}
				} catch (error: any) {
					vscode.window.showErrorMessage(
						`❌ Failed to process ${uri.fsPath.split("/").pop()}: ${error.message}`,
					);
					console.error(`Error processing ${uri.fsPath}:`, error);
				}
			}
		},
	);

	if (!config.copyToClipboard) {
		vscode.window.showInformationMessage(
			`✅ Completed: ${fileUris.length} file(s) encoded to base64`,
		);
	}
}
