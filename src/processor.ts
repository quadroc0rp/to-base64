import * as vscode from "vscode";
import toBase64 from "./convertor";
import { readBinaryFile } from "./loader";
import { createFile, getBase64OutputPath } from "./writer";

/**
 * Encodes an array of file URIs to Base64 and saves output files.
 * Shows progress notification with cancellation support.
 *
 * @param fileUris - Array of VS Code URIs pointing to files to encode
 * @returns Promise that resolves when all files are processed (or cancelled)
 */
export async function processFilesToBase64(fileUris: vscode.Uri[]) {
	const progressOptions: vscode.ProgressOptions = {
		location: vscode.ProgressLocation.Notification,
		title: "Encoding files to base64",
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

					const outputPath = getBase64OutputPath(uri.fsPath);
					const outputUri = vscode.Uri.file(outputPath);

					await createFile(outputUri, base64Content);
				} catch (error: any) {
					vscode.window.showErrorMessage(
						`❌ Failed to process ${uri.fsPath.split("/").pop()}: ${error.message}`,
					);
					console.error(`Error processing ${uri.fsPath}:`, error);
				}
			}
		},
	);

	vscode.window.showInformationMessage(
		`✅ Completed: ${fileUris.length} file(s) encoded to base64`,
	);
}
