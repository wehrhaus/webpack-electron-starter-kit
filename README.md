# webpack-electron-starter-kit
This is a webpack setup for running ES2015 and SASS with Hot Module Replacement within an electron application.

## Features
- Packager for creating electron bundles
- Dev Server with configurable PORT
- ES2015 with **hot module replacement** and **source maps**
- SASS with **hot module replacement** and **source maps**
- HTML reloading

## Quick Start
```bash
# Install dependencies
npm i
# Run dev environment
npm run start-dev
# Create electron bundle
npm run bundler
```

## Developing
`main.js` is the main entry point of the electron app.
All dev runs through the `/src` directory, `/src/scripts/index.js` being the main entry point for the renderer portion of the application.

To enable **hot module replacement** simply require the file in your js.

To change dev server PORT, update the package.json _devPort_ property.

_Note: .html files **WILL NOT** be bundled into your javascript when deployed._

## Building Packages
[electron-packager](https://github.com/electron-userland/electron-packager) is used to create the packaged app.

* [Wine](https://www.winehq.org/) is required for building Windows packages.
* To install with **Homebrew**:

```bash
# ensure /usr/local is writable
sudo chown -R $USER /usr/local
brew doctor
brew update
brew cask install xquartz
brew install wine
```

* Note: The first time Wine runs a GUI will come up asking to Install a few items. Install everything it asks for.

```bash
# Build package for mac and windows
## - Platforms can be configured using "bundlePlatforms" attribute in package.json
# Output to the bundles directory
## - The bundle name will be generated using the "productName" attribute in package.json
npm run bundler
```

## Docs
* [Electron Docs](http://electron.atom.io/docs/).
* [electron-packager](https://github.com/electron-userland/electron-packager)
* [Wine](https://www.winehq.org/)
