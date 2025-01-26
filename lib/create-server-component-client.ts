import { createSearchParamsCache, type ParserMap } from 'nuqs/server';

export function createServerComponentClient<T extends ParserMap>(parsers: T) {
  return createSearchParamsCache(parsers);
}
