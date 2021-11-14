import { connect } from "mongoose";

const dbURL = "mongodb://localhost:27017/GraphqlCURD";

export async function connectDB(): Promise<void> {
  await connect(dbURL);
}
