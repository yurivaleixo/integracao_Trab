import express from "express";
import { router } from "./config/routes";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", function(req, res) {
  res.send("Resposta da Home");
})


app.listen(3000, () => {
  console.clear();
  console.log("Aplicação de produtos rodando na porta 3000");
});
