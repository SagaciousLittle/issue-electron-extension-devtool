const { app, BrowserWindow, session } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('remote-debugging-port', '9223');

async function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  await session.defaultSession.loadExtension(path.resolve(__dirname, './extension'));

  win.loadURL('http://www.google.com');

  win.webContents.openDevTools({
    mode: 'bottom',
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
