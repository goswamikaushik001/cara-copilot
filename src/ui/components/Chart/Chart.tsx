import { FC, useMemo } from "react";
import BaseChart from "../common/BaseChart/BaseChart";

type ChartProps = {
  data: number[];
  maxDataPoint: number;
};

const Chart: FC<ChartProps> = (props) => {
  const { data, maxDataPoint } = props;
  const preparedData = useMemo(() => {
    const points = data.map((points) => ({ value: points * 100 }));
    return [
      ...points,
      ...Array.from({ length: maxDataPoint - data.length }).map(() => ({
        value: undefined,
      })),
    ];
  }, [data, maxDataPoint]);

  return <BaseChart data={preparedData} />;
};

export default Chart;
