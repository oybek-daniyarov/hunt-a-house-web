'use client'

import { useQueryStates } from 'nuqs'
import { parseAsString, parseAsInteger } from 'nuqs'

export const filterParsers = {
    search: parseAsString.withDefault(''),
    emirate: parseAsString.withDefault(''),
    propertyType: parseAsString.withDefault(''),
    activityType: parseAsString.withDefault(''),
    bedrooms: parseAsString.withDefault('Any'),
    bathrooms: parseAsString.withDefault('Any'),
    minBudget: parseAsInteger.withDefault(0),
    maxBudget: parseAsInteger.withDefault(10000000),
    minSize: parseAsInteger.withDefault(0),
    maxSize: parseAsInteger.withDefault(7000),
    sort: parseAsString.withDefault('newest')
}

export function usePropertyFilters() {
    return useQueryStates(filterParsers, {
        history: 'push',
        shallow: false
    })
}

// Helper types
export type PropertyFilters = typeof filterParsers
export type FilterKeys = keyof PropertyFilters
