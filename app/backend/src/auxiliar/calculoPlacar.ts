import IMatches from '../interface/IMatches';

const totalDePontos = (partidasDoTime: IMatches[]) => {
  const vitorias = partidasDoTime.reduce((acc, cur) => {
    if (cur.homeTeamGoals > cur.awayTeamGoals) {
      return acc + 1;
    } return acc;
  }, 0);
  const derrotas = partidasDoTime.reduce((acc, cur) => {
    if (cur.homeTeamGoals < cur.awayTeamGoals) {
      return acc + 1;
    } return acc;
  }, 0);
  const empates = partidasDoTime.reduce((acc, cur) => {
    if (cur.homeTeamGoals === cur.awayTeamGoals) {
      return acc + 1;
    } return acc;
  }, 0);
  const total = (vitorias * 3) + empates;

  return { vitorias, derrotas, empates, total };
};

const aproveitamento = (p: number, j: number) => {
  const apr = ((p / (j * 3)) * 100).toFixed(2);
  return Number(apr);
};

const gols = (partidasDoTime: IMatches[]) => {
  const golsFavor = partidasDoTime.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  const golsContra = partidasDoTime.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  const saldo = golsFavor - golsContra;

  return { golsFavor, golsContra, saldo };
};

export default {
  totalDePontos,
  aproveitamento,
  gols,
};
