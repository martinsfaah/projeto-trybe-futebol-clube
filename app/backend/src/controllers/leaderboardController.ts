import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import leaderboardService from '../services/leaderboardService';
import teamsService from '../services/teamsService';

interface ITeam {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

const sortCallback = (timeA: ITeam, timeB: ITeam) => timeB.totalPoints - timeA.totalPoints
|| timeB.goalsBalance - timeA.goalsBalance
|| timeB.goalsFavor - timeA.goalsFavor
|| timeA.goalsOwn - timeB.goalsOwn;

const classificacao = async (_req: Req, res: Res, next: Next) => {
  try {
    const times = await teamsService.times();
    const tabela = await Promise.all(times.map(((time) => leaderboardService.linhaDaTabela(time))));
    const tabelaOrdenada = tabela.sort(sortCallback);

    return res.status(200).json(tabelaOrdenada);
  } catch (erro) {
    next(erro);
  }
};

export default {
  classificacao,
};
