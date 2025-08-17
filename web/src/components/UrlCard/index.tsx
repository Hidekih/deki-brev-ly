import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";

import type { ShortUrl } from "../../interfaces/shortUrl";
import { Link } from "../Link";
import { Text } from "../Text";
import { IconButton } from "../IconButton";

interface Props {
  shortUrl: ShortUrl;
  baseUrl: string;
}

export const UrlCard = ({ shortUrl: defaultValues, baseUrl }: Props) => {
  const [shortUrl, setShortUrl] = useState<ShortUrl>(defaultValues);

  return (
    <div className="w-full flex flex-row py-4 border-t border-gray-200">
      <div className="w-full flex flex-col gap-1">
        <Link to={baseUrl + shortUrl.key}>
          {baseUrl}{shortUrl.key}
        </Link>

        <Text size="sm">{shortUrl.originalUrl}</Text>
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