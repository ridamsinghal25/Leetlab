import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { aiProblemSchema, problemSchema } from "@/validations/zodValidations";
import { Form } from "../ui/form";
import FormFieldInput from "../basic/FormFieldInput";
import FormFieldTextarea from "../basic/FormFieldTextarea";
import { useAIStore } from "@/store/useAIStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export const AIProblemModal = ({ isOpen, onOpenChange, form }) => {
  const { isGenerating, generateFormData } = useAIStore();

  const aiProblemForm = useForm({
    resolver: zodResolver(aiProblemSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      const formData = await generateFormData(data);

      const isDataValid = problemSchema.safeParse(formData);

      if (isDataValid.success) {
        toast.success("Problem data generated successfully");
        form.reset(formData);
        onOpenChange();
      } else {
        toast.error("There seems to be an issue with data please validate it");
        form.reset(formData);
        onOpenChange();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            AI Generated Problem
          </DialogTitle>
          <DialogDescription>Generate a problem using AI.</DialogDescription>
        </DialogHeader>

        <Form {...aiProblemForm}>
          <form
            onSubmit={aiProblemForm.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <FormFieldInput
              form={aiProblemForm}
              name="title"
              label="Problem Title"
              type="text"
              placeholder="Enter problem title"
            />

            <FormFieldTextarea
              form={aiProblemForm}
              name="description"
              label="Problem Description"
              placeholder="Enter problem description"
              className="min-h-[100px]"
            />

            <DialogFooter>
              <div className="flex justify-between items-center w-full">
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => aiProblemForm.reset()}
                  >
                    Reset
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onOpenChange}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
