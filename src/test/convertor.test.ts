import * as assert from "assert";
import { suite, test } from "mocha";
import toBase64 from "../convertor";

suite("Convertor: toBase64()", () => {
	suite("String input", () => {
		test("ASCII text", () => {
			assert.strictEqual(toBase64("Hello World!"), "SGVsbG8gV29ybGQh");
		});

		test("UTF-8 emoji and CJK", () => {
			// 🚀 Hello 世界 → base64
			assert.strictEqual(
				toBase64("🚀 Hello 世界"),
				"8J+agCBIZWxsbyDkuJbnlYw=",
			);
		});

		test("Empty string", () => {
			assert.strictEqual(toBase64(""), "");
		});

		test("Special characters", () => {
			assert.strictEqual(
				toBase64("a!@#$%^&*()_+"),
				"YSFAIyQlXiYqKClfKw==",
			);
		});
	});

	suite("Uint8Array input", () => {
		test("ASCII bytes", () => {
			const input = new TextEncoder().encode("Hi");
			assert.strictEqual(toBase64(input), "SGk=");
		});

		test("Binary data (0x00-0xFF)", () => {
			const input = new Uint8Array([0x00, 0xff, 0xab, 0xcd]);
			assert.strictEqual(toBase64(input), "AP+rzQ==");
		});

		test("Empty array", () => {
			assert.strictEqual(toBase64(new Uint8Array([])), "");
		});

		test("Large binary chunk", () => {
			const input = new Uint8Array(1024).fill(0x42); // 1KB of 'B'
			const result = toBase64(input);
			assert.strictEqual(result.length, 1368); // ceil(1024 * 4/3)
			assert.ok(result.endsWith("Qg==")); // Ends with encoded 0x42
		});
	});

	suite("Edge cases", () => {
		test("Null/undefined input returns empty string", () => {
			assert.strictEqual(toBase64(null as any), "");
			assert.strictEqual(toBase64(undefined as any), "");
		});
	});
});
