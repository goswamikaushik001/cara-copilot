import { FC, useMemo } from "react";
import BaseChart from "../common/BaseChart/BaseChart";
import { COLOR_MAP } from "../../constants/constants";

type ChartProps = {
  data: number[];
  maxDataPoint: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
};

const Chart: FC<ChartProps> = (props) => {
  const { data, maxDataPoint, selectedView } = props;

  const { fill, stroke } = useMemo(
    () => COLOR_MAP[selectedView],
    [selectedView]
  );
  const preparedData = useMemo(() => {
    const points = data.map((points) => ({ value: points * 100 }));
    return [
      ...points,
      ...Array.from({ length: maxDataPoint - data.length }).map(() => ({
        value: undefined,
      })),
    ];
  }, [data, maxDataPoint]);

  return <BaseChart data={preparedData} fill={fill} stroke={stroke} />;
};

export default Chart;
