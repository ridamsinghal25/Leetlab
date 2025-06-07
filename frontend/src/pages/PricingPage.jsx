import {
  Zap,
  Brain,
  ArrowLeft,
  IndianRupee,
  AlertCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import {
  FREE_PLAN_FEATURES,
  PRO_PLAN_FEATURES,
} from "@/components/pricing/planFeatures";
import { useAuthStore } from "@/store/useAuthStore";
import { load } from "@cashfreepayments/cashfree-js";
import { usePaymentStore } from "@/store/usePaymentStore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PricingPage() {
  const { authUser } = useAuthStore();
  const { createOrder, verifyOrder, isVerifyingOrder, isCreatingOrder } =
    usePaymentStore();

  const navigate = useNavigate();

  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();

  const getOrderDetails = async () => {
    const res = await createOrder({
      phoneNumber: "8765432109",
    });

    if (res.success) {
      return {
        sessionId: res.order.paymentSessionId,
        orderId: res.order.orderId,
      };
    }
  };

  const verifyPayment = async (orderIdToVerify) => {
    const res = await verifyOrder(orderIdToVerify);

    if (res?.success) {
      navigate(ROUTES.BILLING);
      window.location.reload();
    }
  };

  const handleUpgrade = async (e) => {
    e.preventDefault();

    try {
      const { sessionId, orderId } = await getOrderDetails();

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      const cashfreeCheckout = await cashfree.checkout(checkoutOptions);

      if (cashfreeCheckout?.error) {
        toast.error(
          cashfreeCheckout.error ||
            "User has closed the popup or there is some payment error, Check for Payment Status"
        );
        return;
      }

      await verifyPayment(orderId);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-screen lg:w-5xl mx-auto py-8 px-4">
      <Card className="border shadow-lg mb-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to={ROUTES.HOME}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <IndianRupee className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Pricings</CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div>
        <Card className="w-full bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                💰 Choose Your Plan
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Whether you're just starting out or ready to dive deeper into
                technical prep, we've got the perfect plan for you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card
                className={`relative overflow-hidden border-2 ${
                  !authUser?.isSubscribed && "border-green-500"
                } hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="absolute -top-1 right-0">
                  {!authUser?.isSubscribed && (
                    <Badge className="rounded-none rounded-bl-lg bg-primary">
                      ⚡️ Active
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-xl">Free Plan</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold">Always Free</h3>
                  </div>
                  <CardDescription className="text-sm font-medium text-muted-foreground">
                    Everything you need to start solving and improving.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {FREE_PLAN_FEATURES.map(
                      ({ icon: Icon, title, description }) => (
                        <div className="flex items-start gap-3" key={title}>
                          <Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{title}</p>
                            <p className="text-sm text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground italic">
                      Perfect for students, self-learners, or anyone looking to
                      build a strong foundation at zero cost.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card
                className={`relative overflow-hidden border-2 ${
                  authUser?.isSubscribed && "border-green-500"
                } hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="absolute -top-1 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-primary">
                    {authUser?.isSubscribed ? "⚡️ Active" : "🔥 Popular"}
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Pro Plan</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold">₹2999</h3>
                  </div>
                  <CardDescription className="text-sm font-medium text-muted-foreground">
                    Unlock the full potential of your prep.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {PRO_PLAN_FEATURES.map(
                      ({ icon: Icon, title, description }) => (
                        <div className="flex items-start gap-3" key={title}>
                          <Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{title}</p>
                            <p className="text-sm text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground italic">
                      Take your prep to the next level with data-backed insights
                      and tools built for serious candidates.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleUpgrade}
                    disabled={
                      authUser?.isSubscribed ||
                      isCreatingOrder ||
                      isVerifyingOrder
                    }
                  >
                    Upgrade to Pro
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-4">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>
            Phone number was assigned randomly for demo purposes.
          </AlertTitle>
          <AlertDescription>
            <p>
              For this demo, your phone number has been automatically assigned.
              In a future version, users will be required to enter their own
              phone number during registration.
            </p>
            <ul className="list-inside list-disc text-sm">
              <li>This is only for demonstration purposes</li>
              <li>Your actual number is not used</li>
              <li>Future versions will prompt for real input</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
