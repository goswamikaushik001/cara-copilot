import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { isMac } from "../utils/utils.js";
import { getAssetsPath } from "../utils/pathResolver.js";

export const createTray = (mainWindow: BrowserWindow) => {
  const tray = new Tray(
    path.join(
      getAssetsPath(),
      isMac() ? "trayIconTemplate.png" : "trayIcon.png"
    )
  );

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit(),
      },
      {
        label: "Show",
        click: () => {
          mainWindow.show();
          if (app.dock) app.dock.show();
        },
      },
    ])
  );
};
