//Pega das variaveis passadas por parametro qual é a API que deve ser iniciada
//npm run dev favorito
//npm run dev contato
var api = process.argv[2];
if(api == undefined) api = 'contato'
else if(api != 'contato') api = 'favorito'
else api = 'contato'


import express from "express";
//Cria import de rotas
import { routerContato } from "./config/routes-contato";
import { routerFavorito } from "./config/routes-favorito";

const app = express();

app.use(express.json());
//Verifica qual é a API que deve ser inicida se é contato ou favorito
//Caso a API contato for iniciada a API de favorito não existirá no mesmo contexto
if(api == 'contato'){
  //se for contato inicia rota para contato
  app.use(routerContato);
} else {
  //se for favorito inicia rota para favorito
  app.use(routerFavorito);
}

//Inicia serviço node e se for contato abre a API na porta 3000 caso seja favorito inicia na porta 3001
app.listen(api == 'contato' ? 3000 : 3001, () => {
  console.clear();
  console.log("Aplicação de "+api+" rodando");
});
