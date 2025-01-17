declare namespace App.Data {
    export type ActivityTypeData = {
        id: number;
        name: string;
    };
    export type AreaData = {
        id: number;
        name: string;
    };
    export type CityData = {
        id: number;
        name: string;
    };
    export type EmirateData = {
        id: number;
        name: string;
    };
    export type LeadFiltersData = {
        emirates: Array<App.Data.EmirateData> | null;
        cities: Array<App.Data.CityData> | null;
        areas: Array<App.Data.AreaData> | null;
        property_types: Array<App.Data.PropertyTypeData> | null;
        activity_types: Array<App.Data.ActivityTypeData> | null;
    };
    export type LeadListResponse = {
        id: number;
        property_type_name: string;
        activity_type_name: string;
        area_name: string;
        emirate_name: string;
        description: string;
        bedrooms: string | null;
        bathrooms: string | null;
        min_size: number | null;
        max_size: number | null;
        min_budget: number | null;
        max_budget: number | null;
        budget_frequency: App.Enums.BudgetFrequency | null;
        created_at: string;
    };
    export type PropertyTypeData = {
        id: number;
        name: string;
    };
}
declare namespace App.Enums {
    export type ActivityType = "buy" | "long_term_rent" | "short_term_rent";
    export type BudgetFrequency = "per_year" | "per_month" | "per_day";
    export type CompanyType = "real_estate" | "holiday_homes";
    export type ContactMethod =
        | "phone"
        | "whatsapp"
        | "telegram"
        | "email"
        | "sms";
    export type LeadStage =
        | "new"
        | "contacted"
        | "negotiating"
        | "viewing_scheduled"
        | "offer_made"
        | "closed_won"
        | "closed_lost";
    export type LeadStatus =
        | "active"
        | "inactive"
        | "expired"
        | "closed"
        | "rented"
        | "completed";
    export type PaymentMethod = "stripe" | "bank_transfer" | "crypto";
    export type PropertyType = "room" | "apartment" | "townhouse" | "villa";
    export type TransactionType = "purchase" | "usage" | "refund";
    export type UserStatus = "pending" | "active" | "suspended" | "banned";
    export type UserType = "user" | "agent" | "admin";
}
