"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useRouter, useSearchParams } from "next/navigation"
import { GuestView } from "./guest-view"
import { CreditView } from "./credit-view"
import { ContactView } from "./contact-view"
import { cn } from "@/lib/utils"

interface ContactModalProps {
    listings: App.Data.Lead.LeadListResponse[]
}

export default function ContactModal({ listings }: ContactModalProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isOpen = searchParams.has("contact")
    
    const contactId = searchParams.get("contact")
    const activeListing = listings.find(listing => listing.id.toString() === contactId)

    // Simulate user states via URL params
    const userState = searchParams.get("user_state") // guest, auth, purchased
    const userCredits = searchParams.get("credits") ? parseInt(searchParams.get("credits")!) : 0
    
    const onOpenChange = (open: boolean) => {
        const params = new URLSearchParams(searchParams.toString())
        if (!open) {
            params.delete("contact")
            router.replace(`?${params.toString()}`)
        }
    }

    if (!activeListing) return null

    // Override listing auth states based on URL params
    const simulatedListing = {
        ...activeListing,
        is_authenticated: userState === "auth" || userState === "purchased",
        is_user_had_purchased_lead: userState === "purchased",
        user: userState !== "guest" ? {
            ...activeListing.user,
            credits: userCredits
        } : null
    }

    const isPurchased = simulatedListing.is_user_had_purchased_lead

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className={cn(
                "p-0 gap-0 max-h-[95vh] overflow-hidden mx-4 border-none bg-background/80 backdrop-blur-xl",
                isPurchased ? "sm:max-w-[800px] sm:mx-auto" : "sm:max-w-[425px] sm:mx-auto"
            )}>
                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(95vh-2rem)]">
                    <DialogTitle className="text-xl font-medium">
                        {!simulatedListing.is_authenticated 
                            ? "Unlock Property Details" 
                            : simulatedListing.is_user_had_purchased_lead 
                                ? "Contact Information"
                                : "View Contact Details"
                        }
                    </DialogTitle>
                    
                    {/* Show appropriate view based on simulated user state */}
                    {!simulatedListing.is_authenticated ? (
                        <GuestView />
                    ) : simulatedListing.is_user_had_purchased_lead ? (
                        <ContactView listing={simulatedListing} />
                    ) : (
                        <CreditView 
                            listing={simulatedListing} 
                            credits={simulatedListing.user?.credits}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
} 