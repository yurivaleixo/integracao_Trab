import { FavoritoRepository } from '../data/favorito.repository';
import { Contato } from '../models/contato.model';
import { Request, Response } from "express";

const repository = new FavoritoRepository();

export class FavoritoController {
  //Recebe a requisitção de listar todos os contatos favoritados
  async listar(request: Request, response: Response) {
    //chama o repositorio para buscar contatos favoritados
    const contatos = await repository.listar();
    //retorna para o usuário a lista de contatos
    return response.status(200).json({
      message: "ok",
      data: contatos,
    });
  }

  //Recebe a requisição para favoritar determinado contato
  async favoritar(request: Request, response: Response) {
    let contato: Contato = request.body;
    contato = await repository.favoritar(contato);
    return response.status(201).json({
      message: "Contato favoritado com sucesso!",
      data: contato,
    });
  }

  //Recebe a requisição de desfavoritar determinado contato
  async desfavoritar(request: Request, response: Response) {
    let contato: Contato = request.body;
    let contatos = repository.desfavoritar(contato);
    return response.status(200).json({
      message: "Contato desfavoritado com sucesso!",
      data: contatos,
    });
  }
}