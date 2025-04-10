"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GeoComponent,
} from "echarts/components";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
]);

// 国家级客户数据（示例）
const countryData = [
  { name: "United States", value: 200 },
  { name: "Germany", value: 150 },
  { name: "China", value: 180 },
  { name: "Brazil", value: 50 },
  { name: "India", value: 80 },
];

const ClientsHeatMap: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: echarts.ECharts;
    let resizeObserver: ResizeObserver;

    const initChart = async () => {
      const res = await fetch("/asset/map.json");
      const geoJson = await res.json();
      echarts.registerMap("world", geoJson);

      chartInstance = echarts.init(chartRef.current!);

      chartInstance.setOption({
        tooltip: {
          trigger: "item",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: any) => `${params.name}: ${params.value ?? 0}`,
        },
        series: [
          {
            name: "客户分布",
            type: "map",
            map: "world",
            roam: true,
            emphasis: {
              label: { show: true },
              itemStyle: {
                areaColor: "#a1d0f2",
              },
            },
            itemStyle: {
              areaColor: "#e0f2ff",
              borderColor: "#999",
            },
            data: countryData,
          },
        ],
        visualMap: {
          show: false, // 不显示图例控件
          min: 0,
          max: 200,
          inRange: {
            color: ["#cce5ff", "#007bff"], // 浅蓝 → 深蓝
          },
        },
      });

      resizeObserver = new ResizeObserver(() => {
        chartInstance.resize();
      });
      resizeObserver.observe(chartRef.current!);
    };

    initChart();

    return () => {
      chartInstance?.dispose();
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        minHeight: 400,
      }}
    />
  );
};

export default ClientsHeatMap;
