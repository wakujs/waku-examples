import { unstable_createRouteHref as createRouteHref } from "waku/router";

export const getPostHref = createRouteHref({ path: "/posts/[slug]" });
