import axios from "axios";
import fsPromise from "fs/promises";
import path from "path";
import { DateString, Rates } from "../lib/types";
import { formatCurrencyRates } from "../lib/formatCurrencyRates";
import RatesModel from "../model/rates.model";

export const getCurrencyCodes = async () => {
  try {
    const response = await axios.get(
      `${process.env.OER_BASE_URL}/currencies.json`
    );
    const currencyCodes = JSON.stringify(response.data, null, 4);
    const currenciesCodeFilePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "api",
      "currencies.json"
    );
    await fsPromise.writeFile(currenciesCodeFilePath, currencyCodes);
  } catch (error) {
    throw error;
  }
};

export const getRates = async () => {
  try {
    const response = await axios.get(
      `${process.env.OER_BASE_URL}/latest.json?app_id=${process.env.OER_API_KEY}`
    );
    const date = new Date().toISOString().split("T")[0] as DateString;
    const rates: Rates = response.data.rates;
    for (const currencyCodes in rates) {
      const formatedRates = await formatCurrencyRates(currencyCodes, rates);
      await RatesModel.updateOne({date, base: currencyCodes}, {rates: formatedRates}, {upsert: true})
    }
    console.log(date);
  } catch (error) {
    throw error;
  }
};
