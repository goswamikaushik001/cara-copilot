import { app, BrowserWindow } from "electron";
import { icpMainHandle, isDev } from "./utils.js";
import { getStaticData, pollRequest } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollRequest(mainWindow);

  icpMainHandle("getStaticData", () => getStaticData());
});
