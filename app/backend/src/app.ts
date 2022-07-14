import * as express from 'express';
import rotaLogin from './rotas/rotaLogin';
import rotaTeams from './rotas/rotaTeams';
import rotaMatch from './rotas/rotaMatch';
import rotaLeaderboard from './rotas/rotaLeaderboard';

class App {
  public app: express.Express;
  public login = rotaLogin;
  public teams = rotaTeams;
  public match = rotaMatch;
  public leaderboard = rotaLeaderboard;

  constructor() {
    this.app = express();

    this.config();

    this.login(this.app);
    this.teams(this.app);
    this.match(this.app);
    this.leaderboard(this.app);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
