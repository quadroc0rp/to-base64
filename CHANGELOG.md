# Changelog

All notable changes to the **to-base64** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- _(Nothing yet — this section is for upcoming changes)_

### Changed

- _(Nothing yet)_

### Fixed

- _(Nothing yet)_

---

## [0.1.1] - 2026-03-10

### Removed

- Removed the keybindings due to the context issues

### Fixed

- `No files selected` issue when using the keybinding, for now the feature of using the keybinding `Ctrl+Alt+B` removed

---

## [0.1.0] - 2026-03-10

### Added

- ✅ Core Base64 encoding functionality for selected files
- ✅ Explorer context menu integration ("Encode to Base64")
- ✅ Multi-file selection support with batch processing
- ✅ Binary-safe encoding (images, executables, archives)
- ✅ Smart output naming: `filename.extension.base64` to prevent overwrites
- ✅ Progress notification
- ✅ Automatic folder filtering (only processes files)
- ✅ Comprehensive test suite:
  - Unit tests for `toBase64()` converter (ASCII, UTF-8, binary, edge cases)
  - Integration tests with fixture files (`hello.txt`, `emoji.txt`, `binary.bin`)
  - Filename generation tests
- ✅ Workspace-agnostic test utilities (no workspace required)
- ✅ Fixture auto-copy during build (`esbuild.js` hook)

### Security

- 🔐 All file operations respect VS Code workspace trust model
