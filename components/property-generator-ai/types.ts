type EditingSectionType =
  | 'location'
  | 'property'
  | 'specifications'
  | 'budget'
  | 'summary'
  | null;

type StepType = 'describe' | 'loading' | 'review' | 'preview';

enum PAYMENT_FREQUENCIES {
  ONE_TIME = 'one_time',
  YEARLY = 'yearly',
  MONTHLY = 'monthly',
  DAILY = 'daily',
}

type PaymentFrequency = keyof typeof PAYMENT_FREQUENCIES;

const PAYMENT_FREQUENCIES_OPTIONS = Object.entries(PAYMENT_FREQUENCIES).map(
  ([key, value]) => ({
    label: key,
    value,
  })
);

export type { EditingSectionType, PaymentFrequency, StepType };

export { PAYMENT_FREQUENCIES, PAYMENT_FREQUENCIES_OPTIONS };
