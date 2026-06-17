"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatPollDate, type ChartSeries } from "@/lib/polls"

type PollLineChartProps = {
  data: Record<string, string | number | null>[]
  config: ChartConfig
  series: ChartSeries[]
}

export function PollLineChart({ data, config, series }: PollLineChartProps) {
  return (
    <ChartContainer config={config} className="aspect-auto h-[420px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => formatPollDate(String(value))}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date
                return date ? formatPollDate(String(date)) : ""
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map(({ key }) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={{ r: 3 }}
            connectNulls={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  )
}
