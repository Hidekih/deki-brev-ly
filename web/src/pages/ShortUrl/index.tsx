import { useEffect } from "react";
import { redirect, useParams } from "react-router";

import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Result } from "../../components/Result";
import { FRONTEND_URL, env } from "../../config/env";

export function ShortUrl() {
  const params = useParams();
  const shortUrlId = params["short-url"];

  useEffect(() => {
    const fetchShortUrl = async (id: string) => {
      try {
        window.location.replace(`${env.BACKEND_URL}/short-urls/${id}`)
      } catch {
        redirect('/404');
      }
    };

    if (shortUrlId == null) return;

    fetchShortUrl(shortUrlId);
  }, [shortUrlId])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card size="lg" p="lg">
        <Result
          image={<img src="/brevly.svg" alt="Logo Brev.ly" className="h-16" />}
          title="Redirecionando..."
        >
          O link será aberto automaticamente em alguns instantes. <br />
          Não foi redirecionado? <Link to={FRONTEND_URL}>Acesse aqui</Link>
        </Result>
      </Card>
    </div>
  )
}
