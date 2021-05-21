import { useCallback } from 'react';
import { useRouter } from 'next/router';
import stringify from 'qs-stringify';

export const RETURN_HREF_QUERY_PARAM = '_UCR_return_href';

export function useContextualRouting(): {
  returnHref: string | string[];
  makeContextualHref: (extraParams: any) => string;
} {
  const router = useRouter();
  const returnHrefQueryParam = router.query[RETURN_HREF_QUERY_PARAM];
  const watchedQuery = { ...router.query };
  delete watchedQuery[RETURN_HREF_QUERY_PARAM];

  const returnHref = returnHrefQueryParam ?? router.asPath;
  const queryHash = JSON.stringify(watchedQuery);
  const makeContextualHref = useCallback(
    (extraParams) =>
      `${router.pathname}?${stringify({
        ...router.query,
        ...extraParams,
        [RETURN_HREF_QUERY_PARAM]: returnHref,
      })}`,
    [queryHash, returnHref],
  );

  return { returnHref, makeContextualHref };
}
