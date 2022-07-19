import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import matchesService from '../services/matchesService';
// import tokenAux from '../auxiliar/token';

const partidas = async (req: Req, res: Res, next: Next) => {
  try {
    const { inProgress } = req.params;
    const matches = await matchesService.partidas(inProgress as string);
    return res.status(200).json(matches);
  } catch (erro) {
    next(erro);
  }
};

const criarPartida = async (req: Req, res: Res, next: Next) => {
  try {
    const data = req.body;
    const novaPartida = await matchesService.criarPartida(data);
    return res.status(201).json(novaPartida);
  } catch (erro) {
    next(erro);
  }
};

const finalizarPartida = async (req: Req, res: Res, next: Next) => {
  try {
    const { id } = req.params;
    const message = await matchesService.finalizarPartida(Number(id));
    return res.status(200).json({ message });
  } catch (erro) {
    next(erro);
  }
};

const atualizarPartida = async (req: Req, res: Res, next: Next) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchesService.atualizarPartida(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json({ message: 'Partida atualizada' });
  } catch (erro) {
    next(erro);
  }
};

export default {
  partidas,
  criarPartida,
  finalizarPartida,
  atualizarPartida,
};
