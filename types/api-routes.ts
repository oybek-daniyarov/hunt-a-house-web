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

  // chat routes
  'chat.leads': Route;
  'chat.mark-read': Route;
  'chat.messages': Route;
  'chat.recent': Route;
  'chat.send': Route;
  'chat.status.active': Route;
  'chat.status.get': Route;
  'chat.status.offline': Route;
  'chat.status.online': Route;
  'chat.status.update': Route;
  'chat.unread-count': Route;

  // invoices routes
  'invoices.lead-purchases': Route;

  // leads routes
  'leads.activate': Route;
  'leads.filters': Route;
  'leads.index': Route;
  'leads.mine': Route;
  'leads.mine.update': Route;
  'leads.purchase': Route;
  'leads.purchased': Route;
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

  // products routes
  'products.cancel': Route;
  'products.payment-detail': Route;
  'products.payment-history': Route;
  'products.purchase': Route;
  'products.verify-payment': Route;

  // webhooks routes
  'webhooks.stripe': Route;
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
    path: 'api/v1/auth/email/verify/{id}/{hash}',
    method: 'get',
  },

  // chat routes
  'chat.leads': {
    path: 'api/v1/chat/leads',
    method: 'get',
  },
  'chat.mark-read': {
    path: 'api/v1/chat/messages/{leadId}/read',
    method: 'patch',
  },
  'chat.messages': {
    path: 'api/v1/chat/messages/{leadId}',
    method: 'get',
  },
  'chat.recent': {
    path: 'api/v1/chat/recent',
    method: 'get',
  },
  'chat.send': {
    path: 'api/v1/chat/messages/{leadId}',
    method: 'post',
  },
  'chat.status.active': {
    path: 'api/v1/chat/status/active',
    method: 'post',
  },
  'chat.status.get': {
    path: 'api/v1/chat/status/{userId}',
    method: 'get',
  },
  'chat.status.offline': {
    path: 'api/v1/chat/status/offline',
    method: 'post',
  },
  'chat.status.online': {
    path: 'api/v1/chat/status/online',
    method: 'post',
  },
  'chat.status.update': {
    path: 'api/v1/chat/status',
    method: 'post',
  },
  'chat.unread-count': {
    path: 'api/v1/chat/messages/unread/count',
    method: 'get',
  },

  // invoices routes
  'invoices.lead-purchases': {
    path: 'api/v1/invoices/lead-purchases',
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
  'leads.mine.update': {
    path: 'api/v1/leads/mine/{lead}',
    method: 'patch',
  },
  'leads.purchase': {
    path: 'api/v1/leads/purchase/{uuid}',
    method: 'post',
  },
  'leads.purchased': {
    path: 'api/v1/leads/purchased',
    method: 'get',
  },
  'leads.show': {
    path: 'api/v1/leads/{lead}',
    method: 'get',
  },
  'leads.store': {
    path: 'api/v1/leads',
    method: 'post',
  },

  // locations routes
  'locations.breadcrumbs': {
    path: 'api/v1/locations/{location}/breadcrumbs',
    method: 'get',
  },
  'locations.by-path': {
    path: 'api/v1/locations/by-path/{path}',
    method: 'get',
  },
  'locations.children': {
    path: 'api/v1/locations/{location}/children',
    method: 'get',
  },
  'locations.descendants': {
    path: 'api/v1/locations/{location}/descendants',
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
    path: 'api/v1/locations/{location}',
    method: 'get',
  },
  'locations.tree': {
    path: 'api/v1/locations/tree',
    method: 'get',
  },

  // products routes
  'products.cancel': {
    path: 'api/v1/products/cancel',
    method: 'get',
  },
  'products.payment-detail': {
    path: 'api/v1/products/payments/{id}',
    method: 'get',
  },
  'products.payment-history': {
    path: 'api/v1/products/payment-history',
    method: 'get',
  },
  'products.purchase': {
    path: 'api/v1/products/purchase',
    method: 'post',
  },
  'products.verify-payment': {
    path: 'api/v1/products/verify-payment',
    method: 'get',
  },

  // webhooks routes
  'webhooks.stripe': {
    path: 'api/v1/webhooks/stripe',
    method: 'post',
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
