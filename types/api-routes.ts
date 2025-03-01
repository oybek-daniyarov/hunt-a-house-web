// Generated API Routes Types

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
  path: string;
  method: HttpMethod;
}

export type Routes = {
  // auth routes
  'auth.forgot-password': Route;
  'auth.login': Route;
  'auth.logout': Route;
  'auth.register': Route;
  'auth.reset-password': Route;
  'auth.user': Route;

  // leads routes
  'leads.activate': Route;
  'leads.create': Route;
  'leads.filters': Route;
  'leads.list': Route;
  'leads.my-leads': Route;
  'leads.show': Route;
  'leads.update-status': Route;

  // locations routes
  'locations.breadcrumbs': Route;
  'locations.by-path': Route;
  'locations.children': Route;
  'locations.descendants': Route;
  'locations.roots': Route;
  'locations.search': Route;
  'locations.show': Route;
  'locations.tree': Route;

  // verification routes
  'verification.verify': Route;
};

export const routes = {
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
  'auth.register': {
    path: 'api/v1/auth/register',
    method: 'post',
  },
  'auth.reset-password': {
    path: 'api/v1/auth/reset-password',
    method: 'post',
  },
  'auth.user': {
    path: 'api/v1/auth/user',
    method: 'get',
  },

  // leads routes
  'leads.activate': {
    path: 'api/v1/leads/activate',
    method: 'post',
  },
  'leads.create': {
    path: 'api/v1/leads',
    method: 'post',
  },
  'leads.filters': {
    path: 'api/v1/leads/filters',
    method: 'get',
  },
  'leads.list': {
    path: 'api/v1/leads',
    method: 'get',
  },
  'leads.my-leads': {
    path: 'api/v1/leads/my-leads',
    method: 'get',
  },
  'leads.show': {
    path: 'api/v1/leads/${id}',
    method: 'get',
  },
  'leads.update-status': {
    path: 'api/v1/leads/my-leads/${lead}/status',
    method: 'patch',
  },

  // locations routes
  'locations.breadcrumbs': {
    path: 'api/v1/locations/${id}/breadcrumbs',
    method: 'get',
  },
  'locations.by-path': {
    path: 'api/v1/locations/path/${path}',
    method: 'get',
  },
  'locations.children': {
    path: 'api/v1/locations/${id}/children',
    method: 'get',
  },
  'locations.descendants': {
    path: 'api/v1/locations/${id}/descendants',
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
    path: 'api/v1/locations/${id}',
    method: 'get',
  },
  'locations.tree': {
    path: 'api/v1/locations/tree',
    method: 'get',
  },

  // verification routes
  'verification.verify': {
    path: 'api/v1/auth/email/verify/${id}/${hash}',
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
    path.match(/\{(\w+)}/g)?.map((p) => p.slice(1, -1)) ?? []
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
