export class User {
  Id?: number;
  Email?: string;
  Name?: string;
  Password?: string;
  Cpf?: string;
  Telefone?: string;
  Saldo: number = 5000.0;
  IsLogado: boolean = false;
  IsActive: boolean = true;
  CriadoEm?: Date;
  AtualizadoEm?: Date;
  DeletadoEm?: Date;
  NumeroConta?: string;
  Agencia?: number;
}
