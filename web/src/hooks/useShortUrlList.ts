import { useContext } from 'react';
import { ShortUrlListContext } from '../context/shortUrlList.context';

export const useShortUrlList = () => {
  const context = useContext(ShortUrlListContext);

  if (!context) {
    throw new Error(
      'useShortUrlList must be used within a ShortUrlListProvider'
    );
  }

  return context;
};
