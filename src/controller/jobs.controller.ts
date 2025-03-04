import { Request, Response } from "express";
import { getCurrencyCodes, getRates } from "../services/jobs.service";

export const currencyCode = async (req: Request, res: Response) => {
  try {
    await getCurrencyCodes();
    res.status(200).json({
      message: "Currency codes saved successfully",
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message || "Internal server error",
      status: 500,
    });
    return;
  }
};

export const updateRates = async (req: Request, res: Response) => {
  try {
    await getRates();
    res.status(200).json({
      message: "Currency rates saved successfully",
      status: 200,
    });
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
