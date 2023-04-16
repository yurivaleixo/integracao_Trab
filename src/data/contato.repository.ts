import { Contato } from "../models/contato.model";
import { PrismaClient } from "@prisma/client";
import request from "request-promise";

let contato: Contato[] = [];

const prisma = new PrismaClient();

export class ContatoRepository {
  async listar(): Promise<Contato[]> {
    return await prisma.contato.findMany();
  }

  async cadastrar(contato: Contato): Promise<Contato> {
    var options = {
      url : 'https://viacep.com.br/ws/'+contato.cep+'/json/',
      method : 'GET',
      json: true
    }
    let response = await request(options)
    await prisma.contato.create({
      data: {
        isFavorito: false,
        nome: contato.nome,
        email: contato.email,
        cpf: contato.cpf,
        cep: contato.cep,
        numero: contato.numero,
        logradouro: response.logradouro.toString(),
        complemento: response.complemento.toString(),
        bairro: response.bairro.toString(),
        localidade : response.localidade.toString(),
        uf: response.uf.toString(),
        gia: response.gia.toString(),
        ddd: response.ddd.toString(),
        siafi: response.siafi.toString(),
      },
    });
    return contato;
  }

  async buscar(id: number): Promise<Contato | null> {
    return await prisma.contato.findUnique({
      where: {
        id: id,
      },
    });
  }

  deletar(id: number): Contato[] {
    const index = contato.findIndex((p) => p.id === id)!;
    if (index != -1) contato.splice(index, 1);
    return contato;
  }

  alterar(contato: Contato): Contato {
    const index = contato.findIndex((p) => p.id === contato.id)!;
    contato[index] = contato;
    return contato;
  }
}
