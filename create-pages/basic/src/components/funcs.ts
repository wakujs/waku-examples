'use server';

import { requestRedirect } from 'waku/router/server';

const PAGES = [
  '/bar',
  '/baz',
  '/nested/qux',
  '/nested/aaa',
  '/nested/bbb',
] as const;

// A redirect to the page it is called from would be a navigation loop.
export const jump = async (currentPath: string) => {
  const pages = PAGES.filter((page) => page !== currentPath);
  const page = pages[Math.floor(Math.random() * pages.length)]!;
  console.log(`Jumping to ${page}`);
  requestRedirect(page);
};
