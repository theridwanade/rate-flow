import { DateString, Rates } from "../lib/types";
import RatesModel from "../model/rates.model";

export const getLatestRates = async (base: string, symbols: string[]) => {
  try {
    const date = new Date().toISOString().split("T")[0] as DateString;
    const ratesDoc = await RatesModel.findOne({ base, date });
    const rates: Rates = JSON.parse(JSON.stringify(ratesDoc?.rates));
    if (symbols.length > 0) {
      const requestedRates: Rates = {};
      symbols.forEach((value, idx) => {
        requestedRates[value] = rates[value];
      });
      return {
        date: ratesDoc?.date,
        base: ratesDoc?.base,
        rates: requestedRates,
      };
    } else {
      return {
        date: ratesDoc?.date,
        base: ratesDoc?.base,
        rates: rates,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const getHistoricalRates = async (
  date: DateString,
  base: string,
  symbols: string[]
) => {
  try {
    const ratesDoc = await RatesModel.findOne({ base, date });
    const rates: Rates = JSON.parse(JSON.stringify(ratesDoc?.rates));
    if (symbols.length > 0) {
      const requestedRates: Rates = {};
      symbols.forEach((value, idx) => {
        requestedRates[value] = rates[value];
      });
      return {
        date: ratesDoc?.date,
        base: ratesDoc?.base,
        rates: requestedRates,
      };
    } else {
      return {
        date: ratesDoc?.date,
        base: ratesDoc?.base,
        rates: rates,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const doPairConversion = async (
  from: string,
  to: string,
  amount: number | null
) => {
  try {
    const rates = JSON.parse(
      JSON.stringify(await RatesModel.findOne({ base: from }))
    );
    if (amount) {
      return {
        date: rates?.date,
        base_code: rates?.base,
        target_code: to,
        conversion_rate: rates?.rates[to],
        conversion_result: rates?.rates[to] * amount,
      };
    } else {
      return {
        date: rates?.date,
        base_code: rates?.base,
        target_code: to,
        conversion_rate: rates?.rates[to],
      };
    }
  } catch (error) {
    throw error;
  }
};
