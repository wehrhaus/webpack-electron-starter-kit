const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const pkg = require('./package.json');

const deskmetrics = require('deskmetrics');

const displayMode = pkg.DISPLAY_MODE || 'standard';

let MainWindow;

deskmetrics.start({
  appId: pkg.appId
})
.then(() => {
  deskmetrics.setProperty('version', pkg.version);
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    frame: false,
    fullscreen: displayMode === 'fullscreen',
    transparent: false
  });

  if (displayMode === 'fullscreen') {
    // Get display data
    let displays = electron.screen.getAllDisplays();
    let externalDisplay = displays.find((display) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0
    });

    if (externalDisplay) {
      mainWindow.x = externalDisplay.bounds.x + 50;
      mainWindow.y = externalDisplay.bounds.y + 50;
    }
  }

  const pathSrc = process.env.NODE_ENV === 'development' ?
    './src/index.html' :
    './dist/index.html';
  mainWindow.loadURL(url.format({
    pathname: path.resolve(__dirname, pathSrc),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('analytics', (evt, ...body) => {
  let evtName = body.shift();
  console.log(`evtName: ${evtName}`);
  console.log(`body: ${body}`);
  deskmetrics.send(evtName, body)
    .then((res) => {
      evt.sender.send('analyticsSuccess', res);
    })
    .catch((err) => {
      evt.sender.send('analyticsError', err);
    })

});
