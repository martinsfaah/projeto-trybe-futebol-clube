import { sign, verify, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import IUser from '../interface/IUser';

const jwtKey = fs
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

const jwtConfig: SignOptions = {
  expiresIn: '3600h',
  algorithm: 'HS256',
};

const criarToken = (user: IUser) => {
  const { email, role } = user;
  const token = sign({ email, role }, jwtKey, jwtConfig);
  return token;
};

export default {
  criarToken,
};
