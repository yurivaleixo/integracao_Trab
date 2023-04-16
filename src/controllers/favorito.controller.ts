import { FavoritoRepository } from '../data/favorito.repository';
import { Contato } from '../models/contato.model';
import { Request, Response } from "express";

const repository = new FavoritoRepository();

export class FavoritoController {
  async listar(request: Request, response: Response) {
    const contatos = await repository.listar();
    return response.status(200).json({
      message: "ok",
      data: contatos,
    });
  }

  async favoritar(request: Request, response: Response) {
    let contato: Contato = request.body;
    contato = await repository.favoritar(contato);
    return response.status(201).json({
      message: "Contato favoritado com sucesso!",
      data: contato,
    });
  }

  async desfavoritar(request: Request, response: Response) {
    let contato: Contato = request.body;
    let contatos = repository.desfavoritar(contato);
    return response.status(200).json({
      message: "Contato desfavoritado com sucesso!",
      data: contatos,
    });
  }
}