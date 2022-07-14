import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import Match from '../database/models/match';

const validarTimesIguais = async (req: Req, res: Res, next: Next) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  next();
};

const validarTimesExistentes = async (req: Req, res: Res, next: Next) => {
  const { homeTeam, awayTeam } = req.body;
  const findHomeTeam = await Match.findOne({ where: { id: homeTeam } });
  const findAwayTeam = await Match.findOne({ where: { id: awayTeam } });

  if (!findHomeTeam || !findAwayTeam) {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }

  next();
};

export default {
  validarTimesIguais,
  validarTimesExistentes,
};
