import { Document, model, Schema } from "mongoose";
import { DateString } from "../lib/types";



interface IRates extends Document {
  date: DateString;
  base: string;
  rates: Record<string, number>
};


const ratesModelSchema = new Schema<IRates>({
  date: {
    type: String,
    required: true,
  },
  base: {
    type: String,
    required: true,
  },
  rates: {
    type: Map,
    required: true,
  }
});

const RatesModel = model<IRates>("Rates", ratesModelSchema);
export default RatesModel;
