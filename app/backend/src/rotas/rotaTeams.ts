import { Application as App } from 'express';
import teamsController from '../controllers/teamsController';

const rotaTeams = (app: App) => {
  app.get('/teams', teamsController.times);
  app.get('/teams/:id', teamsController.timesPorId);
};

export default rotaTeams;
