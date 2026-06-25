import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5");

    const ordersData = await prisma.orders.findMany({
      take: limit,
      orderBy: { date: "desc" },
      include: {
        customers: true,
      },
    });

    const orders = ordersData.map((o) => ({
      id: o.id.toString(),
      customerName: o.customers?.name || "Unknown",
      totalAmount: Number(o.total_amount || 0),
      status: o.status as "pending" | "completed" | "cancelled",
      createdAt: o.date?.toISOString() || new Date().toISOString(),
    }));

    const total = await prisma.orders.count();

    return NextResponse.json({ orders, total });
  } catch (error) {
    console.error("Admin orders error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
