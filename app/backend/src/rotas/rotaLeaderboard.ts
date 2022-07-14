import { Application as App } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const rotaLeaderboard = (app: App) => {
  app.get('/leaderboard/home', leaderboardController.classificacao);
};

export default rotaLeaderboard;
