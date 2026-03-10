import * as vscode from "vscode";

export async function readBinaryFile(uri: vscode.Uri): Promise<Uint8Array> {
	return await vscode.workspace.fs.readFile(uri);
}
