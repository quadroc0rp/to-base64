<p align="center">
  <img src="./docs/icons/icon-256.png" alt="to-base64 Logo" width="256" height="256" />
</p>

<p align="center">
  <a href="https://img.shields.io/badge/version-0.2.0-007ACC?logo=visualstudiocode&logoColor=white&labelColor=005A9C">
    <img src="https://img.shields.io/badge/version-0.2.0-007ACC?logo=visualstudiocode&logoColor=white&labelColor=005A9C" alt="Version" />
  </a>
  <a href="https://img.shields.io/badge/License-MIT-4CAF50?logo=opensourceinitiative&logoColor=white&labelColor=2E7D32">
    <img src="https://img.shields.io/badge/License-MIT-4CAF50?logo=opensourceinitiative&logoColor=white&labelColor=2E7D32" alt="License" />
  </a>
  <a href="https://img.shields.io/badge/VS%20Code-%5E1.109.0-007ACC?logo=visualstudiocode&logoColor=white&labelColor=005A9C">
    <img src="https://img.shields.io/badge/VS%20Code-%5E1.109.0-007ACC?logo=visualstudiocode&logoColor=white&labelColor=005A9C" alt="VS Code" />
  </a>
  <a href="https://img.shields.io/badge/Type-VS%20Code%20Extension-9C27B0?logo=visualstudiocode&logoColor=white&labelColor=6A1B9A">
    <img src="https://img.shields.io/badge/Type-VS%20Code%20Extension-9C27B0?logo=visualstudiocode&logoColor=white&labelColor=6A1B9A" alt="Type" />
  </a>
</p>
<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=quadroc0rp.to-base64">
  <img src="https://img.shields.io/badge/Install-Marketplace-FFCA28?logo=visualstudiocode&logoColor=white&labelColor=FFA000" alt="Install   from VS Code Marketplace" />
  </a>
  <a href="vscode:extension/quadroc0rp.to-base64">
  <img src="https://img.shields.io/badge/Open-VS%20Code-EC407A?logo=visualstudiocode&logoColor=white&labelColor=C2185B" alt="Open in VS Code" />
</a>
</p>

---

**to-base64** is a lightweight VS Code extension that encodes selected files to Base64 directly from the Explorer window. Perfect for embedding assets in code, preparing data for APIs, or creating portable text representations of binary files — all without leaving your editor.

---

## ✨ Features

### 🔧 Core Features (v0.1.0)

| Feature                     | Description                                                              |
| --------------------------- | ------------------------------------------------------------------------ |
| 🖱️ **Explorer Integration** | Right-click any file(s) → **"Encode to Base64"**                         |
| 📁 **Multi-File Support**   | Select multiple files with `Ctrl`/`Cmd` and encode them in batch         |
| 🔐 **Binary-Safe**          | Handles images, executables, archives, and any file type correctly       |
| 🏷️ **Smart Naming**         | Output files use `filename.extension.base64` pattern to avoid overwrites |
| 📊 **Progress Feedback**    | Real-time notification progress bar with cancellation support            |
| 🚫 **Skip Folders**         | Automatically filters out directories — only processes files             |

### ⚙️ Configuration Features (v0.2.0)

| Feature                          | Description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| 📋 **Copy to Clipboard Mode**    | Copy Base64 directly to clipboard instead of saving files (single file only)          |
| 📁 **Custom Output Folder**      | Configure where encoded files are saved (`./base64/`, custom path, or same as source) |
| 🏷️ **Custom Filename Suffix**    | Change `.base64` to custom suffix or remove entirely                                  |
| ✂️ **Remove Original Extension** | Toggle whether to keep original file extension in output filename                     |

---

## 🚀 Quick Start

### Installation

```bash
# Via VS Code Marketplace (Coming Soon)
# Search for "to-base64" in Extensions (Ctrl+Shift+X)

# Or manual installation:
code --install-extension ./to-base64-0.2.0.vsix
```

### Basic Usage

1. Select file(s) in Explorer
2. Right-click → **"Encode to Base64"**
3. Find `*.base64` files in same directory

### Configuration Commands

Access via Command Palette (`Ctrl+Shift+P`):

- `to-base64: Set Copy to Clipboard Mode` — Toggle clipboard mode
- `to-base64: Set Output Folder` — Configure output directory
- `to-base64: Set Filename Suffix` — Change filename suffix
- `to-base64: Set Remove Original Extension` — Toggle extension removal

---

## 📦 Output Format

### Default Output

Each encoded file contains a plain-text Base64 string (RFC 4648, no line breaks):

```base64
iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==
```

### Filename Examples

| Original File | Output File (default) | Output File (custom suffix) |
| ------------- | --------------------- | --------------------------- |
| `logo.png`    | `logo.png.base64`     | `logo.png.b64`              |
| `config.json` | `config.json.base64`  | `config.json.encoded`       |
| `README`      | `README.base64`       | `README.custom`             |
| `archive.zip` | `archive.zip.base64`  | `archive.zip.b64`           |

> 💡 **Tip**: The `.base64` suffix + optional extension removal ensures original files are never overwritten.

---

## 🗺️ Roadmap

### ✅ Completed Features

| Feature                   | Version | Description                                         |
| ------------------------- | ------- | --------------------------------------------------- |
| Core Encoding             | v0.1.0  | Base64 encode files from Explorer                   |
| Multi-File Support        | v0.1.0  | Batch process selected files                        |
| Binary File Handling      | v0.1.0  | Safe encoding of images, archives, etc.             |
| Progress Notifications    | v0.1.0  | Visual feedback with cancellation support           |
| Smart Filename Generation | v0.1.0  | `file.extension.base64` pattern prevents overwrites |
| Test Coverage             | v0.1.0  | Unit + integration tests with fixtures              |
| Configuration System      | v0.2.0  | Workspace/User settings for output behavior         |
| Clipboard Mode            | v0.2.0  | Copy Base64 to clipboard instead of saving          |
| Custom Output Folder      | v0.2.0  | Configure where encoded files are saved             |
| Custom Filename Suffix    | v0.2.0  | Change `.base64` to custom pattern                  |
| Remove Original Extension | v0.2.0  | Toggle whether to keep original file extension      |

### 🚀 Planned Features (v0.3.0)

| Feature                           | Priority  | Description                                                                                        |
| --------------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| 🌐 **Data URI Scheme Generation** | 🔥 High   | Automatically prepend MIME types (e.g., `image/png;base64,...`) for direct use in HTML/CSS         |
| 🎨 **Language-Specific Wrappers** | 🔥 High   | Wrap output in ready-to-use syntax: CSS `url('...')`, JS `const name = "..."`, JSON `"key": "..."` |
| 🔤 **Auto Variable Naming**       | 🔥 High   | Generate valid variable names from filenames (e.g., `logo.png` → `const logoPng = "..."`)          |
| 🔓 **Decode Base64 to File**      | 🔥 High   | Select Base64 string in editor → Right-click → "Decode to File" (restores original binary)         |
| ⚡ **Status Bar Quick Toggle**    | 🟡 Medium | Click status bar item to quickly switch between "Save File" and "Copy Clipboard" modes             |

### 📋 Future Considerations (v0.4.0+)

| Feature                              | Category                | Description                                                                                           |
| ------------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------- |
| 📏 **Line Wrapping Standards**       | Output & Formatting     | Options for RFC 2045 (76 chars), MIME (64 chars), or single-line (no breaks)                          |
| 🧩 **Output Template Presets**       | Output & Formatting     | Pre-configured templates for React components, Vue templates, or TypeScript modules                   |
| 🔐 **Integrity Verification**        | Decoding & Reverse      | After encoding/decoding, optionally generate/show a hash (MD5/SHA256) to verify file integrity        |
| 🚫 **Exclude Pattern Configuration** | Configuration & Control | Like `.gitignore`, define patterns to skip (e.g., `*.log`, `node_modules/**`) during batch operations |
| 🔍 **Workspace-Wide Batch Scan**     | Advanced & Workflow     | Command to find all files of a specific type in the workspace and encode them all at once             |

> 💡 **Have a feature request?** Open an issue!

---

## 🛠️ Development

### Project Structure

```
to-base64/
├── src/
│   ├── extension.ts      # Command registration & activation
│   ├── processor.ts      # Core encoding logic + progress handling
│   ├── loader.ts         # File reading utilities (binary)
│   ├── writer.ts         # File writing + smart naming
│   ├── convertor.ts      # Base64 encoding (Buffer + js-base64 fallback)
│   ├── config.ts         # Configuration management
│   ├── commands.ts       # Configuration commands
│   └── test/
│       ├── fixtures/     # Test input/expected files
│       ├── convertor.test.ts
│       ├── processor.integration.test.ts
│       ├── writer.test.ts
│       ├── config.test.ts
│       ├── commands.test.ts
│       └── utils.ts      # Test helpers
├── dist/                 # Bundled extension (generated)
├── out/                  # Compiled tests (generated)
├── docs/
│   ├── demonstration/    # Demo GIFs/WebM files
│   └── icons/            # Additional icon sizes (not published)
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript configuration
├── esbuild.js            # Build bundler config
├── LICENSE.md            # MIT License
└── README.md             # This file
```

---

## 🤝 Contributing

Contributions are welcome! This extension is designed to be simple and focused, but improvements are always appreciated.

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-idea`
3. Make your changes (keep them focused and well-tested)
4. Run tests: `npm run test`
5. Submit a Pull Request with a clear description

### Code Guidelines

- Follow existing TypeScript strict mode patterns
- Use VS Code API best practices (async/await, cancellation tokens)
- Keep dependencies minimal (only `js-base64` currently)
- Update this README if adding user-facing features
- Add tests for new functionality

### Reporting Issues

Found a bug or have a suggestion? Open an issue with:

- Clear steps to reproduce (for bugs)
- VS Code version and OS
- Extension version (`to-base64@0.2.0`)
- Screenshots or logs if helpful

---

## 📜 License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2026 Tsupko Nikita "quadroc0rp" Romanovich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  Made with ❤️ for developers who need quick, reliable Base64 encoding inside VS Code<br/>
</p>
