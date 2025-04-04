import { useEffect, useState } from "react";

export const useStatistics = (dataPointCount: number) => {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) =>
      setValue((prevState) => {
        const newData = [...prevState, stats];
        if (newData.length > dataPointCount) {
          newData.shift();
        }
        return newData;
      })
    );
    return unsub;
  }, []);

  return value;
};
