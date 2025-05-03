const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "electron", {
    ipcRenderer: {
      send: (channel, data) => {
        ipcRenderer.send(channel, data);
      },
      on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      },
      once: (channel, func) => {
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      },
      removeListener: (channel, func) => {
        ipcRenderer.removeListener(channel, func);
      }
    }
  }
);
