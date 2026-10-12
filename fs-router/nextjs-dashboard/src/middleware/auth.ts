import * as cookie from 'cookie';
import type { MiddlewareHandler } from 'hono';
import {
  unstable_formatRouterRequest as formatRouterRequest,
  unstable_parseRouterRequest as parseRouterRequest,
} from 'waku/router/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '../lib/session';

// The proxy.ts of the original: an optimistic check that sends a signed-out
// visitor to the login page. It cannot see an action, so it is not the
// authorization boundary; requireSession() is.
const auth = (): MiddlewareHandler => async (c, next) => {
  const route = parseRouterRequest(c.req.raw);
  if (
    route?.type === 'route' &&
    (route.path === '/dashboard' || route.path.startsWith('/dashboard/'))
  ) {
    const cookies = cookie.parseCookie(c.req.header('cookie') ?? '');
    const session = await verifySessionToken(cookies[SESSION_COOKIE_NAME]);
    // Like next-auth, pass the requested route along as callbackUrl.
    const callbackUrl = route.query
      ? `${route.path}?${route.query}`
      : route.path;
    const location =
      !session &&
      formatRouterRequest(
        c.req.raw,
        '/login',
        new URLSearchParams({ callbackUrl }).toString(),
      );
    if (location) {
      // 303, so a form posted without JavaScript is not resent to /login
      return c.redirect(location.pathname + location.search, 303);
    }
  }
  await next();
};

export default auth;
