export interface IPisoPersistence {
    domainId: string;
    edificio: string;
    piso: string;
    descricao: string;
    passagens: Array<{ passagem: string }>;
    salas: Array<{ sala: string }>;
  }