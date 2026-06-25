"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PeriodSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const periods = [
    { label: "7 วัน", value: "7d" },
    { label: "30 วัน", value: "30d" },
    { label: "90 วัน", value: "90d" },
  ];

  return (
    <div className="flex gap-2">
      {periods.map((p) => (
        <Button
          key={p.value}
          variant={value === p.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(p.value)}
        >
          {p.label}
        </Button>
      ))}
    </div>
  );
}
