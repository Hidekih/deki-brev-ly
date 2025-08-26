import api from '../config/api';
import type { ShortUrl } from '../interfaces/shortUrl';

export interface ReadListShortUrlsParams {
  pageSize?: number;
  pageParam?: string;
}

export interface ReadListShortUrlsResponse {
  total: number;
  nextCursor?: string;
  list: Array<ShortUrl>;
}

export const readListShortUrls = async ({
  pageParam,
  pageSize = 10,
}: ReadListShortUrlsParams) => {
  const res = await api.get<ReadListShortUrlsResponse>('/short-urls', {
    params: { cursor: pageParam, pageSize },
  });

  return res.data;
};
