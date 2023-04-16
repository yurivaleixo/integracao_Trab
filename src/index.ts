var api = process.argv[2];
if(api == undefined) api = 'contato'
else if(api != 'contato') api = 'favorito'
else api = 'contato'


import express from "express";
import { routerContato } from "./config/routes-contato";
import { routerFavorito } from "./config/routes-favorito";

const app = express();

app.use(express.json());
if(api == 'contato'){
  app.use(routerContato);
} else {
  app.use(routerFavorito);
}

app.listen(api == 'contato' ? 3000 : 3001, () => {
  console.clear();
  console.log("Aplicação de "+api+" rodando");
});
