import { Building2, TrendingUp, User } from 'lucide-react';

export const featureIcons = {
  agent: User,
  valuation: TrendingUp,
  marketing: Building2,
} as const;

export type FeatureIconType = keyof typeof featureIcons;
