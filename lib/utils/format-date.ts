const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});

export function formatDate(date: string | Date, includeTime = false) {
  const d = new Date(date);
  if (includeTime) {
    return `${dateFormatter.format(d)} at ${timeFormatter.format(d)}`;
  }
  return dateFormatter.format(d);
}
