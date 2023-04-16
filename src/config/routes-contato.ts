import { Router } from "express";
import { ContatoController } from "../controllers/contato.controller";

const routerContato: Router = Router();

//Produto
routerContato.get("/contato", new ContatoController().listar);
routerContato.get("/contato/:id", new ContatoController().buscar);
routerContato.post("/contato", new ContatoController().cadastrar);
routerContato.delete("/contato/:id", new ContatoController().deletar);
routerContato.put("/contato", new ContatoController().alterar);

export { routerContato };
