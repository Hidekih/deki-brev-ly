import api from "../config/api";

export interface DeleteShortUrl {
  shortUrlId: string;
}

export const deleteShortUrl = async ({ shortUrlId }: DeleteShortUrl) => {
  const res = await api.delete(`/short-urls/${shortUrlId}`);

  return res.data;
}