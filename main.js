const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('disable-web-security');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  if(isDev){
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(path.join(__dirname, 'builder/index.html'))
  }

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})