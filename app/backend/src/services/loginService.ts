import { compareSync } from 'bcryptjs';
import User from '../database/models/user';

const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  const usuarioValidoComSenhaCorreta = user && compareSync(password, user.password);
  if (!usuarioValidoComSenhaCorreta) {
    return 'inválido';
  }
  return user;
};

export default {
  login,
};
