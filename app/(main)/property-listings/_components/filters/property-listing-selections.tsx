"use client"

import {Badge} from "@/components/ui/badge"
import {X} from "lucide-react"
import {filterParsers, usePropertyFilters} from "../../_hooks/use-property-filters"

export function PropertyListingSelections() {
    const [filters, setFilters] = usePropertyFilters()

    const hasFilters = filters.search || filters.emirate || filters.propertyType ||
        filters.activityType || filters.bedrooms !== "Any" || filters.bathrooms !== "Any" ||
        filters.minBudget > 0 || filters.maxBudget < 10000000 ||
        filters.minSize > 0 || filters.maxSize < 7000

    if (!hasFilters) return null

    const removeFilter = (key: keyof typeof filters) => {
        setFilters({[key]: filterParsers[key].defaultValue})
    }

    const removeRangeFilter = (minKey: keyof typeof filters, maxKey: keyof typeof filters) => {
        setFilters({
            [minKey]: filterParsers[minKey].defaultValue,
            [maxKey]: filterParsers[maxKey].defaultValue
        })
    }

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat("en-AE", {
            style: "currency",
            currency: "AED",
            maximumFractionDigits: 0
        }).format(value)
    }

    const formatSize = (value: number) => {
        return `${value.toLocaleString()} sq.ft`
    }

    return (
        <div className="container py-2 flex flex-wrap gap-2">
            {filters.search && (
                <Badge variant="secondary">
                    Search: {filters.search}
                    <button onClick={() => removeFilter("search")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}

            {filters.emirate && (
                <Badge variant="secondary">
                    {filters.emirate}
                    <button onClick={() => removeFilter("emirate")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}

            {filters.propertyType && (
                <Badge variant="secondary">
                    {filters.propertyType}
                    <button onClick={() => removeFilter("propertyType")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}

            {filters.activityType && (
                <Badge variant="secondary">
                    {filters.activityType.replace("_", " ")}
                    <button onClick={() => removeFilter("activityType")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}

            {filters.bedrooms !== "Any" && (
                <Badge variant="secondary">
                    {filters.bedrooms} {parseInt(filters.bedrooms) === 1 ? "bedroom" : "bedrooms"}
                    <button onClick={() => removeFilter("bedrooms")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}

            {filters.bathrooms !== "Any" && (
                <Badge variant="secondary">
                    {filters.bathrooms} {parseInt(filters.bathrooms) === 1 ? "bathroom" : "bathrooms"}
                    <button onClick={() => removeFilter("bathrooms")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}

            {(filters.minBudget > 0 || filters.maxBudget < 10000000) && (
                <Badge variant="secondary">
                    Price: {formatPrice(filters.minBudget)} - {formatPrice(filters.maxBudget)}
                    <button onClick={() => removeRangeFilter("minBudget", "maxBudget")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}

            {(filters.minSize > 0 || filters.maxSize < 7000) && (
                <Badge variant="secondary">
                    Size: {formatSize(filters.minSize)} - {formatSize(filters.maxSize)}
                    <button onClick={() => removeRangeFilter("minSize", "maxSize")} className="ml-1">
                        <X className="h-3 w-3"/>
                    </button>
                </Badge>
            )}
        </div>
    )
} 
