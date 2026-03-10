import * as assert from "assert";
import { getBase64OutputPath } from "../writer";

suite("Filename Generation Tests", () => {
	test("Adds a .base64", () => {
		assert.strictEqual(
			getBase64OutputPath("/path/to/image.png"),
			"/path/to/image.png.base64",
		);
		assert.strictEqual(
			getBase64OutputPath("C:\\Users\\test\\script.js"),
			"C:\\Users\\test\\script.js.base64",
		);
		assert.strictEqual(
			getBase64OutputPath("/no/extension/README"),
			"/no/extension/README.base64",
		);
	});
});
