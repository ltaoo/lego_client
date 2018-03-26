const path = require('path')
const url = require('url')
// const cp = require('child_process');

const electron = require('electron')
const opn = require('opn');
const pty = require('node-pty');

const { ipcMain } = electron;
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

console.log(process.version);

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 745,
    height: 480,
    titleBarStyle: 'hiddenInset',
    minWidth: 745,
    minHeight: 480,
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/');
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'build/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('message', (event, ...args) => {
  // console.log(arg)  // prints "ping"
  console.log('main process', args);
  event.sender.send('reply', 'ltaoo');
});
ipcMain.on('open-editor', (event, path) => {
  console.log(path, 'open editor');  // prints "ping"
  opn(path, {
    app: 'visual studio code',
  });
});
ipcMain.on('open-term', (event, path) => {
  console.log(path, 'open term');  // prints "ping"
  opn(path, {
    app: 'iterm',
  });
});

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg)  // prints "ping"
//   event.returnValue = 'pong'
// })

const term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
  name: 'xterm-color',
  cols: cols || 80,
  rows: rows || 24,
  cwd: process.env.PWD,
  env: process.env
});
ptyProcess.on('data', data => {
  console.log(data.toString());
});
ipcMain.on('exec', (event, cmd) => {
  // console.log(arg)  // prints "ping"
  term.write(cmd);
  event.sender.send('reply', ptyProcess);
});
