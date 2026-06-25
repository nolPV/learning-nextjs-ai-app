import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export interface AdminOrderItem {
  id: string;
  customerName: string;
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

export function RecentOrdersTable({
  orders,
  loading,
  error,
  onRetry,
}: {
  orders: AdminOrderItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
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
          <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
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
        <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>ยอดรวม</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>วันที่</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  ไม่พบข้อมูลคำสั่งซื้อ
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(order.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "completed" ? "bg-green-100 text-green-700" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {order.status === "completed" ? "สำเร็จ" : 
                       order.status === "pending" ? "รอดำเนินการ" : "ยกเลิก"}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString("th-TH")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
