declare namespace App.Ai.Enums {
  export type AiModel =
    | 'claude-3-sonnet'
    | 'claude-3-opus'
    | 'claude-3-haiku-20240307'
    | 'mistral-medium'
    | 'mistral-large'
    | 'gpt-4'
    | 'gpt-4o-mini'
    | 'gpt-4-turbo-preview'
    | 'gpt-3.5-turbo'
    | 'deepseek-chat';
}
declare namespace App.Data.Auth {
  export type CreateEmailAccountData = {
    email: string;
    name: string;
    phone: string;
    userType: App.Enums.UserType;
  };
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
    password_confirmation: string | null;
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
    locations: { id: number; name: string; path: string; depth: number };
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
    override_credit_cost: boolean;
    override_credit_cost_value: number | null;
    created_at: string | null;
    updated_at: string | null;
    property_images: { [key: number]: any } | null | Array<any>;
    documents: { [key: number]: any } | null | Array<any>;
    contact: App.Data.User.ContactData | null;
  };
  export type LeadFiltersData = {
    propertyTypes: Array<App.Data.Lead.PropertyTypeData>;
    budgetFrequency: Array<App.Data.Lead.OptionData>;
    activityTypes: Array<App.Data.Lead.OptionData>;
    bedrooms: Array<App.Data.Lead.OptionData>;
    bathrooms: Array<App.Data.Lead.OptionData>;
  };
  export type LeadListData = {
    id: number;
    propertyTypeName: string;
    activityTypeName: string;
    locations: Array<App.Services.Location.Data.LocationData>;
    description: string;
    bedrooms: number | null;
    bathrooms: number | null;
    minSize: number | null;
    maxSize: number | null;
    minBudget: number | null;
    maxBudget: number | null;
    budgetFrequency: App.Enums.BudgetFrequency | null;
    user: App.Data.User.UserData | null;
    createdAt: string;
    isAuthenticated: boolean;
    isUserHadPurchasedLead: boolean;
  };
  export type OptionData = {
    id: string | number;
    name: string;
  };
  export type PropertyTypeData = {
    id: number;
    name: string;
  };
}
declare namespace App.Data.Lead.Payload {
  export type CreateLeadPayloadData = {
    locations: Array<any>;
    propertyType: number;
    activityType: number;
    bedrooms: number;
    bathrooms: number;
    minSize: number;
    maxSize: number;
    minBudget: number;
    maxBudget: number;
    budgetFrequency: App.Enums.BudgetFrequency;
    description: string;
    contact: Array<any>;
  };
}
declare namespace App.Data.Media {
  export type MediaData = {
    id: number;
    name: string;
    file_name: string;
    mime_type: string;
    size: number;
    url: string;
    thumb_url: string | null;
    preview_url: string | null;
  };
}
declare namespace App.Data.User {
  export type ContactData = {
    name: string;
    email: string;
    phone: string | null;
  };
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
    | 'pending'
    | 'on_hold'
    | 'closed'
    | 'expired';
  export type PaymentMethod = 'stripe' | 'bank_transfer' | 'crypto';
  export type PropertyType = 'room' | 'apartment' | 'townhouse' | 'villa';
  export type TransactionType = 'purchase' | 'usage' | 'refund';
  export type UserStatus = 'pending' | 'active' | 'suspended' | 'banned';
  export type UserType = 'user' | 'agent' | 'admin';
}
declare namespace App.Services.Location.Data {
  export type LocationBreadcrumbsData = {
    id: number;
    name: string;
  };
  export type LocationData = {
    id: number;
    name: string;
    path: string | null;
    parent: App.Services.Location.Data.LocationParentData | null;
    breadcrumbs: Array<App.Services.Location.Data.LocationBreadcrumbsData> | null;
    children: Array<App.Services.Location.Data.LocationData> | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
  export type LocationParentData = {
    id: number;
    name: string;
    path: string | null;
  };
}
declare namespace App.Services.Search.Data.Lead {
  export type LeadData = {
    id: number;
    user_id: number;
    contact_methods: Array<any>;
    locations: Array<any>;
    property_type_id: number;
    activity_type_id: number;
    bedrooms: number;
    bathrooms: number;
    min_size: number;
    max_size: number;
    min_budget: number;
    max_budget: number;
    budget_frequency: App.Enums.BudgetFrequency;
    description: string;
    max_agent_views: number;
    current_agent_views: number;
  };
}
