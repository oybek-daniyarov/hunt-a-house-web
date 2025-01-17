"use client"

import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@/components/ui/sheet"
import {Slider} from "@/components/ui/slider"
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {usePropertyFilters} from "../../_hooks/use-property-filters"

const bedroomOptions = ["Any", "1", "2", "3", "4", "5", "6+"]
const bathroomOptions = ["Any", "1", "2", "3", "4", "5", "6", "7+"]

type PropertyFilterSheetProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    filterData: App.Data.LeadFiltersData
}

export function PropertyFilterSheet({open, onOpenChange, filterData}: PropertyFilterSheetProps) {
    const [filters, setFilters] = usePropertyFilters()

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
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>More Filters</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Default filters - Only show on mobile */}
                    <div className="sm:hidden space-y-6">
                        <div className="space-y-4">
                            <Label>Emirate</Label>
                            <Select
                                value={filters.emirate}
                                onValueChange={(value) => setFilters({emirate: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select emirate"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {filterData.emirates?.map((emirate) => (
                                        <SelectItem key={emirate.id} value={emirate.id.toString()}>
                                            {emirate.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Label>Property Type</Label>
                            <Select
                                value={filters.propertyType}
                                onValueChange={(value) => setFilters({propertyType: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select property type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {filterData.property_types?.map((type) => (
                                        <SelectItem key={type.id} value={type.id.toString()}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Label>Activity Type</Label>
                            <Select
                                value={filters.activityType}
                                onValueChange={(value) => setFilters({activityType: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select activity type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {filterData.activity_types?.map((type) => (
                                        <SelectItem key={type.id} value={type.id.toString()}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator/>
                    </div>

                    {/* Bedrooms and Bathrooms Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <Label>Bedrooms</Label>
                            <Select
                                value={filters.bedrooms}
                                onValueChange={(value) => setFilters({bedrooms: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select bedrooms"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {bedroomOptions.map(option => (
                                        <SelectItem key={option} value={option}>
                                            {option} {option !== "Any" && "bedrooms"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Label>Bathrooms</Label>
                            <Select
                                value={filters.bathrooms}
                                onValueChange={(value) => setFilters({bathrooms: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select bathrooms"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {bathroomOptions.map(option => (
                                        <SelectItem key={option} value={option}>
                                            {option} {option !== "Any" && "bathrooms"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator/>

                    {/* Price Range */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Price Range</Label>
                            <span className="text-sm text-muted-foreground">
                {formatPrice(filters.minBudget)} - {formatPrice(filters.maxBudget)}
              </span>
                        </div>
                        <Slider
                            min={0}
                            max={10000000}
                            step={50000}
                            value={[filters.minBudget, filters.maxBudget]}
                            onValueChange={([min, max]) =>
                                setFilters({minBudget: min, maxBudget: max})
                            }
                            className="w-full"
                        />
                    </div>

                    <Separator/>

                    {/* Size Range */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Size Range</Label>
                            <span className="text-sm text-muted-foreground">
                {formatSize(filters.minSize)} - {formatSize(filters.maxSize)}
              </span>
                        </div>
                        <Slider
                            min={0}
                            max={7000}
                            step={100}
                            value={[filters.minSize, filters.maxSize]}
                            onValueChange={([min, max]) =>
                                setFilters({minSize: min, maxSize: max})
                            }
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="sticky bottom-0 mt-6 flex items-center justify-end gap-2 border-t bg-background pt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>
                        Apply Filters
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
} 
