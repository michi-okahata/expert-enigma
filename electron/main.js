const { app, BrowserWindow, ipcMain } = require('electron');
const { path } = require('path');
const { spawn } = require('child_process');
const { fetch } = require('electron-fetch').default;

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: 'C:/Users/michi/password/forge-demo/forge-demo/electron/preload.js'// path.join(__dirname, 'preload.js')
      // path.join() gives an error, unsure why, seems insane :(.
    }
  });

  win.loadFile('index.html');
}

const startFlask = () => {
  demoFlask = spawn('python', ['-u', 'sqlitedb/flaskdb.py']); // Works! Starts up server.
}

// Window open/close. 
app.whenReady().then(() => {
  startFlask();
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  if (demoFlask) demoFlask.kill();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC
// Handle IPC for GET request
ipcMain.handle('demo-get-profile', async () => {
  try {
      const response = await fetch('http://127.0.0.1:5000/api/demo_get_profile');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return { error: 'Failed to fetch data' };
  }
});

// Handle IPC for POST request
ipcMain.handle('post-data', async (event, payload) => {
  try {
      const response = await fetch('http://127.0.0.1:5000/api/demo_post_profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error posting data:', error);
      return { error: 'Failed to post data' };
  }
});