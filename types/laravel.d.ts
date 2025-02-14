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
    user: any | null;
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
declare namespace App.Services.Location.Data {
  export type LocationData = {
    id: number;
    name: string;
    path: string | null;
    parent: App.Services.Location.Data.LocationParentData | null;
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
