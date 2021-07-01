import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

/**
 * Checks if a route is a protected page and renders child component if session.user exists.
 * If session.user is null, redirects to '/auth/login'.
 *
 * Takes an optional prop 'auth' object for loader and unauthorizedRedirect.
 * 
 * Ex.
 * auth: {
 *  loader: \<LoadingSpinner\/>,
 *  unauthorizedRedirect: '/other/redirect/router'
 * }
 *
 * @export
 * @param {*} { children } - Children prop
 * @param {object} { auth.loader }  - React component or JSX
 * @param {string} { auth.unauthorizedRedirect }  - url pathname
 * @returns If no user or user is unauthorized, redirects to login or redirect param. 
 * Returns a loading component if loading. If user session is true, returns children.
 */

export default function RequireAuth({ children, auth }) {
  const router = useRouter();
  const [session, loading] = useSession();
  const hasUser = !!session?.user;

  const { loader, unauthorizedRedirect } = auth;

  useEffect(() => {
    if (!loading && !hasUser) {
      unauthorizedRedirect
        ? router.push(`${unauthorizedRedirect}?callbackUrl=${router.asPath}`)
        : router.push(`/auth/login?callbackUrl=${router.asPath}`);
    }
  }, [loading, hasUser]);

  if (loading || !hasUser) {
    return loader || <div>Loading....</div>;
  }

  return children;
}
