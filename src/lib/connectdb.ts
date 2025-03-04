import { connect } from "mongoose";

const connectdb = async () => {
  try {
    const MONGODB_URI = String(process.env.MONGODB_URI);
    await connect(MONGODB_URI);
    console.log(`Database connected successfully!`);
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default connectdb;