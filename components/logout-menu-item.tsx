"use client"

import { LogOut } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { logoutAction } from "@/lib/data/laravel/auth/auth.actions"
import { handleFormSuccess } from "@/lib/client/laravel/helpers/form.helpers"

export function LogoutMenuItem() {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await logoutAction()
    
    if (result.success) {
      handleFormSuccess('You have been logged out successfully')
      redirect('/auth/login')
    }
  }

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  )
} 