import { Application as App } from 'express';
import loginController from '../controllers/loginController';

const rotaLogin = (app: App) => {
  app.post('/login', loginController.fazerLogin);
};

export default rotaLogin;
