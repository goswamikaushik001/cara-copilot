import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "../hooks/useStatistics";
import Chart from "../components/Chart/Chart";

const ChartPage = () => {
  const [activeView, setActiveView] = useState<View>("CPU");
  const statistics = useStatistics(10);

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  const cpuUsage = useMemo(
    () => statistics.map((stats) => stats.cpuUsage),
    [statistics]
  );

  const ramUsage = useMemo(
    () => statistics.map((stats) => stats.ramUsage),
    [statistics]
  );

  const storageUsage = useMemo(
    () => statistics.map((stats) => stats.storageUsage),
    [statistics]
  );

  const activeUsage = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return { data: cpuUsage, label: "CPU Usage" };
      case "RAM":
        return { data: ramUsage, label: "RAM Usage" };
      case "STORAGE":
        return { data: storageUsage, label: "STORAGE Usage" };
    }
  }, [activeView, cpuUsage, ramUsage, storageUsage]);

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <p className="text-xl font-bold">{activeUsage.label}</p>
      <div className="w-full h-56 p-2 ">
        <Chart data={activeUsage.data} maxDataPoint={10} />
      </div>
    </div>
  );
};

export default ChartPage;
