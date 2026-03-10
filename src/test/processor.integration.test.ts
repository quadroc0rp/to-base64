import assert from "assert";
import * as vscode from "vscode";
import { ExtensionConfig, getExtensionConfig } from "../config";
import toBase64 from "../convertor";
import { getOutputPath } from "../writer";
import { createTempFile, readFixture } from "./utils";

suite("Processor Integration Tests", () => {
	function configInit(): ExtensionConfig {
		const config = getExtensionConfig();
		config.copyToClipboard = false;
		config.filenameSuffix = ".base64";
		config.outputFolder = "";
		config.removeOriginalExtension = false;
		return config;
	}

	suite("End-to-end: read → encode → write", () => {
		test("hello.txt → hello.txt.base64", async () => {
			const config = configInit();

			const inputBytes = await readFixture("hello.txt", "input");
			const expectedBase64 = new TextDecoder()
				.decode(await readFixture("hello.txt.base64", "expected"))
				.trim();
			const tempUri = await createTempFile("hello.txt", inputBytes);

			// Act
			const bytes = await vscode.workspace.fs.readFile(tempUri);
			const actualBase64 = toBase64(bytes);
			const outputPath = getOutputPath(tempUri.fsPath, config);
			const outputUri = vscode.Uri.file(outputPath);
			await vscode.workspace.fs.writeFile(
				outputUri,
				new TextEncoder().encode(actualBase64),
			);

			// Assert
			const writtenBytes = await vscode.workspace.fs.readFile(outputUri);
			const writtenContent = new TextDecoder()
				.decode(writtenBytes)
				.trim();
			assert.strictEqual(writtenContent, expectedBase64);
		});

		test("emoji.txt handles UTF-8 correctly", async () => {
			const config = configInit();

			const inputBytes = await readFixture("emoji.txt", "input");
			const expectedBase64 = new TextDecoder()
				.decode(await readFixture("emoji.txt.base64", "expected"))
				.trim();

			const actualBase64 = toBase64(inputBytes);
			assert.strictEqual(actualBase64, expectedBase64);
		});

		test("binary.bin preserves raw bytes", async () => {
			const config = configInit();

			const inputBytes = await readFixture("binary.bin", "input");
			const expectedBase64 = new TextDecoder()
				.decode(await readFixture("binary.bin.base64", "expected"))
				.trim();

			const actualBase64 = toBase64(inputBytes);
			assert.strictEqual(actualBase64, expectedBase64);
		});

		test("empty.txt produces empty base64", async () => {
			const config = configInit();

			const inputBytes = await readFixture("empty.txt", "input");
			const expectedBase64 = "";

			const actualBase64 = toBase64(inputBytes);
			assert.strictEqual(actualBase64, expectedBase64);
		});
	});

	suite("Filename generation", () => {
		test("Adds .base64", () => {
			const config = configInit();

			assert.strictEqual(
				getOutputPath("/project/src/app.ts", config),
				"/project/src/app.ts.base64",
			);
		});

		test("Handles files without extension", () => {
			const config = configInit();

			assert.strictEqual(
				getOutputPath("/project/README", config),
				"/project/README.base64",
			);
		});

		test("Preserves directory structure", () => {
			const config = configInit();

			const result = getOutputPath(
				"C:\\Users\\test\\docs\\report.pdf",
				config,
			);
			assert.ok(result.endsWith("report.pdf.base64"));
			assert.ok(result.includes("docs"));
		});
	});
});
