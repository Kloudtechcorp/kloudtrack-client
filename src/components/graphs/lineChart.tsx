// src/components/graphs/lineChart.tsx

import React, { useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

const CustomLineChart = () => {
  useEffect(() => {
    const dom = document.getElementById("chart-container");
    if (!dom) {
      console.error("Chart container not found");
      return;
    }

    const myChart = echarts.init(dom as HTMLDivElement);

    const option: EChartsOption = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
          markLine: {
            data: [
              {
                yAxis: 450, // The value where the line should be drawn
                lineStyle: {
                  color: "red",
                  type: "solid", // Make the line solid
                  width: 5, // The color of the line
                },
                label: {
                  formatter: "Custom Line", // Label for the line
                },
              },
            ],
          },
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      myChart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="chart-container"
      style={{ width: "100%", height: "100%", padding: 10 }}
    ></div>
  );
};

export default CustomLineChart;
