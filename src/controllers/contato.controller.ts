import { ContatoRepository } from '../data/contato.repository';
import { Contato } from '../models/contato.model';
import { Request, Response } from "express";

const repository = new ContatoRepository();

export class ContatoController {
  async listar(request: Request, response: Response) {
    const contatos = await repository.listar();
    return response.status(200).json({
      message: "ok",
      data: contatos,
    });
  }

  async cadastrar(request: Request, response: Response) {
    let contato: Contato = request.body;

    contato = await repository.cadastrar(contato);

    return response.status(201).json({
      message: "Contato cadastrado!",
      data: contato,
    });
  }

  async buscar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);

    const contato = await repository.buscar(id);

    if (!contato) {
      return response.status(404).json({ message: "Contato não encontrado" });
    }

    return response.status(200).json({
      message: "ok",
      data: contato,
    });
  }

  deletar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);
    let contatos = repository.deletar(id);
    return response.status(200).json({
      message: "ok",
      data: contatos,
    });
  }

  alterar(request: Request, response: Response) {
    let contato: Contato = request.body;
    contato = repository.alterar(contato);

    return response.status(200).json({
      message: "ok",
      data: contato,
    });
  }
}