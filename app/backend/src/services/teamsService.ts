import Team from '../database/models/team';

const times = async () => {
  const teams = await Team.findAll();
  return teams;
};

const timesPorId = async (id: number) => {
  const team = await Team.findOne({ where: { id } });
  return team;
};
export default {
  times,
  timesPorId,
};
