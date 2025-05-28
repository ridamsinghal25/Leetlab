import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { verifyEmailSchema } from "@/validations/zodValidations";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import AuthImagePattern from "@/components/basic/AuthImagePattern";

function VerifyEmailPage() {
  const { isVerifyingEmail, verifyEmail } = useAuthStore();
  const navigate = useNavigate();

  const verifyEmailForm = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      verifyCode: "",
    },
  });

  const onVerifyCodeSubmit = async (data) => {
    try {
      const res = await verifyEmail(data);

      if (res.success) {
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  return (
    <div className="min-h-screen grid gap-20 lg:grid-cols-2">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 rounded-lg shadow-md my-6 sm:my-10 border dark:border-gray-500 dark:border-2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to LeetLab
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Verify your email to get started
            </p>
          </div>

          <Form {...verifyEmailForm}>
            <form
              onSubmit={verifyEmailForm.handleSubmit((data) =>
                onVerifyCodeSubmit(data).then(() => verifyEmailForm.reset())
              )}
              className="space-y-6"
            >
              <FormField
                control={verifyEmailForm.control}
                name="verifyCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="border rounded-md dark:border-gray-600">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center">
                <Button type="submit" disabled={isVerifyingEmail}>
                  {isVerifyingEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome to our platform!"}
        subtitle={
          "Verify your email to access our platform and start using our services."
        }
      />
    </div>
  );
}

export default VerifyEmailPage;
