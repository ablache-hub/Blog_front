import crypto from 'crypto-js';
import Env from './env'

export const encryptData = (str) => {
  return crypto.AES.encrypt(
    JSON.stringify(str), Env.secret.TOKEN_ENCRYPT
  ).toString();
}

export const decryptData = (cryptedStr) => {
  return JSON.parse(
    crypto.AES.decrypt(cryptedStr, Env.secret.TOKEN_ENCRYPT)
      .toString(crypto.enc.Utf8));
}