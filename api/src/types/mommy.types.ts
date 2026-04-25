// Tipo para cadastro de mamãe
// Tipo para conta de mamãe
// Tipo para login de mamãe
// Tipo para atualizar dados de mamãe

export interface MommyCreate {
  name: string;
  username: string;
  email: string;
  cpf: string;
  password: string;
}

export interface MommyAccount {
  id: string;
  name: string;
  email: string;
  username: string;
  cpf: string;
  createdAt: Date;
}

// Campos não obrigatórios para atualizar
export interface MommyUpdate {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}