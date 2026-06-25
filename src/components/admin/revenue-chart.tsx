"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}

export function RevenueChart({
  data,
  loading,
  error,
  onRetry,
}: {
  data: RevenuePoint[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>แนวโน้มรายได้</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-10">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>แนวโน้มรายได้</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="text-sm text-destructive mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="text-sm font-medium underline underline-offset-4"
          >
            ลองใหม่อีกครั้ง
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>แนวโน้มรายได้</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value) => new Intl.NumberFormat("th-TH", { 
                style: "currency", 
                currency: "THB" 
              }).format(Number(value))}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2563eb" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
