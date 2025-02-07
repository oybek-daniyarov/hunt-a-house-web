import { Location } from '@/components/ui/location-search-field';

export async function searchLocations(query: string): Promise<Location[]> {
  try {
    const response = await fetch(
      `/api/locations/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to search locations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}
