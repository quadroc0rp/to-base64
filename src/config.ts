import * as vscode from "vscode";

/**
 * Configuration options for the extension.
 *
 * @interface ExtensionConfig
 */
export interface ExtensionConfig {
	/**
	 * Whether to automatically copy the converted output to the clipboard.
	 * This disables the file-saving behavior, and the output will only be available in the clipboard.
	 * If false, the converted output will be saved to a file instead of the clipboard.
	 *
	 * @type {boolean}
	 */
	copyToClipboard: boolean;

	/**
	 * The directory path where converted files will be saved.
	 * Empty string is used to indicate the same directory as the source file.
	 *
	 * @type {string}
	 */
	outputFolder: string;

	/**
	 * The suffix to append to converted filenames.
	 * Default is ".base64", so "image.png" would become "image.png.base64".
	 *
	 * @type {string}
	 */
	filenameSuffix: string;

	/**
	 * Whether to remove the original file extension when generating the output filename.
	 * For example, with this enabled, "image.png" would become "image.base64" instead of "image.png.base64".
	 * Or if the suffix is empty, "image.png" would become "image" instead of "image.png".
	 *
	 * @type {boolean}
	 */
	removeOriginalExtension: boolean;
}

/**
 * Retrieves the current extension configuration from VS Code settings.
 *
 * @returns {ExtensionConfig} The extension configuration object with defaults
 */
export function getExtensionConfig(): ExtensionConfig {
	const config = vscode.workspace.getConfiguration("to-base64");
	return {
		copyToClipboard: config.get<boolean>("copyToClipboard", false),
		outputFolder: config.get<string>("outputFolder", ""),
		filenameSuffix: config.get<string>("filenameSuffix", ".base64"),
		removeOriginalExtension: config.get<boolean>(
			"removeOriginalExtension",
			false,
		),
	};
}

/**
 * Updates a configuration setting for the extension.
 *
 * @param {keyof ExtensionConfig} key - The configuration key to update
 * @param {boolean | string} value - The new value for the configuration
 * @param {vscode.ConfigurationTarget} target - The scope where the setting should be saved (default: Workspace)
 * @returns {Promise<void>}
 */
export async function updateExtensionConfig(
	key: keyof ExtensionConfig,
	value: boolean | string,
	target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Workspace,
): Promise<void> {
	const config = vscode.workspace.getConfiguration("to-base64");
	await config.update(key, value, target);
}

/**
 * Quick pick item interface that includes a configuration target.
 */
interface ScopeQuickPickItem extends vscode.QuickPickItem {
	target: vscode.ConfigurationTarget;
}

/**
 * Displays a quick pick menu for selecting where configuration changes should be saved.
 *
 * @returns {Promise<vscode.ConfigurationTarget | undefined>} The selected configuration target, or undefined if cancelled
 */
export async function showConfigTargetQuickPick(): Promise<
	vscode.ConfigurationTarget | undefined
> {
	const items: ScopeQuickPickItem[] = [
		{
			label: "$(folder) Workspace Settings",
			description: "Apply to current workspace only",
			target: vscode.ConfigurationTarget.Workspace,
		},
		{
			label: "$(gear) User Settings",
			description: "Apply globally (all workspaces)",
			target: vscode.ConfigurationTarget.Global,
		},
	];

	const selection = await vscode.window.showQuickPick(items, {
		placeHolder: "Where should this setting be saved?",
	});

	return selection?.target;
}
