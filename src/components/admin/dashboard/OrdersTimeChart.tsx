
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface OrderTimeData {
  date: string;
  orders: number;
  revenue: number;
  pix: number;
  creditCard: number;
  completed: number;
  pending: number;
}

interface OrdersTimeChartProps {
  data: Array<OrderTimeData | any>;
}

const OrdersTimeChart = ({ data }: OrdersTimeChartProps) => {
  // Safely cast the data to ensure it matches the expected structure
  const chartData = Array.isArray(data) ? data : [];
  
  // Reverse the data to show oldest to newest
  const sortedChartData = [...chartData].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Add custom formatter for date display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Pedidos ao longo do tempo</CardTitle>
        <CardDescription>
          Número de pedidos no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={{
          orders: { color: "#6E59A5" },
          revenue: { color: "#10B981" }
        }}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={sortedChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6E59A5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6E59A5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                minTickGap={30}
              />
              <YAxis allowDecimals={false} />
              <CartesianGrid strokeDasharray="3 3" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#6E59A5"
                fillOpacity={1}
                fill="url(#colorOrders)"
                name="Pedidos"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OrdersTimeChart;
