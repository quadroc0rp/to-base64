const esbuild = require("esbuild");
const { existsSync, mkdirSync, copyFileSync, readdirSync } = require("fs");
const path = require("path");

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

/**
 * Copy fixtures from src/test/fixtures to out/test/fixtures
 */
function copyFixtures() {
	const src = path.join(__dirname, "src", "test", "fixtures");
	const dest = path.join(__dirname, "out", "test", "fixtures");

	if (!existsSync(src)) {
		console.warn("⚠️  No fixtures directory found at", src);
		return;
	}

	// Ensure dest directory exists
	mkdirSync(dest, { recursive: true });

	// Copy input/ and expected/ subdirectories
	for (const subdir of ["input", "expected"]) {
		const srcSubdir = path.join(src, subdir);
		const destSubdir = path.join(dest, subdir);

		if (existsSync(srcSubdir)) {
			mkdirSync(destSubdir, { recursive: true });
			for (const file of readdirSync(srcSubdir)) {
				const srcFile = path.join(srcSubdir, file);
				const destFile = path.join(destSubdir, file);
				copyFileSync(srcFile, destFile);
				console.log(`📋 Copied: ${subdir}/${file}`);
			}
		}
	}
}

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: "esbuild-problem-matcher",

	setup(build) {
		if (!watch || production) {
			copyFixtures();
		}
		build.onStart(() => {
			console.log("[watch] build started");
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(
					`    ${location.file}:${location.line}:${location.column}:`,
				);
			});
			console.log("[watch] build finished");
		});
	},
};

async function main() {
	const ctx = await esbuild.context({
		entryPoints: ["src/extension.ts"],
		bundle: true,
		format: "cjs",
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: "node",
		outfile: "dist/extension.js",
		external: ["vscode"],
		logLevel: "silent",
		plugins: [
			/* add to the end of plugins array */
			esbuildProblemMatcherPlugin,
		],
	});
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		await ctx.dispose();
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
