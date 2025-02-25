'use server';

import { get, list } from '@/lib/client/laravel/client';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';
import { createUrl, routes } from '@/types/api-routes';

const LOCATION_TAGS = ['locations'] as string[];

export async function getLocationRoots(): Promise<
  ApiResult<App.Services.Location.Data.LocationData[]>
> {
  try {
    const url = createUrl(routes['locations.roots']);
    const response = await get<
      ApiResult<App.Services.Location.Data.LocationData[]>
    >(url, LOCATION_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function getLocationChildren(
  id: number
): Promise<ApiResult<App.Services.Location.Data.LocationData[]>> {
  try {
    const url = createUrl(routes['locations.children'], { id });
    const response = await get<
      ApiResult<App.Services.Location.Data.LocationData[]>
    >(url, LOCATION_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function getLocationDescendants(
  id: number
): Promise<ApiResult<App.Services.Location.Data.LocationData[]>> {
  try {
    const url = createUrl(routes['locations.descendants'], { id });
    const response = await get<
      ApiResult<App.Services.Location.Data.LocationData[]>
    >(url, LOCATION_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function getLocationByPath(
  path: string
): Promise<ApiResult<App.Services.Location.Data.LocationData>> {
  try {
    const url = createUrl(routes['locations.by-path'], { path });
    const response = await get<
      ApiResult<App.Services.Location.Data.LocationData>
    >(url, LOCATION_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function getLocationBreadcrumbs(
  id: number
): Promise<ApiResult<App.Services.Location.Data.LocationData[]>> {
  try {
    const url = createUrl(routes['locations.breadcrumbs'], { id });
    const response = await get<
      ApiResult<App.Services.Location.Data.LocationData[]>
    >(url, LOCATION_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function getLocationTree(): Promise<
  ApiResult<App.Services.Location.Data.LocationData[]>
> {
  try {
    const url = createUrl(routes['locations.tree']);
    const response = await get<
      ApiResult<App.Services.Location.Data.LocationData[]>
    >(url, LOCATION_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function searchLocations(query: string) {
  const url = createUrl(routes['locations.search'], { query });
  return await list<App.Services.Location.Data.LocationData>(
    url,
    LOCATION_TAGS
  );
}

export async function getLocation(
  id: number
): Promise<ApiResult<App.Services.Location.Data.LocationData>> {
  try {
    const url = createUrl(routes['locations.show'], { id });
    const response = await get<
      ApiResult<App.Services.Location.Data.LocationData>
    >(url, LOCATION_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}
