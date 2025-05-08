import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const FormFieldSelect = ({
  form,
  label,
  name,
  description,
  placeholder,
  optionValues = [],
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className={fieldState.error && "dark:text-red-500"}>
            {label}
          </FormLabel>
          <FormControl>
            <Select
              {...field}
              {...props}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {optionValues.map((item, index) => (
                  <SelectItem
                    value={item.name?.toString() || item}
                    key={item.id || index}
                  >
                    {item.name || item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={fieldState.error && "dark:text-red-500"} />
        </FormItem>
      )}
    />
  );
};
export default FormFieldSelect;
