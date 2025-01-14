"use client"

import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {BanknoteIcon, Clock, MapPin, SquareStack} from "lucide-react"
import {formatTimeAgo} from "@/lib/utils/format-time-ago"
import {formatCurrency, formatSize} from "@/lib/utils/format-number"
import {ContactButton} from "./contact-button"

export type ActivityType = "rent_long" | "rent_short" | "buy"

export interface PropertyLead {
    id: number
    emirate: string
    city: string
    area: string
    propertyType: string
    activityType?: ActivityType
    bedrooms: number
    bathrooms: number
    minSize?: number
    maxSize?: number
    minBudget: number
    maxBudget: number
    budgetFrequency: "Per Year" | "Per Month"
    description?: string
    createdAt: string
}

interface PropertyListingCardProps {
    listing: PropertyLead
}

const activityTypeConfig: Record<ActivityType, { label: string; className: string }> = {
    rent_long: {
        label: "Long Term",
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    },
    rent_short: {
        label: "Short Term",
        className: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
    },
    buy: {
        label: "Buy",
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    },
}

function getActivityTypeConfig(type?: ActivityType) {
    if (!type || !activityTypeConfig[type]) {
        return activityTypeConfig.rent_long
    }
    return activityTypeConfig[type]
}

export function PropertyListingCard({listing}: PropertyListingCardProps) {
    const activityType = getActivityTypeConfig(listing.activityType)

    return (
        <Card
            className="group relative flex h-full flex-col overflow-hidden border-none bg-gradient-to-b from-muted/80 to-muted/40 transition-all hover:shadow-lg dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
            <CardContent className="flex h-full flex-col p-5">
                {/* Header Section */}
                <div className="mb-6 space-y-3">
                    <div className="flex items-start justify-between text-xs">
                        <Badge variant="secondary" className="px-2 py-0.5 text-xs font-medium">
                            {listing.propertyType}
                        </Badge>
                        <Badge className={`${activityType.className} px-2 py-0.5 text-xs font-medium`}>
                            {activityType.label}
                        </Badge>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-2xl font-semibold tracking-tight text-foreground/90">{listing.area}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5"/>
                            <span>{listing.emirate}</span>
                        </div>
                    </div>

                    {listing.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">{listing.description}</p>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Key Features */}
                    <div className="inline-flex items-center gap-4 rounded-lg bg-muted/50 px-4 py-2 text-sm">
                        <div className="flex items-center gap-1">
                            <span className="font-medium">{listing.bedrooms}</span>
                            <span className="text-muted-foreground">Beds</span>
                        </div>
                        <div className="h-4 w-px bg-border/60"/>
                        <div className="flex items-center gap-1">
                            <span className="font-medium">{listing.bathrooms}</span>
                            <span className="text-muted-foreground">Baths</span>
                        </div>
                    </div>

                    {/* Size and Budget */}
                    <div className="space-y-3">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-1">
                                <SquareStack className="h-4 w-4 text-muted-foreground"/>
                                <p className="text-sm text-muted-foreground">Size</p>
                            </div>
                            <p className="text-base font-medium">
                                {listing.minSize && listing.maxSize
                                    ? `${formatSize(listing.minSize)} - ${formatSize(listing.maxSize)}`
                                    : listing.minSize
                                        ? formatSize(listing.minSize)
                                        : "Not specified"}
                            </p>
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center gap-1">
                                <BanknoteIcon className="h-4 w-4 text-muted-foreground"/>
                                <p className="text-sm text-muted-foreground">Budget {listing.budgetFrequency}</p>
                            </div>
                            <p className="text-lg font-semibold text-foreground/90">
                                {listing.minBudget > 0 && listing.maxBudget > 0
                                    ? `${formatCurrency(listing.minBudget)} - ${formatCurrency(listing.maxBudget)}`
                                    : listing.minBudget > 0
                                        ? formatCurrency(listing.minBudget)
                                        : "Not specified"}
                            </p>
                        </div>
                    </div>

                    {/* Time Stamp */}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4"/>
                        <span>{formatTimeAgo(listing.createdAt)}</span>
                    </div>
                </div>

                {/* Contact Button */}
                <div className="mt-5 border-t pt-5">
                    <ContactButton className="w-full bg-foreground text-background hover:bg-foreground/90"/>
                </div>
            </CardContent>
        </Card>
    )
} 
