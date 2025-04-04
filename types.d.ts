type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  cpuModal: string;
  totalStorage: number;
  totalMemoryGB: number;
};
type View = "CPU" | "RAM" | "STORAGE";

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
};

type UnSubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnSubscribeFunction;
    getStaticsData: () => Promise<StaticData>;
    subscribeChangeView: (
      callback: (view: View) => void
    ) => UnSubscribeFunction;
  };
}
