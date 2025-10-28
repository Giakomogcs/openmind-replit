export class CreateConnectionDto {
  nomeAmigavel: string;
  adapterUrl: string;
  credentials?: {
    user?: string;
    password?: string;
  };
}
