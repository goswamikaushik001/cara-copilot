import { FC } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

type BaseChartProps = {
  data: { value: number | undefined }[];
  fill: string;
  stroke: string;
};

const BaseChart: FC<BaseChartProps> = (props) => {
  const { data, fill, stroke } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid stroke="#333" strokeDasharray="5 5" fill="#1C1C1C" />
        <Area
          fillOpacity={0.6}
          dataKey="value"
          fill={fill}
          stroke={stroke}
          strokeWidth={3}
          type={"monotone"}
          isAnimationActive={false}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, 100]} stroke="transparent" width={0} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BaseChart;
