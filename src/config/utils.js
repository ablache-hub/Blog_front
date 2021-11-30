import crypto from 'crypto-js';
// import Env from '../../env'

export const encryptData = (str) => {
  return crypto.AES.encrypt(
    JSON.stringify(str), process.env.REACT_APP_SALT
  ).toString();
}

export const decryptData = (cryptedStr) => {
  return JSON.parse(
    crypto.AES.decrypt(cryptedStr, process.env.REACT_APP_SALT)
      .toString(crypto.enc.Utf8));
}