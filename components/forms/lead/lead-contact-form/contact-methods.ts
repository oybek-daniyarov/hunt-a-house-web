import { ContactMethod } from './contact-method';

export const CONTACT_METHODS: ContactMethod[] = [
  { id: 'phone', label: 'Phone', type: 'phone' },
  { id: 'whatsapp', label: 'WhatsApp', type: 'phone' },
  {
    id: 'facebook',
    label: 'Facebook',
    type: 'text',
    prefix: 'facebook.com/',
    placeholder: 'Your Facebook username',
    description: 'Enter only your username, not the full URL',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    type: 'text',
    prefix: '@',
    placeholder: 'Your Telegram username',
    description:
      'Username must be 5-32 characters (letters, numbers, underscores)',
  },
];
