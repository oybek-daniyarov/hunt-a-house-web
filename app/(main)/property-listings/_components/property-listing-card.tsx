"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Clock, Home } from "lucide-react"
import { formatTimeAgo } from "@/lib/utils/format-time-ago"
import { formatCurrency, formatSize } from "@/lib/utils/format-number"
import { ContactButton } from "./contact-button"

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
    return activityTypeConfig.rent_long // Default to long term
  }
  return activityTypeConfig[type]
}

export function PropertyListingCard({ listing }: PropertyListingCardProps) {
  const activityType = getActivityTypeConfig(listing.activityType)

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-none bg-gradient-to-b from-muted/50 to-muted/20 transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold tracking-tight">{listing.area}</h3>
              <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{listing.city}, {listing.emirate}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={activityType.className}>
                {activityType.label}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {listing.propertyType}
              </Badge>
            </div>
          </div>
          {listing.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{listing.description}</p>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-6 pb-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Bedrooms</span>
            </div>
            <p className="text-base font-medium text-muted-foreground">{listing.bedrooms}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Bathrooms</span>
            </div>
            <p className="text-base font-medium text-muted-foreground">{listing.bathrooms}</p>
          </div>
          <div className="col-span-2 space-y-1">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Size</span>
            </div>
            <p className="text-base font-medium text-muted-foreground">
              {listing.minSize && listing.maxSize 
                ? `${formatSize(listing.minSize)} - ${formatSize(listing.maxSize)}`
                : listing.minSize 
                  ? formatSize(listing.minSize)
                  : "Not specified"}
            </p>
          </div>
          <div className="col-span-2 space-y-1">
            <p className="text-sm font-medium">Budget {listing.budgetFrequency}</p>
            <p className="text-base font-medium text-muted-foreground">
              {listing.minBudget > 0 && listing.maxBudget > 0
                ? `${formatCurrency(listing.minBudget)} - ${formatCurrency(listing.maxBudget)}`
                : listing.minBudget > 0
                  ? formatCurrency(listing.minBudget)
                  : "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatTimeAgo(listing.createdAt)}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto border-t bg-card/50 p-4">
        <ContactButton className="w-full" />
      </CardFooter>
    </Card>
  )
} 