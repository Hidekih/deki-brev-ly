import { CopyIcon, TrashIcon } from "@phosphor-icons/react";

import type { ShortUrl } from "../../interfaces/shortUrl";
import { IconButton } from "../IconButton";
import { Link } from "../Link";
import { Text } from "../Text";

interface Props {
  shortUrl: ShortUrl;
  baseUrl: string;
}

export const UrlCard = ({ baseUrl, shortUrl }: Props) => {
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
          <IconButton variant="secondary">
            <CopyIcon />
          </IconButton>

          <IconButton variant="secondary">
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}