"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!result.success) {
          toast.error(result.error || "เกิดข้อผิดพลาดในการส่งข้อความ");
          return;
        }

        toast.success("ส่งข้อความเรียบร้อยแล้ว!");
        setIsSuccess(true);
        reset();
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดทางเครือข่าย กรุณาลองใหม่อีกครั้ง");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8 bg-card shadow-raised rounded-md p-8 transition-all">
        <CheckCircle className="text-primary size-12" />
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary">ส่งข้อความสำเร็จ!</h3>
          <p className="text-foreground">
            เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)} 
          className="mt-4 gap-2 rounded-md border-border text-primary hover:bg-accent"
        >
          <RotateCcw className="size-4" />
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 bg-card shadow-raised rounded-md p-6 md:p-8"
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-primary font-medium">ชื่อของคุณ</Label>
        <Input 
          {...register("name")} 
          id="name" 
          placeholder="กรอกชื่อของคุณ" 
          className={`rounded-md bg-input border-transparent shadow-inset focus:ring-primary/25 ${errors.name ? "border-destructive" : ""}`}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-primary font-medium">Email</Label>
        <Input 
          {...register("email")} 
          id="email" 
          type="email" 
          placeholder="example@email.com" 
          className={`rounded-md bg-input border-transparent shadow-inset focus:ring-primary/25 ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-primary font-medium">ข้อความ</Label>
        <textarea 
          {...register("message")} 
          id="message" 
          rows={5} 
          placeholder="พิมพ์ข้อความที่ต้องการ..." 
          className={`w-full rounded-md border-transparent bg-input shadow-inset px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 ${errors.message ? "border-destructive" : ""}`}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-raised active:shadow-none"
        disabled={isPending}
      >
        {isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </Button>
    </form>
  );
}
