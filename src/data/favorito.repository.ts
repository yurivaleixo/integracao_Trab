import { Contato } from './../models/contato.model';
import { PrismaClient } from "@prisma/client";

let contato: Contato[] = [];

const prisma = new PrismaClient();

export class FavoritoRepository {
  //Busca no banco todos os contatos que foram favoritados
  async listar(): Promise<Contato[]> {
    //Faz uma busca no banco por todos os contatos como favorito = true
    return await prisma.contato.findMany({
      where: {
        isFavorito: true,
      },
    });
  }

  //Altera no banco para true o campo isFavorito pelo id passado pelo serviço 
  async favoritar(contato: Contato): Promise<Contato> {
    await prisma.contato.update({
      where: { id: contato.id },
      data: {
        isFavorito: true
      },
    });
    return contato;
  }

  //Altera no banco para false o campo isFavorito pelo id passado pelo serviço 

  async desfavoritar(contato: Contato | null): Promise<Contato | null> {
    try {
      const contatoAlterado = await prisma.contato.update({
        where: {
          id: contato?.id,
        },
        data: {
          isFavorito: false
        },
      });
      return contato;
    } catch {
      return null;
    }
  }



  //async desfavoritar(contato: Contato): Promise<Contato[]> {
    //await prisma.contato.update({
      //where: { id: contato.id },
      //data: {
        //isFavorito: false
      //},
    //});
    //return contato;
  //}

}
