import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const [salesResult, todayOrdersCount, pendingOrdersCount, totalProductsCount, totalUsersCount] = await Promise.all([
      prisma.orders.aggregate({
        where: {
          date: { gte: startOfToday, lte: endOfToday },
          status: "delivered",
        },
        _sum: { total_amount: true },
      }),
      prisma.orders.count({
        where: {
          date: { gte: startOfToday, lte: endOfToday },
        },
      }),
      prisma.orders.count({
        where: {
          status: "processing",
        },
      }),
      prisma.products.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      todaySales: Number(salesResult._sum.total_amount || 0),
      todayOrders: todayOrdersCount,
      pendingOrders: pendingOrdersCount,
      totalProducts: totalProductsCount,
      totalUsers: totalUsersCount,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
