// const path = require('path')
// const url = require('url')
// // const cp = require('child_process');

// const electron = require('electron')
// const opn = require('opn');
// const pty = require('node-pty');

// const { ipcMain } = electron;
// // Module to control application life.
// const app = electron.app
// // Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow
// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let mainWindow

// function createWindow () {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({
//     width: 745,
//     height: 480,
//     titleBarStyle: 'hiddenInset',
//     minWidth: 745,
//     minHeight: 480,
//   })

//   // and load the index.html of the app.
//   // mainWindow.loadURL('http://localhost:3000/');
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, '/app/public/index.html'),
//     protocol: 'file:',
//     slashes: true
//   }))

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools()

//   // Emitted when the window is closed.
//   mainWindow.on('closed', function () {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null
//   })
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
// ipcMain.on('message', (event, ...args) => {
//   // console.log(arg)  // prints "ping"
//   console.log('main process', args);
//   event.sender.send('reply', 'ltaoo');
// });
// ipcMain.on('open-editor', (event, path) => {
//   console.log(path, 'open editor');  // prints "ping"
//   opn(path, {
//     app: 'visual studio code',
//   });
// });
// ipcMain.on('open-term', (event, path) => {
//   console.log(path, 'open term');  // prints "ping"
//   opn(path, {
//     app: 'iterm',
//   });
// });

// // ipcMain.on('synchronous-message', (event, arg) => {
// //   console.log(arg)  // prints "ping"
// //   event.returnValue = 'pong'
// // })

// const term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
//   name: 'xterm-color',
//   // cols: cols || 80,
//   // rows: rows || 24,
//   cwd: process.env.PWD,
//   env: process.env
// });
// ipcMain.on('init-message', (event) => {
//   term.on('data', data => {
//     console.log(data);
//     event.sender.send('init-reply', data);
//   });
// });
// ipcMain.on('xterm', (event, cmd) => {
//   term.write(cmd);
// });

/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
const { app, BrowserWindow } = require('electron');
// import MenuBuilder from './menu';
console.log(process.env);

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  // const sourceMapSupport = require('source-map-support');
  // sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  // require('electron-debug')();
  // const path = require('path');
  // const p = path.join(__dirname, '..', 'app', 'node_modules');
  // require('module').globalPaths.push(p);
}

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = [
//     'REACT_DEVELOPER_TOOLS',
//     'REDUX_DEVTOOLS'
//   ];

//   return Promise
//     .all(extensions.map(name => installer.default(installer[name], forceDownload)))
//     .catch(console.log);
// };


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  // if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  //   await installExtensions();
  // }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  console.log(__dirname);
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
});
