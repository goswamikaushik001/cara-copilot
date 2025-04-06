import path from "path";
import { app } from "electron";
import { isDev } from "./utils.js";

export const getPreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload/preload.cjs"
  );
};

export const getUIPath = () =>
  path.join(app.getAppPath(), "/dist-react/index.html");

export const getAssetsPath = () =>
  path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
