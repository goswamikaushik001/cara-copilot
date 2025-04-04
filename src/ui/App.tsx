import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./useStatistics";
import Chart from "./Chart";

function App() {
  const [activeView, setActiveView] = useState<View>("CPU");
  const statistics = useStatistics(10);
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

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

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
    <div style={{ display: "flex", gap: 0.5, flexDirection: "column" }}>
      <div>
        <p>{activeUsage.label}</p>
        <div style={{ width: 400, height: 120 }}>
          <Chart data={activeUsage.data} maxDataPoint={10} />
        </div>
      </div>
    </div>
  );
}

export default App;
