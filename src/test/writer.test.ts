import assert from "assert";
import { getExtensionConfig } from "../config";
import { getOutputPath } from "../writer";

suite("Filename Generation Tests", () => {
	test("Adds a .base64", () => {
		const config = getExtensionConfig();
		config.filenameSuffix = ".base64";
		config.removeOriginalExtension = false;

		assert.strictEqual(
			getOutputPath("/path/to/image.png", config),
			"/path/to/image.png.base64",
		);
		assert.strictEqual(
			getOutputPath("C:\\Users\\test\\script.js", config),
			"C:\\Users\\test\\script.js.base64",
		);
		assert.strictEqual(
			getOutputPath("/no/extension/README", config),
			"/no/extension/README.base64",
		);
	});

	test("Adds a custom suffix", () => {
		const config = getExtensionConfig();
		config.filenameSuffix = ".CustomSuffix";
		config.removeOriginalExtension = false;

		assert.strictEqual(
			getOutputPath("/path/to/image.png", config),
			"/path/to/image.png.CustomSuffix",
		);
		assert.strictEqual(
			getOutputPath("C:\\Users\\test\\script.js", config),
			"C:\\Users\\test\\script.js.CustomSuffix",
		);
		assert.strictEqual(
			getOutputPath("/no/extension/README", config),
			"/no/extension/README.CustomSuffix",
		);
	});

	test("No suffix added when filenameSuffix is empty", () => {
		const config = getExtensionConfig();
		config.filenameSuffix = "";
		config.removeOriginalExtension = false;

		assert.strictEqual(
			getOutputPath("/path/to/image.png", config),
			"/path/to/image.png",
		);
		assert.strictEqual(
			getOutputPath("C:\\Users\\test\\script.js", config),
			"C:\\Users\\test\\script.js",
		);
		assert.strictEqual(
			getOutputPath("/no/extension/README", config),
			"/no/extension/README",
		);
	});

	test("Removes original extension when removeOriginalExtension is true", () => {
		const config = getExtensionConfig();
		config.filenameSuffix = ".base64";
		config.removeOriginalExtension = true;

		assert.strictEqual(
			getOutputPath("/path/to/image.png", config),
			"/path/to/image.base64",
		);
		assert.strictEqual(
			getOutputPath("C:\\Users\\test\\script.js", config),
			"C:\\Users\\test\\script.base64",
		);
		assert.strictEqual(
			getOutputPath("/no/extension/README", config),
			"/no/extension/README.base64",
		);
	});
});
