"use client"

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactButtonProps {
  className?: string
}

export function ContactButton({ className }: ContactButtonProps) {
  return (
    <Button 
      variant="default" 
      size="lg" 
      className={cn("gap-2", className)}
    >
      <Phone className="h-4 w-4" />
      View Contact Details
    </Button>
  )
} 