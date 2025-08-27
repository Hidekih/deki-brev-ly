import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useCallback } from "react";

import { useShortUrlList } from "../../hooks/useShortUrlList";
import { deleteShortUrl } from "../../http/deleteShortUrl";
import type { ShortUrl } from "../../interfaces/shortUrl";
import { IconButton } from "../IconButton";
import { Link } from "../Link";
import { Text } from "../Text";

interface Props {
  shortUrl: ShortUrl;
  baseUrl: string;
}

export const UrlCard = ({ baseUrl, shortUrl }: Props) => {
  const { refetch } = useShortUrlList();

  const copyShortUrlToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(baseUrl + shortUrl.name);
    } catch (err) {
      console.error(err);
    }
  }, [baseUrl, shortUrl.name]);

  const handleDeleteShortUrl = useCallback(async () => {
    try {
      await deleteShortUrl({ shortUrlId: shortUrl.id });
      await refetch();
    } catch (err) {
      console.error(err);
    }
  }, [refetch, shortUrl.id]);

  return (
    <div className="w-full flex flex-row py-4 border-t border-gray-200 overflow-hidden">
      <div className="w-full flex flex-col gap-1 overflow-hidden">
        <Link className="line-clamp-1 whitespace-normal" to={baseUrl + shortUrl.name}>
          {baseUrl + shortUrl.name}
        </Link>

        <Text className="line-clamp-1" size="sm">{shortUrl.originalUrl}</Text>
      </div>

      <div className="flex flex-row items-center gap-5">
        <Text size="sm" className="whitespace-nowrap">
          {shortUrl.accessCount} {shortUrl.accessCount === 1 ? " acesso" : " acessos"}
        </Text>

        <div className="flex flex-row items-center gap-1">
          <IconButton aria-label="Copiar link encurtado" variant="secondary" onClick={copyShortUrlToClipboard}>
            <CopyIcon />
          </IconButton>

          <IconButton aria-label="Deletar link encurtado" variant="secondary" onClick={handleDeleteShortUrl}>
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}