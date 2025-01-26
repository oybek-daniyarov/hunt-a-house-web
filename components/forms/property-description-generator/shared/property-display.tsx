'use client';

import { type PropertyResponse } from "@/app/api/generate-property/schema";

export const PROPERTY_TYPES = {
  1: 'Apartment',
  2: 'Villa',
  3: 'Townhouse',
  4: 'Penthouse',
  5: 'Compound',
  6: 'Duplex',
} as const;

export type PropertyType = keyof typeof PROPERTY_TYPES;

export const ACTIVITY_TYPES = {
  1: 'Rent',
  2: 'Buy',
  3: 'Short Term',
  4: 'Commercial Rent',
  5: 'Commercial Buy',
} as const;

export type ActivityType = keyof typeof ACTIVITY_TYPES;

export function formatBudget(budget: PropertyResponse['budget'] | null) {
  if (!budget?.min && !budget?.max) return 'Not specified';
  
  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-AE', { 
      style: 'currency', 
      currency: 'AED',
      maximumFractionDigits: 0 
    }).format(num);

  const range = [budget.min && formatNumber(budget.min), budget.max && formatNumber(budget.max)]
    .filter(Boolean)
    .join(' - ');

  const period = budget.frequency === 'one_time' ? '' 
    : budget.frequency === 'yearly' ? ' per year'
    : budget.frequency === 'monthly' ? ' per month'
    : budget.frequency === 'daily' ? ' per day'
    : '';

  return `${range}${period}`;
}

export function formatSize(size: PropertyResponse['property']['size'] | null) {
  if (!size?.min && !size?.max) return 'Not specified';
  
  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(num);

  return [size.min && `${formatNumber(size.min)} sqft`, size.max && `${formatNumber(size.max)} sqft`]
    .filter(Boolean)
    .join(' - ');
}

interface PropertyDisplayProps {
  label: string;
  value: string | null | undefined;
  className?: string;
}

export function PropertyDisplay({ label, value, className = "" }: PropertyDisplayProps) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <span className="font-medium">{label}:</span>
      <span className="flex-1">{value || 'Not specified'}</span>
    </div>
  );
}

interface PropertySectionDisplayProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PropertySectionDisplay({ title, children, className = "" }: PropertySectionDisplayProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h4 className="font-medium">{title}</h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
} 