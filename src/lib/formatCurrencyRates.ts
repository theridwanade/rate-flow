import { Rates } from "./types";

export const formatCurrencyRates = async (baseCode: string, rates: Rates) => {
  try {
    const formatedRates: Rates = {};
    const baseRates = rates[baseCode];
    for (const code in rates) {
      const ratesConversionResult = rates[code] / baseRates;
      formatedRates[code] = ratesConversionResult;
    }
    return formatedRates;
  } catch (error) {
    throw error;
  }
};
