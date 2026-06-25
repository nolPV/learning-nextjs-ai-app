"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  Clock 
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { KpiCard, KpiCardSkeleton } from "@/components/admin/kpi-card";
import { PeriodSelector } from "@/components/admin/period-selector";
import { RecentOrdersTable, AdminOrderItem } from "@/components/admin/recent-orders-table";

const RevenueChart = dynamic(() => import("@/components/admin/revenue-chart").then(mod => mod.RevenueChart), { 
  ssr: false 
});

export interface AdminStats {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalUsers: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const fetchStats = useCallback(async () => {
    setStatsError(null);
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setStatsError(err.message);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setOrdersError(null);
    try {
      const res = await fetch('/api/admin/orders?limit=5');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data.orders);
    } catch (err: any) {
      setOrdersError(err.message);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const fetchRevenue = useCallback(async () => {
    setRevenueLoading(true);
    setRevenueError(null);
    try {
      const res = await fetch(`/api/admin/revenue?period=${period}`);
      if (!res.ok) throw new Error('Failed to fetch revenue data');
      const data = await res.json();
      setRevenue(data);
    } catch (err: any) {
      setRevenueError(err.message);
    } finally {
      setRevenueLoading(false);
    }
  }, [period]);

  useEffect(() => {
    // Initial load
    fetchStats();
    fetchOrders();
    fetchRevenue();

    const interval = setInterval(() => {
      fetchStats();
      fetchOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchStats, fetchOrders, fetchRevenue]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4.5 w-4.5" /> กลับหน้าหลัก
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
        <PeriodSelector value={period} onChange={(val) => setPeriod(val as any)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="ยอดขายวันนี้" 
          value={stats ? formatCurrency(stats.todaySales) : "฿0"} 
          icon={<TrendingUp className="h-4 w-4" />} 
        />
        <KpiCard 
          title="คำสั่งซื้อวันนี้" 
          value={stats ? stats.todayOrders : 0} 
          icon={<ShoppingBag className="h-4 w-4" />} 
        />
        <KpiCard 
          title="รอดำเนินการ" 
          value={stats ? stats.pendingOrders : 0} 
          icon={<Clock className="h-4 w-4" />} 
        />
        <KpiCard 
          title="ผู้ใช้งานทั้งหมด" 
          value={stats ? stats.totalUsers : 0} 
          icon={<Users className="h-4 w-4" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart 
            data={revenue} 
            loading={revenueLoading} 
            error={revenueError} 
            onRetry={() => fetchRevenue()} 
          />
        </div>
        <div className="lg:col-span-1">
          <RecentOrdersTable 
            orders={orders} 
            loading={ordersLoading} 
            error={ordersError} 
            onRetry={() => fetchOrders()} 
          />
        </div>
      </div>
    </div>
  );
}
