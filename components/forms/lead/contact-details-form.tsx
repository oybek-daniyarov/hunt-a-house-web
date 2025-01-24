"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const CONTACT_METHODS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "phone", label: "Phone Call" },
  { id: "email", label: "Email" },
];

export function ContactDetailsForm() {
  const { control, watch } = useFormContext();
  const contactMethods = watch("contactMethods") || [];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Contact Details</h2>
        <p className="text-muted-foreground">How should we get in touch with you?</p>
      </div>

      <div className="grid gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactMethods"
          render={() => (
            <FormItem>
              <FormLabel>Preferred Contact Methods</FormLabel>
              <div className="grid gap-4 pt-2">
                {CONTACT_METHODS.map((method) => (
                  <FormField
                    key={method.id}
                    control={control}
                    name="contactMethods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={method.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(method.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], method.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== method.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {method.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
} 