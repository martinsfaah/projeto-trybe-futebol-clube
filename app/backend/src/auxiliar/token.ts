import { sign, verify, SignOptions } from 'jsonwebtoken';
// import * as dotenv from 'dotenv';
import IUser from '../interface/IUser';

const jwtKey = 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '3600h',
  algorithm: 'HS256',
};

const criarToken = (user: IUser) => {
  const { email, role } = user;
  const token = sign({ email, role }, jwtKey, jwtConfig);
  return token;
};

const decodificarToken = (token: string) => {
  const decoded = verify(token, jwtKey);
  return decoded;
};

export default {
  criarToken,
  decodificarToken,
};
