const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) =>
    icpOn("statistics", (stats) => {
      callback(stats);
    }),

  subscribeChangeView: (callback) =>
    icpOn("changeView", (view) => {
      callback(view);
    }),

  getStaticsData: () => icpInvoke("getStaticData"),

  sendFrameAction: (payload) => icpSend("sendFrameAction", payload),
} satisfies Window["electron"]);

const icpInvoke = <Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> => {
  return electron.ipcRenderer.invoke(key);
};

const icpOn = <Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) => {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);

  return () => electron.ipcRenderer.off(key, cb);
};

const icpSend = <Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key]
) => {
  electron.ipcRenderer.send(key, payload);
};
