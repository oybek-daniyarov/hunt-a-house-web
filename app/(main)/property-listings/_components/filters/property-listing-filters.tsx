"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {ArrowDownUp, Plus, X} from "lucide-react"
import {useState} from "react"
import {PropertyFilterSheet} from "./property-filter-sheet"
import {usePropertyFilters} from "../../_hooks/use-property-filters"

const sortOptions = [
    {value: "newest", label: "Newest First"},
    {value: "oldest", label: "Oldest First"},
    {value: "price-asc", label: "Price: Low to High"},
    {value: "price-desc", label: "Price: High to Low"},
    {value: "size-asc", label: "Size: Small to Large"},
    {value: "size-desc", label: "Size: Large to Small"},
]

type PropertyListingFiltersProps = {
    filterData: App.Data.Lead.LeadFiltersData
}

export function PropertyListingFilters({filterData}: PropertyListingFiltersProps) {
    const [filters, setFilters] = usePropertyFilters()
    const [isOpen, setIsOpen] = useState(false)


    const handleSetFilters = async (newFilters: Partial<typeof filters>) => {
        await setFilters({...newFilters, page: 1})
    }
    const handleClear = async () => {
        await setFilters(null)
    }

    const hasFilters = filters.search ||
        filters.emirate ||
        filters.propertyType ||
        filters.activityType ||
        filters.bedrooms !== "Any" ||
        filters.bathrooms !== "Any" ||
        filters.minBudget > 0 ||
        filters.maxBudget < 10000000 ||
        filters.minSize > 0 ||
        filters.maxSize < 7000 ||
        filters.sort !== "newest"


    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    {/* Mobile filter buttons */}
                    <div className="flex sm:hidden items-center gap-2 w-full">
                        <Input
                            placeholder="Search areas..."
                            value={filters.search}
                            onChange={(e) => handleSetFilters({search: e.target.value})}
                            className="h-9 flex-1"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 shrink-0"
                            onClick={() => setIsOpen(true)}
                        >
                            <Plus className="h-4 w-4 mr-2"/>
                            <span>{hasFilters ? "More filters" : "Filters"}</span>
                        </Button>

                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 shrink-0"
                                onClick={handleClear}
                            >
                                <X className="h-4 w-4"/>
                            </Button>
                        )}
                    </div>

                    {/* Desktop filters */}
                    <div className="hidden sm:flex sm:items-center sm:gap-2">
                        <Input
                            placeholder="Search areas..."
                            value={filters.search}
                            onChange={(e) => handleSetFilters({search: e.target.value})}
                            className="h-9 w-auto max-w-[200px]"
                        />
                        <Select
                            value={filters.emirate}
                            onValueChange={(value) => handleSetFilters({emirate: value})}
                        >
                            <SelectTrigger className="h-9 w-auto">
                                <SelectValue placeholder="Emirate"/>
                            </SelectTrigger>
                            <SelectContent>
                                {filterData.emirates?.map((emirate) => (
                                    <SelectItem key={emirate.id} value={emirate.id.toString()}>
                                        {emirate.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={filters.propertyType}
                            onValueChange={(value) => handleSetFilters({propertyType: value})}
                        >
                            <SelectTrigger className="h-9 w-auto">
                                <SelectValue placeholder="Property Type"/>
                            </SelectTrigger>
                            <SelectContent>
                                {filterData.property_types?.map((type) => (
                                    <SelectItem key={type.id} value={type.id.toString()}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={filters.activityType}
                            onValueChange={(value) => handleSetFilters({activityType: value})}
                        >
                            <SelectTrigger className="h-9 w-auto">
                                <SelectValue placeholder="Activity Type"/>
                            </SelectTrigger>
                            <SelectContent>
                                {filterData.activity_types?.map((type) => (
                                    <SelectItem key={type.id} value={type.id.toString()}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9"
                            onClick={() => setIsOpen(true)}
                        >
                            <Plus className="h-4 w-4 mr-2"/>
                            More filters
                        </Button>

                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9"
                                onClick={handleClear}
                            >
                                <X className="h-4 w-4 mr-2"/>
                                Clear filters
                            </Button>
                        )}
                    </div>
                </div>

                <Select
                    value={filters.sort}
                    onValueChange={(value) => setFilters({sort: value})}
                >
                    <SelectTrigger className="h-9 w-full sm:w-[130px]">
                        <SelectValue placeholder="Sort by"/>
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                    {option.value.includes("newest") && <ArrowDownUp className="h-4 w-4"/>}
                                    {option.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <PropertyFilterSheet open={isOpen} onOpenChange={setIsOpen} filterData={filterData}/>
        </div>
    )
}
