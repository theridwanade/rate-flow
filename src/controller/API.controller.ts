import { Request, Response } from "express";
import { doPairConversion, getHistoricalRates, getLatestRates } from "../services/API.service";
import { DateString } from "../lib/types";

export const latestRates = async (req: Request, res: Response) => {
  try {
    const base =
      req.query.base && String(req.query.base).trim()
        ? String(req.query.base).toUpperCase()
        : "USD";
    const symbols = req.query.symbols
      ? String(req.query.symbols).toUpperCase().split(",")
      : [];
    const rates = await getLatestRates(base, symbols);
    res.status(200).json(rates);
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message || "Internal server error",
      status: 500,
    });
    return;
  }
};

export const historicalRates = async (req: Request, res: Response) => {
  try {
    const date: DateString = req.params.date as DateString;
    const base =
      req.query.base && String(req.query.base).trim()
        ? String(req.query.base).toUpperCase()
        : "USD";
    const symbols = req.query.symbols
      ? String(req.query.symbols).toUpperCase().split(",")
      : [];
    const rates = await getHistoricalRates(date, base, symbols);
    res.status(200).json(rates);
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message || "Internal server error",
      status: 500,
    });
    return;
  }
};

export const pairRatesConversion = async (req: Request, res: Response) => {
  try {
    const from =
      typeof req.query.from === "string" && req.query.from.trim() !== ""
        ? req.query.from.toUpperCase()
        : "USD";
    const to =
      typeof req.query.to === "string" && req.query.to.trim() !== ""
        ? req.query.to.toUpperCase()
        : "NGN";
    const amount =
      typeof req.query.amount === "string" && !isNaN(Number(req.query.amount))
        ? Number(req.query.amount)
        : null;
        const result = await doPairConversion(from, to, amount);
        res.status(200).json(result);
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message || "Internal server error",
      status: 500,
    });
    return;
  }
};
