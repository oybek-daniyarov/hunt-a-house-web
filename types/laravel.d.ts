declare namespace App.Data.Auth {
  export type LoginData = {
    user: App.Data.User.UserData;
    token: string;
  };
  export type MagicLinkData = {
    user: App.Data.User.UserData;
    token: string;
  };
  export type RegisterData = {
    user: App.Data.User.UserData;
    token: string;
  };
  export type ResetPasswordData = {
    user: App.Data.User.UserData;
  };
}
declare namespace App.Data.Auth.Payload {
  export type ForgotPasswordPayloadData = {
    email: string;
  };
  export type LoginPayloadData = {
    email: string;
    password: string;
  };
  export type RegisterPayloadData = {
    name: string;
    email: string;
    phone: string;
    password: string;
    type: App.Enums.UserType;
    licenseNumber: string | null;
  };
  export type ResetPasswordPayloadData = {
    email: string;
    token: string;
    password: string;
  };
  export type VerifyMagicLinkTokenPayloadData = {
    email: string;
    token: string;
  };
}
declare namespace App.Data.Lead {
  export type LeadData = {
    id: number | null;
    user_id: number;
    contact_methods: Array<any>;
    emirate_id: number;
    city_id: number;
    areas: Array<number>;
    property_type_id: number;
    activity_type_id: number;
    bedrooms: string | null;
    bathrooms: string | null;
    min_size: number | null;
    max_size: number | null;
    min_budget: number | null;
    max_budget: number | null;
    budget_frequency: App.Enums.BudgetFrequency | null;
    description: string;
    max_agent_views: number;
    current_agent_views: number;
    credit_cost: number;
    view_multiplier: number | null;
    override_credit_cost: boolean;
    override_credit_cost_value: number | null;
    created_at: string | null;
    updated_at: string | null;
    property_images: { [key: number]: any } | null | Array<any>;
    documents: { [key: number]: any } | null | Array<any>;
    contact: any | null;
  };
  export type LeadFiltersData = {
    emirates: Array<App.Data.Lead.OptionData>;
    cities: Array<App.Data.Lead.OptionData>;
    areas: Array<App.Data.Lead.OptionData>;
    propertyTypes: Array<App.Data.Lead.PropertyTypeData>;
    activityTypes: Array<App.Data.Lead.OptionData>;
    bedrooms: Array<App.Data.Lead.OptionData>;
    bathrooms: Array<App.Data.Lead.OptionData>;
  };
  export type LeadListData = {
    id: number;
    propertyTypeName: string;
    activityTypeName: string;
    areaName: string;
    emirateName: string;
    description: string;
    bedrooms: number | null;
    bathrooms: number | null;
    minSize: number | null;
    maxSize: number | null;
    minBudget: number | null;
    maxBudget: number | null;
    budgetFrequency: App.Enums.BudgetFrequency | null;
    user: App.Data.User.UserData;
    createdAt: string;
    isAuthenticated: boolean;
    isUserHadPurchasedLead: boolean;
  };
  export type OptionData = {
    id: number;
    name: string;
  };
  export type PropertyTypeData = {
    id: number;
    name: string;
  };
}
declare namespace App.Data.Lead.Payload {
  export type CreateLeadPayloadData = {
    user: any;
    property_type_id: number;
    activity_type_id: number;
    bedrooms: number;
    bathrooms: number;
    min_size: number;
    max_size: number;
    min_budget: number;
    max_budget: number;
    emirate_id: number;
    city_id: number;
    description: string;
    max_agent_views: number;
    areas: Array<any>;
  };
}
declare namespace App.Data.Location {
  export type AreaData = {
    id: string;
    name: string;
    cityId: string;
    code: string | null;
  };
  export type CityData = {
    id: string;
    name: string;
    emirateId: string;
    code: string | null;
  };
  export type EmirateData = {
    id: string;
    name: string;
    code: string | null;
  };
}
declare namespace App.Data.User {
  export type UserData = {
    id: number | null;
    name: string;
    email: string;
    userType: App.Enums.UserType;
    phone: string | null;
    status: App.Enums.UserStatus;
    whatsappVerifiedAt: string | null;
    approvedAt: string | null;
    emailVerifiedAt: string | null;
    updatedAt: string | null;
    credits: number | null;
  };
}
declare namespace App.Data.User.Payload {
  export type CreateUserPayloadData = {
    name: string;
    email: string;
    phone: string;
    password: string;
    userType: App.Enums.UserType;
    licenseNumber: string | null;
    emailVerifiedAt: string | null;
  };
}
declare namespace App.Enums {
  export type ActivityType = 'buy' | 'long_term_rent' | 'short_term_rent';
  export type BudgetFrequency = 'per_year' | 'per_month' | 'per_day';
  export type CompanyType = 'real_estate' | 'holiday_homes';
  export type ContactMethod =
    | 'phone'
    | 'whatsapp'
    | 'telegram'
    | 'email'
    | 'sms';
  export type LeadStage =
    | 'new'
    | 'contacted'
    | 'negotiating'
    | 'viewing_scheduled'
    | 'offer_made'
    | 'closed_won'
    | 'closed_lost';
  export type LeadStatus =
    | 'active'
    | 'inactive'
    | 'expired'
    | 'closed'
    | 'rented'
    | 'completed';
  export type PaymentMethod = 'stripe' | 'bank_transfer' | 'crypto';
  export type PropertyType = 'room' | 'apartment' | 'townhouse' | 'villa';
  export type TransactionType = 'purchase' | 'usage' | 'refund';
  export type UserStatus = 'pending' | 'active' | 'suspended' | 'banned';
  export type UserType = 'user' | 'agent' | 'admin';
}
