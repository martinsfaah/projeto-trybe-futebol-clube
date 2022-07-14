import IMatches from '../interface/IMatches';
import Match from '../database/models/match';
import Team from '../database/models/team';

const include = [
  { model: Team, as: 'teamAway', attributes: ['teamName'] },
  { model: Team, as: 'teamHome', attributes: ['teamName'] },
];

const partidas = async (inProgress: string) => {
  if (!inProgress) {
    const matches = await Match.findAll({ include });
    return matches;
  }
  const matches = await Match.findAll({ where: { inProgress } });
  return matches;
};

const criarPartida = async (data: IMatches) => {
  const novaPartida = await Match.create(data);
  return novaPartida;
};

const finalizarPartida = async (id: number) => {
  await Match.update({ inProgress: false }, { where: { id } });
  return 'Finished';
};

const atualizarPartida = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
};

export default {
  partidas,
  criarPartida,
  finalizarPartida,
  atualizarPartida,
};
