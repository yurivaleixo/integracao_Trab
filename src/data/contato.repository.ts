import { Contato } from "../models/contato.model";
import { PrismaClient } from "@prisma/client";
import request from "request-promise";

let contato: Contato[] = [];

const prisma = new PrismaClient();

export class ContatoRepository {
  //Busca no banco todos os contatos
  async listar(): Promise<Contato[]> {
    return await prisma.contato.findMany();
  }

  //Cadastra contato
  async cadastrar(contato: Contato): Promise<Contato> {
    //Constroi options para chamada de serviço em API externa
    var options = {
      url : 'https://viacep.com.br/ws/'+contato.cep+'/json/',
      method : 'GET',
      json: true
    }
    //Chama serviço externo
    let response = await request(options)
    //Cadastra contato em banco
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

  //Busca no banco o id de um contato especifico
  async buscar(id: number): Promise<Contato | null> {
    return await prisma.contato.findUnique({
      where: {
        id: id,
      },
    });
  }

  //Apaga no banco o conatato do ID passado pelo serviço
  deletar(id: number): Contato[] {
    const index = contato.findIndex((p) => p.id === id)!;
    if (index != -1) contato.splice(index, 1);
    return contato;
  }


  async alterar(contato: Contato | null): Promise<Contato | null> {
    try {
      const contatoAlterado = await prisma.contato.update({
        where: {
          id: contato?.id,
        },
        data: {
          nome: contato?.nome,
          isFavorito: contato?.isFavorito,
          email: contato?.email,
          cpf: contato?.cpf,
          cep: contato?.cep,
        },
      });
      return contato;
    } catch {
      return null;
    }
  }

  //Altera os dados de um contato
  //alterar(contato: Contato): Contato {
    //const index = contato.findIndex((p) => p.id === contato.id)!;
    //contato[index] = contato;
    //return contato;
  //}
}
