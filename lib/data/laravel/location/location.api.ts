'use server';

import client from '@/lib/client/laravel/client';
import { createUrl, routes } from '@/types/api-routes';

export async function searchLocations(query?: string) {
  const params = Boolean(query) ? { query } : undefined;
  const url = createUrl<{ query?: string }>(routes['locations.search'], params);
  return client.list<App.Services.Location.Data.LocationData>(url, {}, [
    'locations',
  ]);
}

export async function getLocation(id: string) {
  const url = createUrl(routes['locations.show'], { id });
  return client.get<App.Services.Location.Data.LocationData>(url, [
    'locations',
  ]);
}
