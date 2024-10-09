import cryptosData from "../cryptos.json";
import { Crypto } from "../types/types";

export const fetchCryptos = async (): Promise<Crypto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptosData);
    }, 1000);
  });
};
