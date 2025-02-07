import { tool } from 'ai';
import { z } from 'zod';

// Define trusted real estate search engines
const REAL_ESTATE_ENGINES = {
  BAYUT: 'bayut.com',
  PROPERTY_FINDER: 'propertyfinder.ae',
} as const;

// SearX search result schema
const SearxResultSchema = z.object({
  title: z.string(),
  link: z.string(),
  snippet: z.string(),
});

// Jina Reader result schema
const JinaReaderResultSchema = z.object({
  title: z.string(),
  content: z.string(),
  url: z.string(),
});

type SearxResult = {
  url: string;
  title: string;
  content: string;
  thumbnail: string | null;
  engine: string;
  template: string;
  parsed_url: Array<
    [`http | https`, `www.${string}`, `/${string}`, string, string, string]
  >;
  positions: Array<number>;
  score: number;
  category:
    | 'general'
    | 'news'
    | 'images'
    | 'videos'
    | 'maps'
    | 'shopping'
    | 'shopping_images'
    | 'shopping_videos'
    | 'shopping_maps'
    | 'shopping_news'
    | 'shopping_images_news'
    | 'shopping_videos_news'
    | 'shopping_maps_news';
};

export type SearxSearchResponse = {
  query: string;
  number_of_results: number;
  results: SearxResult[];
  answers: any[];
  corrections: any[];
};

const searxSearchTool = tool({
  description:
    'Search for comprehensive information about properties and locations using SearX metasearch engine',
  parameters: z.object({
    query: z.string().describe('The search query about location or property'),
  }),
  execute: async (params) => {
    try {
      const searchUrl = new URL(
        'https://searxng-xk8kkcowgkw8wksccogcwgc4.oyfii.co'
      );
      // Add real estate specific terms to the query
      const enhancedQuery = `${params.query} bayut`;

      searchUrl.searchParams.append('q', enhancedQuery);
      searchUrl.searchParams.append('format', 'json');
      searchUrl.searchParams.append('language', 'en-AE');
      searchUrl.searchParams.append('max_results', '5');
      searchUrl.searchParams.append('engines', 'google, duckduckgo, bing');

      console.log('Search URL: ', searchUrl.toString());

      const response = await fetch(searchUrl.toString(), {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; PropertySearchBot/1.0)',
          // basic auth
          Authorization: `Basic ${Buffer.from(
            'wearesearching:USoPsh6HafEBsunnwgj69LhQJNaAQFdMXrwJ'
          ).toString('base64')}`,
        },
        cache: 'force-cache',
        next: {
          tags: ['searx-search', params.query],
        },
      });

      if (!response.ok) {
        throw new Error(`SearX search failed: ${response.statusText}`);
      }

      const data = (await response.json()) as SearxSearchResponse;

      return data.results?.slice(0, 3)?.map((result: SearxResult) => ({
        title: result.title,
        link: result.url,
      }));
    } catch (error) {
      console.error('SearX search error:', error);
      return [];
    }
  },
});

export default searxSearchTool;
