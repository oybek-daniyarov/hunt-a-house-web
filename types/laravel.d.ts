declare namespace App.Data {
  export type ContactMethodData = {
    type: string;
    value: string;
  };
}
declare namespace App.Data.Agent.Payload {
  export type CreateAgentPayloadData = {
    name: string;
    email: string;
    phone: string | null;
    companyName: string;
    companyType: App.Enums.CompanyType;
    companySize: number;
    locationId: string;
    address: string | null;
    website: string | null;
    reraNumber: string | null;
    tradeLicense: string | null;
    additionalInfo: string | null;
  };
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
  export type ActivateLeadResponseData = {
    success: boolean;
    message: string;
    lead: App.Data.Lead.LeadListData | null;
    token: string | null;
    errors: Array<any> | null;
  };
  export type LeadData = {
    id: string;
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
    createdAt: string;
    status: App.Enums.LeadStatus;
    isActive: boolean;
    activatedAt: string | null;
    expiresAt: string | null;
    closedAt: string | null;
    contactMethods: Array<App.Data.ContactMethodData>;
    owner: { id: string; name: string; email: string };
  };
  export type LeadFiltersData = {
    propertyTypes: Array<App.Data.Lead.OptionData>;
    budgetFrequency: Array<App.Data.Lead.OptionData>;
    activityTypes: Array<App.Data.Lead.OptionData>;
    bedrooms: Array<App.Data.Lead.OptionData>;
    bathrooms: Array<App.Data.Lead.OptionData>;
  };
  export type LeadListData = {
    id: string;
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
    agent: App.Data.User.UserData | null;
    createdAt: string;
    isAuthenticated: boolean;
    isUserHadPurchasedLead: boolean;
    creditCost: number;
    contactMethods: Array<App.Data.ContactMethodData>;
    owner: { id: string; name: string; email: string };
  };
  export type OptionData = {
    id: string | number;
    name: string;
  };
  export type PropertyTypeData = {
    id: number;
    name: string;
  };
  export type PurchaseLeadResponseData = {
    success: boolean;
    message: string;
    lead: App.Data.Lead.LeadData | null;
  };
}
declare namespace App.Data.Lead.Payload {
  export type ActivateLeadPayloadData = {
    email: string;
    token: string;
    lead: number;
  };
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
    email: string | null;
    maxViews: number | null;
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
declare namespace App.Data.Product.Dto {
  export type PaymentHistoryData = {
    id: number;
    stripeId: string;
    amount: { amount: number; currency: string };
    status: App.Enums.PaymentStatus;
    paymentMethodType: App.Enums.PaymentMethodType;
    receiptUrl: string | null;
    credits: number;
    createdAt: string;
  };
  export type PaymentSuccessData = {
    payment: Array<any>;
    dashboardUrl: string;
    receiptUrl: string | null;
    formattedDate: string;
    formattedAmount: string;
    currency: string;
    paymentId: string;
    credits: number;
    success: boolean;
    error: string | null;
  };
  export type PurchaseResponseData = {
    checkoutUrl: string;
    success: boolean;
    error: string | null;
  };
}
declare namespace App.Data.Product.Payload {
  export type PurchasePayloadData = {
    quantity: number | null;
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
    approvedAt: string | null;
    emailVerifiedAt: string | null;
    updatedAt: string | null;
    credits: number | null;
    contactMethods: Array<App.Data.ContactMethodData>;
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
  export type PaymentMethodType =
    | 'card'
    | 'link'
    | 'alipay'
    | 'bancontact'
    | 'eps'
    | 'giropay'
    | 'ideal'
    | 'p24'
    | 'sepa_debit'
    | 'sofort'
    | 'afterpay_clearpay'
    | 'klarna'
    | 'paypal'
    | 'apple_pay'
    | 'google_pay'
    | 'wechat_pay'
    | 'unknown';
  export type PaymentStatus =
    | 'succeeded'
    | 'processing'
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'requires_capture'
    | 'canceled'
    | 'failed';
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
