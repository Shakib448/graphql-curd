import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

import { schema } from "../Schema";
import { connectDB } from "../config/db";

connectDB().catch((err) => {
  console.log(err);
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

export default app;
