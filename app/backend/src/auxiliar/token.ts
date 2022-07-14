import { sign, verify, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import IUser from '../interface/IUser';

// require('dotenv').config();
const jwtSecret = 'jwt_secret';


const jwtKey = fs
  .readFileSync(jwtSecret, { encoding: 'utf-8' })
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

const decodificarToken = (token: string) => {
  const decoded = verify(token, jwtKey);
  return decoded;
};

export default {
  criarToken,
  decodificarToken,
};
