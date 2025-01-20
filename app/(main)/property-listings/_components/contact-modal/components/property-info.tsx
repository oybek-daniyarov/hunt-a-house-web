import { Building2, MapPin } from "lucide-react"

interface PropertyInfoProps {
    listing: App.Data.Lead.LeadListResponse
}

export function PropertyInfo({ listing }: PropertyInfoProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="font-medium">{listing.property_type_name}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{listing.activity_type_name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{listing.emirate_name}, {listing.area_name}</span>
            </div>
        </div>
    )
} 