import { useEffect, useState } from "react";

export const useStaticData = () => {
  const [staticData, setStaticData] = useState<StaticData | null>(null);

  useEffect(() => {
    (async () => {
      setStaticData(await window.electron.getStaticsData());
    })();
  }, []);
  return staticData;
};
