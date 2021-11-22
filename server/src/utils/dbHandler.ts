import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

const connect = async () => {
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();
  mongoose.connect(mongoUri, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// Remove and close the database and server.
const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

// Remove all data from collections
const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    collections[key].deleteMany({});
  }
};

export default {
  connect,
  close,
  clear,
};
function opts(
  mongoUri: string,
  opts: any,
  arg2: (err: mongoose.CallbackError) => void
) {
  throw new Error("Function not implemented.");
}
