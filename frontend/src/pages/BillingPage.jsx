import BillingOrderShimmerUI from "@/components/basic/BillingOrderShimmerUI";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import { ArrowLeft, IndianRupee, Receipt, Wallet } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BillingPage() {
  const { authUser } = useAuthStore();
  const { isFetchingOrders, getOrders, orders } = usePaymentStore();

  useEffect(() => {
    if (!orders.length) {
      getOrders();
    }
  }, [getOrders]);

  return (
    <main className="w-screen lg:w-5xl mx-auto py-8 px-4">
      <Card className="border shadow-lg mb-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to={ROUTES.HOME}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <Wallet className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Your Billings</CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      <section className="flex-grow overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {authUser?.isSubscribed ? (
                <>
                  <span className="text-xl font-semibold">Pro Plan</span>
                  <span className="text-xl font-semibold">₹2999</span>
                </>
              ) : (
                <>
                  <span className="text-xl font-semibold">Free Plan</span>
                  <span className="text-xl font-semibold">₹0</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {isFetchingOrders ? (
          <BillingOrderShimmerUI />
        ) : (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Order Amount</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.createdAt?.split("T")[0]}</TableCell>
                        <TableCell>Subscription Fee</TableCell>
                        <TableCell>{order.orderAmount}</TableCell>
                        <TableCell>{order.orderCurrency}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {order.orderStatus}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                          <div className="rounded-full bg-muted p-6 mb-4">
                            <Receipt className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            No billing history
                          </h3>
                          <p className="text-sm text-muted-foreground text-center max-w-sm">
                            Your billing history will appear here once you make
                            <br />
                            your first purchase or subscription.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
