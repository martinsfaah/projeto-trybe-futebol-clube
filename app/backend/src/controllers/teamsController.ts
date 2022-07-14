import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import teamsService from '../services/teamsService';

const times = async (_req: Req, res: Res, next: Next) => {
  try {
    const teams = await teamsService.times();
    return res.status(200).json(teams);
  } catch (erro) {
    next(erro);
  }
};

const timesPorId = async (req: Req, res: Res, next: Next) => {
  try {
    const { id } = req.params;
    const time = await teamsService.timesPorId(Number(id));
    return res.status(200).json(time);
  } catch (erro) {
    next(erro);
  }
};

export default {
  times,
  timesPorId,
};
