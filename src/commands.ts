import * as vscode from "vscode";
import {
	getExtensionConfig,
	showConfigTargetQuickPick,
	updateExtensionConfig,
} from "./config";

/**
 * QuickPick item interface that includes a custom value property.
 * Extends VS Code's QuickPickItem to store configuration values.
 */
interface QuickPickItemWithValue extends vscode.QuickPickItem {
	/** The value to be stored in configuration when this item is selected */
	value: string;
}

/**
 * Registers all configuration-related commands for the to-base64 extension.
 *
 * Adds the following commands to the extension context:
 * - `to-base64.setCopyToClipboard`: Toggle clipboard mode on/off
 * - `to-base64.setRemoveOriginalExtension`: Toggle extension removal on/off
 * - `to-base64.setOutputFolder`: Configure custom output directory
 * - `to-base64.setFilenameSuffix`: Configure custom filename suffix
 *
 * Each command opens a QuickPick to select configuration scope (Workspace/User),
 * then updates the corresponding setting and optionally opens Settings UI.
 *
 * @param context - The VS Code extension context for managing subscriptions
 */
export function registerConfigurationCommands(
	context: vscode.ExtensionContext,
): void {
	/**
	 * Toggles the `copyToClipboard` configuration setting.
	 *
	 * When enabled: Base64 output is copied to clipboard instead of saved to file.
	 * When disabled: Base64 output is saved to a new file (default behavior).
	 *
	 * Flow:
	 * 1. Get current config value
	 * 2. Prompt user for configuration scope (Workspace/User)
	 * 3. Toggle the boolean value
	 * 4. Update configuration
	 * 5. Show confirmation with option to open Settings
	 *
	 * @returns {Promise<void>}
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"to-base64.setCopyToClipboard",
			async () => {
				const config = getExtensionConfig();
				const target = await showConfigTargetQuickPick();

				if (!target) {
					return;
				}

				const newValue = !config.copyToClipboard;
				await updateExtensionConfig(
					"copyToClipboard",
					newValue,
					target,
				);

				vscode.window
					.showInformationMessage(
						`Copy to Clipboard mode ${newValue ? "enabled" : "disabled"}`,
						"Open Settings",
					)
					.then((selection) => {
						if (selection) {
							vscode.commands.executeCommand(
								"workbench.action.openSettings",
								"to-base64.copyToClipboard",
							);
						}
					});
			},
		),
	);

	/**
	 * Toggles the `removeOriginalExtension` configuration setting.
	 *
	 * When enabled: Original file extension is removed before adding suffix.
	 * Example: `image.png` → `image.base64` (instead of `image.png.base64`)
	 *
	 * When disabled: Original extension is preserved.
	 * Example: `image.png` → `image.png.base64` (default behavior)
	 *
	 * Flow:
	 * 1. Get current config value
	 * 2. Prompt user for configuration scope (Workspace/User)
	 * 3. Toggle the boolean value
	 * 4. Update configuration
	 * 5. Show confirmation with option to open Settings
	 *
	 * @returns {Promise<void>}
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"to-base64.setRemoveOriginalExtension",
			async () => {
				const config = getExtensionConfig();
				const target = await showConfigTargetQuickPick();

				if (!target) {
					return;
				}

				const newValue = !config.removeOriginalExtension;
				await updateExtensionConfig(
					"removeOriginalExtension",
					newValue,
					target,
				);

				vscode.window
					.showInformationMessage(
						`Remove Original Extension mode ${newValue ? "enabled" : "disabled"}`,
						"Open Settings",
					)
					.then((selection) => {
						if (selection) {
							vscode.commands.executeCommand(
								"workbench.action.openSettings",
								"to-base64.removeOriginalExtension",
							);
						}
					});
			},
		),
	);

	/**
	 * Configures the `outputFolder` setting for encoded file output location.
	 *
	 * Provides three options via QuickPick:
	 * 1. "Same as Source" - Save next to original file (default, empty string)
	 * 2. "./base64/" - Save all encoded files in a dedicated folder
	 * 3. "Custom Path..." - Open input box for user-defined path
	 *
	 * Path validation:
	 * - Relative paths are resolved against workspace root
	 * - Absolute paths are used as-is
	 * - Custom paths are auto-appended with trailing slash if missing
	 *
	 * Flow:
	 * 1. Get current config value
	 * 2. Prompt user for configuration scope (Workspace/User)
	 * 3. Show QuickPick with predefined options + custom input
	 * 4. If custom: validate and normalize path (ensure trailing /)
	 * 5. Update configuration
	 * 6. Show confirmation with option to open Settings
	 *
	 * @returns {Promise<void>}
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"to-base64.setOutputFolder",
			async () => {
				const config = getExtensionConfig();
				const target = await showConfigTargetQuickPick();

				if (!target) {
					return;
				}

				const items: QuickPickItemWithValue[] = [
					{
						label: "$(folder) Same as Source",
						description: "Save encoded files next to originals",
						value: "",
					},
					{
						label: "$(folder-library) ./base64/",
						description:
							"Save all encoded files in ./base64/ folder",
						value: "./base64/",
					},
					{
						label: "$(pencil) Custom Path...",
						description: "Enter a custom output folder path",
						value: "custom",
					},
				];

				const selection = await vscode.window.showQuickPick(items, {
					placeHolder: "Select output folder for encoded files",
				});

				if (!selection) {
					return;
				}

				let newValue: string;
				if (selection.value === "custom") {
					const input = await vscode.window.showInputBox({
						prompt: "Enter custom output folder path",
						placeHolder: "e.g., ./output/base64 or ../encoded",
						value: config.outputFolder,
					});
					if (input === undefined) {
						return;
					} // Cancelled
					newValue = input.endsWith("/") ? input : input + "/";
				} else {
					newValue = selection.value as string;
				}

				await updateExtensionConfig("outputFolder", newValue, target);

				vscode.window
					.showInformationMessage(
						`Output folder set to: ${newValue || "(same as source)"}`,
						"Open Settings",
					)
					.then((selection) => {
						if (selection) {
							vscode.commands.executeCommand(
								"workbench.action.openSettings",
								"to-base64.outputFolder",
							);
						}
					});
			},
		),
	);

	/**
	 * Configures the `filenameSuffix` setting for encoded output filenames.
	 *
	 * Provides three options via QuickPick:
	 * 1. ".base64 (Default)" - Append `.base64` suffix (e.g., `file.txt.base64`)
	 * 2. "No Suffix" - No suffix added (e.g., `file.txt`)
	 * 3. "Custom Suffix..." - Open input box for user-defined suffix
	 *
	 * Custom suffix examples:
	 * - `.b64` → `file.txt.b64`
	 * - `.encoded` → `file.txt.encoded`
	 * - `-base64` → `file.txt-base64`
	 *
	 * Note: The suffix is appended after the original filename (+ extension if not removed).
	 *
	 * Flow:
	 * 1. Get current config value
	 * 2. Prompt user for configuration scope (Workspace/User)
	 * 3. Show QuickPick with predefined options + custom input
	 * 4. If custom: capture user input (no validation - user responsibility)
	 * 5. Update configuration
	 * 6. Show confirmation with option to open Settings
	 *
	 * @returns {Promise<void>}
	 */
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"to-base64.setFilenameSuffix",
			async () => {
				const config = getExtensionConfig();
				const target = await showConfigTargetQuickPick();

				if (!target) {
					return;
				}

				const items: QuickPickItemWithValue[] = [
					{
						label: "$(tag) .base64 (Default)",
						description: "filename.base64",
						value: ".base64",
					},
					{
						label: "$(tag) No Suffix",
						description: "filename (no extension)",
						value: "",
					},
					{
						label: "$(pencil) Custom Suffix...",
						description: "Enter a custom suffix",
						value: "custom",
					},
				];

				const selection = await vscode.window.showQuickPick(items, {
					placeHolder: "Select filename suffix for encoded files",
				});

				if (!selection) {
					return;
				}

				let newValue: string;
				if (selection.value === "custom") {
					const input = await vscode.window.showInputBox({
						prompt: "Enter custom filename suffix",
						placeHolder: "e.g., .b64, .encoded, -base64",
						value: config.filenameSuffix,
					});
					if (input === undefined) {
						return;
					} // Cancelled
					newValue = input;
				} else {
					newValue = selection.value as string;
				}

				await updateExtensionConfig("filenameSuffix", newValue, target);

				vscode.window
					.showInformationMessage(
						`Filename suffix set to: ${newValue || "(none)"}`,
						"Open Settings",
					)
					.then((selection) => {
						if (selection) {
							vscode.commands.executeCommand(
								"workbench.action.openSettings",
								"to-base64.filenameSuffix",
							);
						}
					});
			},
		),
	);
}
