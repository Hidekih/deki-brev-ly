import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Result } from "../../components/Result";
import { FRONTEND_URL } from "../../config/env";

export function NotFound() {
  return (
    <Card size="lg" p="lg">
      <Result
        image={<img src="/404.svg" alt="Not Found" className="h-16" />}
        title="Link não encontrado"
      >
        O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <Link to={FRONTEND_URL}>{FRONTEND_URL}</Link>.
      </Result>
    </Card>
  );
}
