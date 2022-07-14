import { Application as App } from 'express';
import loginController from '../controllers/loginController';

const rotaLogin = (app: App) => {
  app.post('/login', loginController.fazerLogin);
  app.get('/login/validate', loginController.validar);
};

export default rotaLogin;
