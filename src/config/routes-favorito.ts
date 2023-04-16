import { Router } from "express";
import { FavoritoController } from "../controllers/favorito.controller";

const routerFavorito: Router = Router();

//Produto
routerFavorito.get("/favorito", new FavoritoController().listar);
routerFavorito.post("/favorito", new FavoritoController().favoritar);
routerFavorito.delete("/favorito", new FavoritoController().desfavoritar);

export { routerFavorito };
