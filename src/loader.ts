import * as vscode from "vscode";

/**
 * Reads a binary file from the specified URI.
 *
 * @param uri - The URI of the file to read
 * @returns A Promise resolving to the binary data as a Uint8Array
 */
export async function readBinaryFile(uri: vscode.Uri): Promise<Uint8Array> {
	return await vscode.workspace.fs.readFile(uri);
}
