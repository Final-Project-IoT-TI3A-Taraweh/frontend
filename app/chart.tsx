"use client"

import {Dot} from "lucide-react"
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react";

const chartConfig = {
  temperature: {
    label: "",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type LiveChartProps = {
  icon: React.ElementType;
  label: string;
  color: string;
  data: any;
  key_name: string;
}

export function LiveChart({ icon: Icon, label, color, data, key_name }: LiveChartProps) {
  const latestData = data[0]
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center" id={key_name}>
            <Icon className={`h-5 w-5 text-${color}-500 mr-2 align-middle`}/>
            <span className="align-middle">{label}</span>
            <Dot />
            <span className="text-m">{latestData[key_name]}</span>
          </div>
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value * 1000).toLocaleTimeString("en-US", { minute: "2-digit", second: "2-digit" })}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey={key_name}
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
