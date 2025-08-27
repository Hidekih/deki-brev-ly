import api from '../config/api';

interface ExportShortUrlResponse {
  url: string;
}

export const exportShortUrl = async () => {
  const res = await api.post<ExportShortUrlResponse>('/short-urls/export', {});

  return res.data;
};
