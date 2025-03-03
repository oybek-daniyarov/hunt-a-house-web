// Generated API Routes Types

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
  path: string;
  method: HttpMethod;
}

export type Routes = {
  // agents routes
  'agents.store': Route;

  // auth routes
  'auth.forgot-password': Route;
  'auth.login': Route;
  'auth.logout': Route;
  'auth.me': Route;
  'auth.register': Route;
  'auth.reset-password': Route;
  'auth.verify': Route;

  // leads routes
  'leads.activate': Route;
  'leads.filters': Route;
  'leads.index': Route;
  'leads.mine': Route;
  'leads.mine.update-status': Route;
  'leads.show': Route;
  'leads.store': Route;

  // locations routes
  'locations.breadcrumbs': Route;
  'locations.by-path': Route;
  'locations.children': Route;
  'locations.descendants': Route;
  'locations.index': Route;
  'locations.roots': Route;
  'locations.search': Route;
  'locations.show': Route;
  'locations.tree': Route;
};

export const routes = {
  // agents routes
  'agents.store': {
    path: 'api/v1/agents',
    method: 'post',
  },

  // auth routes
  'auth.forgot-password': {
    path: 'api/v1/auth/forgot-password',
    method: 'post',
  },
  'auth.login': {
    path: 'api/v1/auth/login',
    method: 'post',
  },
  'auth.logout': {
    path: 'api/v1/auth/logout',
    method: 'delete',
  },
  'auth.me': {
    path: 'api/v1/auth/me',
    method: 'get',
  },
  'auth.register': {
    path: 'api/v1/auth/register',
    method: 'post',
  },
  'auth.reset-password': {
    path: 'api/v1/auth/reset-password',
    method: 'post',
  },
  'auth.verify': {
    path: 'api/v1/auth/email/verify/${id}/${hash}',
    method: 'get',
  },

  // leads routes
  'leads.activate': {
    path: 'api/v1/leads/activate',
    method: 'post',
  },
  'leads.filters': {
    path: 'api/v1/leads/filters',
    method: 'get',
  },
  'leads.index': {
    path: 'api/v1/leads',
    method: 'get',
  },
  'leads.mine': {
    path: 'api/v1/leads/mine',
    method: 'get',
  },
  'leads.mine.update-status': {
    path: 'api/v1/leads/mine/${lead}/status',
    method: 'patch',
  },
  'leads.show': {
    path: 'api/v1/leads/${lead}',
    method: 'get',
  },
  'leads.store': {
    path: 'api/v1/leads',
    method: 'post',
  },

  // locations routes
  'locations.breadcrumbs': {
    path: 'api/v1/locations/${location}/breadcrumbs',
    method: 'get',
  },
  'locations.by-path': {
    path: 'api/v1/locations/by-path/${path}',
    method: 'get',
  },
  'locations.children': {
    path: 'api/v1/locations/${location}/children',
    method: 'get',
  },
  'locations.descendants': {
    path: 'api/v1/locations/${location}/descendants',
    method: 'get',
  },
  'locations.index': {
    path: 'api/v1/locations',
    method: 'get',
  },
  'locations.roots': {
    path: 'api/v1/locations/roots',
    method: 'get',
  },
  'locations.search': {
    path: 'api/v1/locations/search',
    method: 'get',
  },
  'locations.show': {
    path: 'api/v1/locations/${location}',
    method: 'get',
  },
  'locations.tree': {
    path: 'api/v1/locations/tree',
    method: 'get',
  },
} as const;

export type Params = Record<
  string,
  string | number | boolean | Array<string | number> | null
>;

function addQueryString(path: string, params: Params): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key + '[]', String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? path + '?' + queryString : path;
}

export function createUrl<P extends Params = Record<string, never>>(
  route: Route,
  params: P = {} as P
): string {
  let path = route.path;

  // Replace path parameters
  const pathParams = new Set(
    path.match(/\{(\w+)\}/g)?.map((p) => p.slice(1, -1)) ?? []
  );
  const queryParams: Params = {};

  Object.entries(params).forEach(([key, value]) => {
    if (pathParams.has(key)) {
      path = path.replace('{' + key + '}', String(value));
    } else {
      queryParams[key] = value;
    }
  });

  return addQueryString(path, queryParams);
}
