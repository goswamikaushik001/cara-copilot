import { Menu, app, BrowserWindow } from "electron";
import { icpWebContentsSend, isDev, isMac } from "../utils/utils.js";

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: isMac() ? undefined : "demo",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: () => app.quit(),
          },
          {
            label: "DevTools",
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
            click: () =>
              icpWebContentsSend("changeView", mainWindow.webContents, "CPU"),
          },
          {
            label: "RAM",
            click: () =>
              icpWebContentsSend("changeView", mainWindow.webContents, "RAM"),
          },
          {
            label: "STORAGE",
            click: () =>
              icpWebContentsSend(
                "changeView",
                mainWindow.webContents,
                "STORAGE"
              ),
          },
        ],
      },
    ])
  );
}
