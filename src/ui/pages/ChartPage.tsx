import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "../hooks/useStatistics";
import Chart from "../components/Chart/Chart";
import SelectOption from "../components/SelectOption/SelectOption";
import { useStaticData } from "../hooks/useStaticData";

const ChartPage = () => {
  const [activeView, setActiveView] = useState<View>("CPU");
  const statistics = useStatistics(10);
  const staticData = useStaticData();
  const { cpuModel, totalMemoryGB, totalStorage } = staticData || {};

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
    <div className="grid grid-cols-12 m-auto p-3 max-w-4xl">
      <div className="col-span-4 flex flex-col gap-4">
        <SelectOption
          title="CPU"
          subTitle={cpuModel ?? ""}
          onClick={() => setActiveView("CPU")}
          data={cpuUsage}
        />
        <SelectOption
          title="RAM"
          subTitle={`${totalMemoryGB ?? ""} GB`}
          onClick={() => setActiveView("RAM")}
          data={ramUsage}
        />
        <SelectOption
          title="STORAGE"
          subTitle={`${totalStorage ?? ""} GB`}
          onClick={() => setActiveView("STORAGE")}
          data={storageUsage}
        />
      </div>
      {/* Chart Container */}
      <div className="col-span-8">
        <p className="text-lg text-center font-bold">{activeUsage.label}</p>
        <div className="w-full h-40  ">
          <Chart
            selectedView={activeView}
            data={activeUsage.data}
            maxDataPoint={10}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
