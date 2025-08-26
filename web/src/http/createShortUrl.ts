import api from '../config/api';

export interface CreateShortUrl {
  name: string;
  originalUrl: string;
}

export const createShortUrl = async (data: CreateShortUrl) => {
  const res = await api.post('/short-urls', data);

  return res.data;
};
