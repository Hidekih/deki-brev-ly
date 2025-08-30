import { URL_WITH_SLASH } from "../../config/env";
import { useShortUrlList } from "../../hooks/useShortUrlList";
import type { ShortUrl } from "../../interfaces/shortUrl";
import { Button } from "../Button";
import { Result } from "../Result";
import { UrlCard } from "../UrlCard";

interface Props {
  list: Array<ShortUrl>;
};

export const ShortUrlList = ({ list }: Props) => {
  const { isFetchingNextPage, hasNextPage, fetchNextPage } = useShortUrlList();

  if (list == null || list.length === 0) {
    return (
      <div className="w-full mt-4 pt-8 pb-4 border-t border-gray-200">
        <Result image={<img src="/link.svg" alt="Logo Brev.ly" className="h-16" />}>
          AINDA NÃO EXISTEM LINKS CADASTRADOS
        </Result>
      </div>
    )
  }

  return (
    <div className="w-full mt-4">
      <ul className='w-full flex flex-col'>
        {list.map(shortUrl => (
          <li key={shortUrl.id} className='w-full'>
            <UrlCard baseUrl={URL_WITH_SLASH} shortUrl={shortUrl} />
          </li>
        ))}
      </ul>

      <Button
        className="w-full"
        variant="secondary"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Carregando...'
          : hasNextPage
            ? 'Carregar mais'
            : 'Todos os links foram carregados'}
      </Button>
    </div>
  )
};