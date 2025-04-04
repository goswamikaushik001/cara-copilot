import { app, BrowserWindow } from "electron";
import { icpMainHandle, isDev } from "../utils/utils.js";
import { getStaticData, pollRequest } from "./resourceManager.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import { getPreloadPath, getUIPath } from "../utils/pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
    width: 800,
    height: 600,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollRequest(mainWindow);

  icpMainHandle("getStaticData", () => getStaticData());

  createTray(mainWindow);
  handleCloseEvent(mainWindow);
  createMenu(mainWindow);
});

const handleCloseEvent = (mainWindow: BrowserWindow) => {
  let willClose = false;

  mainWindow.on("close", (event) => {
    if (willClose) return;

    event.preventDefault();
    mainWindow.hide();

    if (app.dock) app.dock.hide();
  });

  app.on("before-quit", () => (willClose = true));

  mainWindow.on("show", () => (willClose = false));
};
