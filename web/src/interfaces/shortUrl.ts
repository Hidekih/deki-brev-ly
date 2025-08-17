export interface ShortUrl {
  id: string;
  key: string; // Assuming 'key' is a unique identifier for the short URL
  originalUrl: string;
  accessCount: number;
  createdAt: string;
}
