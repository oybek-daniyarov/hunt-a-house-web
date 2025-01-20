declare namespace App.Data.Auth {
    export type AuthData = {
        user: any;
        token: string;
    };
    export type ForgotPasswordData = {
        email: string;
    };
    export type LoginResponse = {
        user: App.Data.User.UserData;
        token: string;
    };
    export type RegisterResponse = {
        user: App.Data.User.UserData;
        token: string;
    };
    export type ResetPasswordResponse = {
        user: App.Data.User.UserData;
    };
}
declare namespace App.Data.Auth.Requests {
    export type LoginRequest = {
        email: string;
        password: string;
    };
    export type RegisterRequest = {
        name: string;
        email: string;
        phone: string;
        password: string;
        type: App.Enums.UserType;
        license_number: any | string | null;
    };
    export type ResetPasswordRequest = {
        email: string;
        token: string;
        password: string;
    };
}
declare namespace App.Data.Lead {
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
        emirates: Array<App.Data.Lead.EmirateData> | null;
        cities: Array<App.Data.Lead.CityData> | null;
        areas: Array<App.Data.Lead.AreaData> | null;
        property_types: Array<App.Data.Lead.PropertyTypeData> | null;
        activity_types: Array<App.Data.Lead.ActivityTypeData> | null;
        bedrooms: Array<App.Data.Lead.RoomOptionData> | null;
        bathrooms: Array<App.Data.Lead.RoomOptionData> | null;
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
        user: any | App.Data.User.UserData | null;
        created_at: string;
        is_authenticated: boolean;
        is_user_had_purchased_lead: boolean;
    };
    export type PropertyTypeData = {
        id: number;
        name: string;
    };
    export type RoomOptionData = {
        id: number;
        name: string;
    };
}
declare namespace App.Data.User {
    export type UserData = {
        id: number | null;
        name: string;
        email: string;
        user_type: App.Enums.UserType;
        phone: string | null;
        status: App.Enums.UserStatus;
        whatsapp_verified_at: string | null;
        approved_at: string | null;
        email_verified_at: string | null;
        updated_at: string | null;
        credits: number | null;
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
