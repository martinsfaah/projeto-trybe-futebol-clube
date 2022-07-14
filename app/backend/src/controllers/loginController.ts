import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import loginService from '../services/loginService';
import tokenAux from '../auxiliar/token';
import IUser from '../interface/IUser';
import User from '../database/models/user';

const gerarResposta = (user: User) => {
  const resposta = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  };
  return resposta;
};

const fazerLogin = async (req: Req, res: Res, next: Next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const user = await loginService.login(email, password);
    if (user === 'inválido') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = tokenAux.criarToken(user as IUser);
    const resposta = { user: gerarResposta(user), token };
    return res.status(200).json(resposta);
  } catch (erro) {
    next(erro);
  }
};

const validar = (req: Req, res: Res, _next: Next) => {
  try {
    const autorizacao = req.headers.authorization;
    const user = tokenAux.decodificarToken(autorizacao as string);
    const expectedResult = { role: (user as IUser).role };
    return res.status(200).json(expectedResult);
  } catch (erro) {
    return res.status(401).json(erro);
  }
};

export default {
  fazerLogin,
  validar,
};
