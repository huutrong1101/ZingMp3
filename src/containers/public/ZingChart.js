import React, { useEffect, useRef, useState } from "react";
import bgchartData from "../../assets/bg-chart.jpg";
import { apiGetChartHome } from "../../apis";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import _ from "lodash";
import { List, SongItem } from "../../components";

const ZingchartData = () => {
  const [chartData, setchartData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchchartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) {
        setchartData(response.data.data);
      }
    };

    fetchchartData();
  }, []);

  const chartRef = useRef();

  const [tooltip, setTooltip] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });

  const [tooltipData, setTooltipData] = useState(null);

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(0,0,0,0.3)", drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "gray" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: (ctx) => {
          const data = [];
          for (let i = 0; i < 3; i++)
            data.push({
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
              data: chartData?.RTChart?.chart?.items[
                Object.keys(chartData?.RTChart?.chart?.items)[i]
              ]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
            });
          const tooltipModel = ctx.tooltip;
          setTooltipData(
            data.find((i) =>
              i.data.some(
                (n) => n === +tooltipModel.body[0].lines[0].replace(",", "")
              )
            )?.encodeId
          );
          if (tooltipModel.opacity === 0) {
            if (tooltip.opacity !== 0)
              setTooltip((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const newTooltipData = {
            opacity: 1,
            left: tooltipModel.caretX,
            top: tooltipModel.caretY,
          };
          if (!_.isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 4,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 4,
        });
      }
      setData({ labels, datasets });
    }
  }, [chartData]);

  console.log(data);

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="relative">
          <img
            src={bgchartData}
            alt="bg-chartData"
            className="h-[500px] object-cover w-full grayscale"
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(206,217,217,.9)]"></div>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 flex items-center bottom-1/2 px-[60px]">
            <h3 className="font-bold text-[40px] text-main-500">#zingchart</h3>
          </div>
          <div>
            <div className="absolute bottom-0 left-0 right-0 top-1/3 px-[60px]">
              {data && <Line ref={chartRef} data={data} options={options} />}
              <div
                className="tooltip"
                style={{
                  top: tooltip.top,
                  left: tooltip.left,
                  position: "absolute",
                  opacity: tooltip.opacity,
                }}
              >
                <SongItem
                  thumbnail={
                    chartData?.RTChart?.items?.find(
                      (i) => i.encodeId === tooltipData
                    )?.thumbnail
                  }
                  title={
                    chartData?.RTChart?.items?.find(
                      (i) => i.encodeId === tooltipData
                    )?.title
                  }
                  artists={
                    chartData?.RTChart?.items?.find(
                      (i) => i.encodeId === tooltipData
                    )?.artistsNames
                  }
                  songData={chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === tooltipData
                  )}
                  style="bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[60px] mt-10">
        {chartData?.RTChart?.items?.map((item) => (
          <List songData={item} key={item.encodeId} />
        ))}
      </div>
    </div>
  );
};

export default ZingchartData;
