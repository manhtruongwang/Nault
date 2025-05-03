import { Injectable } from "@angular/core";
import { NotificationService } from "./notification.service";

@Injectable()
export class DesktopService {
  private _ipc: any;

  constructor(private notifications: NotificationService) {
    try {
      // Try different methods to get the IPC renderer
      if (window.require) {
        const electron = window.require("electron");
        this._ipc = electron.ipcRenderer;
        console.log("IPC loaded via window.require");
      } else if ((window as any).electron) {
        this._ipc = (window as any).electron.ipcRenderer;
        console.log("IPC loaded via window.electron");
      } else if ((window as any).ipcRenderer) {
        this._ipc = (window as any).ipcRenderer;
        console.log("IPC loaded via window.ipcRenderer");
      }

      if (this._ipc) {
        console.log("IPC successfully loaded");
      } else {
        console.warn(
          "IPC not available - running in web mode or IPC bridge not properly configured"
        );
      }
    } catch (e) {
      console.error("Error loading IPC:", e);
    }
  }

  connect() {}

  on(channel: string, listener) {
    if (!this._ipc) return false;
    this._ipc.on(channel, listener);
    return true;
  }

  send(channel: string, ...args) {
    if (!this._ipc) return false;
    this._ipc.send(channel, ...args);
    return true;
  }
}
