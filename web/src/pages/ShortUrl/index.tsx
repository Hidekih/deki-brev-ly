import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Result } from "../../components/Result";
import { FRONTEND_URL } from "../../config/env";

export function ShortUrl() {
  // TODO Fetch the short URL from the backend and redirect to the corresponding page
  // TODO If the short URL does not exist, show a 404 page
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card>
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
