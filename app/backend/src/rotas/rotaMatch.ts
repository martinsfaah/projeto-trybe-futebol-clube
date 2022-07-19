import { Application as App } from 'express';
import validarMatches from '../middlewares/validarMatches';
import matchesController from '../controllers/matchesController';
// middleware validar token //

const rotaMatch = (app: App) => {
  app.get('/matches', matchesController.partidas);
  app.post(
    '/matches',
    validarMatches.validarTimesIguais,
    validarMatches.validarTimesExistentes,
    // validarMatches.validarToken,
    matchesController.criarPartida,
  );
  // post de '/matches' só pode ser criada com token JWT validado; //
  app.patch('/matches/:id/finish', matchesController.finalizarPartida);
  app.patch('/matches/:id', matchesController.atualizarPartida);
  // Requisito 28 //
};

export default rotaMatch;
