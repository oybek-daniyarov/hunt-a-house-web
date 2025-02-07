import client from '@/lib/client/laravel/client';

type SearchPropertiesQuery = {
  query: string;
};

const searchProperties = async (params: SearchPropertiesQuery) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => [key, value.toString()])
  );

  const path = '/locations/search?' + new URLSearchParams(filteredParams);

  const response = client.list<App.Data.Property.SearchPropertyData>(path);
  return response;
};

export { searchProperties };
