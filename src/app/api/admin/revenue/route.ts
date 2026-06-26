import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "30d";

    let days = 30;
    if (period === "7d") days = 7;
    if (period === "90d") days = 90;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const orders = await prisma.orders.findMany({
      where: {
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });

    const revenueMap: Record<string, { date: string; revenue: number; orders: number }> = {};

    orders.forEach((order) => {
      if (!order.date) return;
      const dateStr = order.date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });
      
      if (!revenueMap[dateStr]) {
        revenueMap[dateStr] = { date: dateStr, revenue: 0, orders: 0 };
      }
      
      revenueMap[dateStr].revenue += Number(order.total_amount || 0);
      revenueMap[dateStr].orders += 1;
    });

    const result = Object.values(revenueMap);
    
    // Fill in missing dates if necessary for a smooth chart, but for this MVP, 
    // returning existing dates is usually sufficient.

    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin revenue error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
