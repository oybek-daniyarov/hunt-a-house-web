"use client";

import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

const CITIES = {
  Dubai: ["Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "JBR", "Business Bay"],
  "Abu Dhabi": ["Al Reem Island", "Al Raha Beach", "Yas Island", "Saadiyat Island"],
  Sharjah: ["Al Majaz", "Al Khan", "Al Nahda", "Al Taawun"],
  // Add more cities as needed
};

const AREAS = {
  "Dubai Marina": ["JBR Beach", "Marina Walk", "Marina Mall", "Bluewaters Island"],
  "Downtown Dubai": ["Burj Khalifa", "Dubai Mall", "Business Bay", "DIFC"],
  "Palm Jumeirah": ["Palm West Beach", "The Pointe", "Crescent", "The Trunk"],
  // Add more areas as needed
};

export function PropertyLocationForm() {
  const { control, watch, setValue } = useFormContext();
  const selectedEmirate = watch("emirate");
  const selectedCity = watch("city");
  const selectedAreas = watch("areas") || [];

  const handleAreaAdd = (area: string) => {
    if (selectedAreas.length < 5 && !selectedAreas.includes(area)) {
      setValue("areas", [...selectedAreas, area]);
    }
  };

  const handleAreaRemove = (area: string) => {
    setValue("areas", selectedAreas.filter((a: string) => a !== area));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Property Location</h2>
        <p className="text-muted-foreground">Select your preferred locations</p>
      </div>

      <div className="grid gap-6">
        <FormField
          control={control}
          name="emirate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emirate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emirate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EMIRATES.map((emirate) => (
                    <SelectItem key={emirate} value={emirate}>
                      {emirate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedEmirate && (
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CITIES[selectedEmirate as keyof typeof CITIES]?.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {selectedCity && (
          <FormField
            control={control}
            name="areas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Areas (Select up to 5)</FormLabel>
                <Select
                  onValueChange={(value) => handleAreaAdd(value)}
                  value={undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select areas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AREAS[selectedCity as keyof typeof AREAS]?.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAreas.map((area: string) => (
                    <Badge
                      key={area}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {area}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleAreaRemove(area)}
                      />
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
} 