import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import { BrowserWindow } from "electron";
import { icpWebContentsSend, isWindows } from "../utils/utils.js";

const POLLING_INTERVAL = 500;

export const pollRequest = (mainWindow: BrowserWindow) => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const { storageUsage } = getStorageData();

    icpWebContentsSend("statistics", mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage,
    });
  }, POLLING_INTERVAL);
};

const getCpuUsage = (): Promise<number> =>
  new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });

const getRamUsage = () => 1 - osUtils.freememPercentage();

const getStorageData = () => {
  const stats = fs.statfsSync(isWindows() ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    totalStorage: Math.floor(total / 1_000_000_000),
    storageUsage: 1 - free / total,
  };
};

export const getStaticData = () => {
  const { totalStorage } = getStorageData();
  const cpuModal = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(os.totalmem() / 1_000_000_000);

  return {
    cpuModal,
    totalStorage,
    totalMemoryGB,
  };
};
