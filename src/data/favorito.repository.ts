import { Contato } from "../models/contato.model";
import { PrismaClient } from "@prisma/client";

let contato: Contato[] = [];

const prisma = new PrismaClient();

export class FavoritoRepository {
  async listar(): Promise<Contato[]> {
    return await prisma.contato.findMany({
      where: {
        isFavorito: true,
      },
    });
  }

  async favoritar(contato: Contato): Promise<Contato> {
    await prisma.contato.update({
      where: { id: contato.id },
      data: {
        isFavorito: true
      },
    });
    return contato;
  }

  async desfavoritar(contato: Contato): Promise<Contato[]> {
    await prisma.contato.update({
      where: { id: contato.id },
      data: {
        isFavorito: false
      },
    });
    return contato;
  }

}
