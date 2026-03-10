# Changelog

All notable changes to the **to-base64** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-03-11

### Added

- ✅ **Configuration System**: Workspace/User settings for extension behavior
- ✅ **Copy to Clipboard Mode**: Copy Base64 directly to clipboard instead of saving files (single file only)
- ✅ **Custom Output Folder**: Configure where encoded files are saved (`./base64/`, custom path, or same as source)
- ✅ **Custom Filename Suffix**: Change `.base64` to custom suffix or remove entirely
- ✅ **Remove Original Extension**: Toggle whether to keep original file extension in output filename
- ✅ **Configuration Commands**: Change configuration via Command Palette (`Ctrl+Shift+P`) or Settings:
  - `to-base64: Set Copy to Clipboard Mode`
  - `to-base64: Set Output Folder`
  - `to-base64: Set Filename Suffix`
  - `to-base64: Set Remove Original Extension`
- ✅ **Improved Testing**: Added unit tests for configuration system and commands

### Changed

- 🔧 Refactored `processor.ts` to accept configuration object for flexible output behavior
- 🔧 Updated `writer.ts` with `getOutputPath()` function for configurable filename generation
- 🔧 Enhanced `config.ts` with comprehensive JSDoc documentation
- 🔧 Added `commands.ts` for configuration command registration
- 🔧 Updated badge styling in README for better visual appeal

### Fixed

- 🐛 Fixed filename generation logic to properly handle `removeOriginalExtension` setting
- 🐛 Fixed test fixture path resolution for CI/headless environments
- 🐛 Fixed progress bar increment calculation for accurate percentage display

### Security

- 🔐 All configuration updates respect VS Code configuration scope (workspace vs global)
- 🔐 No external network calls; all processing is local

---

## [0.1.1] - 2026-03-10

### Removed

- ❌ Removed keyboard shortcut (`Ctrl+Alt+B`) due to activation context inconsistencies

### Fixed

- 🐛 Fixed "No files selected" issue when using keybinding (temporarily disabled feature)

---

## [0.1.0] - 2026-03-10

### Added

- ✅ Core Base64 encoding functionality for selected files
- ✅ Explorer context menu integration ("Encode to Base64")
- ✅ Multi-file selection support with batch processing
- ✅ Binary-safe encoding (images, executables, archives)
- ✅ Smart output naming: `filename.extension.base64` to prevent overwrites
- ✅ Progress notification with cancellation support
- ✅ Automatic folder filtering (only processes files)
- ✅ Comprehensive test suite:
  - Unit tests for `toBase64()` converter (ASCII, UTF-8, binary, edge cases)
  - Integration tests with fixture files (`hello.txt`, `emoji.txt`, `binary.bin`)
  - Filename generation tests
- ✅ Workspace-agnostic test utilities (no workspace required)
- ✅ Fixture auto-copy during build (`esbuild.js` hook)

### Security

- 🔐 All file operations respect VS Code workspace trust model
- 🔐 No external network calls; all processing is local
