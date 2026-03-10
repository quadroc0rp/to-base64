import { encode } from "js-base64";

/**
 * Encodes input (string or binary) to Base64 string.
 *
 * - For strings: uses js-base64 for UTF-8 safety
 * - For Uint8Array: uses Node.js Buffer for performance + correctness
 *
 * @param input - String text or binary Uint8Array data
 * @returns Base64-encoded string (ASCII-safe, no line breaks)
 */
export default function toBase64(input: string | Uint8Array): string {
	if (!input) {
		return "";
	}

	if (input instanceof Uint8Array) {
		if (typeof Buffer !== "undefined") {
			return Buffer.from(input).toString("base64");
		}

		let binary = "";
		for (let i = 0; i < input.byteLength; i++) {
			binary += String.fromCharCode(input[i]);
		}
		return encode(binary);
	}

	return encode(input);
}
