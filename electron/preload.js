const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('api', {
  getProfile: () => ipcRenderer.invoke('get-profile'),
  postProfile: (password) => ipcRenderer.invoke('post-profile', password),
});