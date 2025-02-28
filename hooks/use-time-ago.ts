'use client';

import { useEffect, useState } from 'react';

const rtf = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
  style: 'long',
});

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

function formatTimeAgo(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }

  return date.toLocaleDateString();
}

export function useTimeAgo(date: string | Date) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const targetDate = new Date(date);
    setTimeAgo(formatTimeAgo(targetDate));

    // Update every minute for recent dates
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(targetDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
}
