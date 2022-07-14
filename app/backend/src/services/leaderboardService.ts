import calculoPlacar from '../auxiliar/calculoPlacar';
import Match from '../database/models/match';

interface ITime {
  id: number,
  teamName: string,
}

const linhaDaTabela = async (time: ITime) => {
  const partidasDoTime = await Match.findAll({ where: { homeTeam: time.id, inProgress: false } });
  const calculoPontosPorPartida = calculoPlacar.totalDePontos(partidasDoTime);
  const gols = calculoPlacar.gols(partidasDoTime);
  const totalPontos = calculoPontosPorPartida.total;
  const aproveitamento = calculoPlacar.aproveitamento(totalPontos, partidasDoTime.length);
  const linha = {
    name: time.teamName,
    totalPoints: totalPontos,
    totalGames: partidasDoTime.length,
    totalVictories: calculoPontosPorPartida.vitorias,
    totalDraws: calculoPontosPorPartida.empates,
    totalLosses: calculoPontosPorPartida.derrotas,
    goalsFavor: gols.golsFavor,
    goalsOwn: gols.golsContra,
    goalsBalance: gols.saldo,
    efficiency: aproveitamento,
  };
  return linha;
};

export default {
  linhaDaTabela,
};
