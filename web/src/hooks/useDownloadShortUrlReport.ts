import { useState } from 'react';
import { exportShortUrl } from '../http/exportShortUrl';

export const useDownloadShortUrlReport = () => {
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const handleDownloadShortUrlReport = async () => {
    try {
      setIsLoadingReport(true);

      const { url } = await exportShortUrl();

      const a = document.createElement('a');
      a.href = url;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
    } finally {
      setIsLoadingReport(false);
    }
  };

  return {
    isLoadingReport,
    handleDownloadShortUrlReport,
  };
};
