import { FC } from "react";
import Chart from "../Chart/Chart";

type SelectOptionProps = {
  title: "CPU" | "RAM" | "STORAGE";
  subTitle: string;
  onClick: () => void;
  data: number[];
};

const SelectOption: FC<SelectOptionProps> = (props) => {
  const { title, subTitle, onClick, data } = props;
  return (
    <button
      className="w-full h-full flex flex-col items-start bg-chartButton-400 rounded-lg p-0.5 cursor-pointer hover:bg-chartButton-400/50"
      onClick={onClick}
    >
      <div className="flex gap-x-2 items-center">
        <p className="font-bold text-base">{title}</p>
        <p className="text-sm">{subTitle}</p>
      </div>
      <div className="w-full h-12">
        <Chart selectedView={title} data={data} maxDataPoint={10} />
      </div>
    </button>
  );
};

export default SelectOption;
