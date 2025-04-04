import { ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from "url";
import { getUIPath } from "./pathResolver.js";

export const isDev = (): boolean => process.env.NODE_ENV === "development";

export const icpMainHandle = <Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) => {
  ipcMain.handle(key, (event) => {
    if (event.senderFrame) validateEventFrame(event.senderFrame);
    return handler();
  });
};

export const icpWebContentsSend = <Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) => {
  webContents.send(key, payload);
};

export const validateEventFrame = (frame: WebFrameMain) => {
  console.log("frame", frame.url);
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }

  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious frame");
  }
};
