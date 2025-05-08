import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

function FormFieldTextarea({
  form,
  label,
  name,
  description,
  placeholder,
  type = "text",
  ...props
}) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className={fieldState.error && "dark:text-red-500"}>
              {label}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                type={type}
                {...field}
                {...props}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className={fieldState.error && "dark:text-red-500"} />
          </FormItem>
        )}
      />
    </>
  );
}

export default FormFieldTextarea;
