/* eslint-disable react-refresh/only-export-components */
import { useInfiniteQuery } from '@tanstack/react-query'
import { createContext } from "react";

import { readListShortUrls } from '../http/readListShortUrls';
import type { ShortUrl } from "../interfaces/shortUrl";

interface ShortUrlListContextProps {
  shortUrls: Array<ShortUrl>;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  refetch: () => Promise<unknown>;
}

export const ShortUrlListContext = createContext<ShortUrlListContextProps | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ShortUrlListProvider = ({ children }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['shortUrls'],
    queryFn: readListShortUrls,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined
  });

  const shortUrls = data?.pages.flatMap(page => page.list) ?? [];

  return (
    <ShortUrlListContext.Provider value={{ shortUrls, fetchNextPage, isFetchingNextPage, hasNextPage, refetch }}>
      {children}
    </ShortUrlListContext.Provider>
  );
};
