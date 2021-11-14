import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";

const PORT = process.env.PORT || 5000;

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  //   app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

  app.listen(PORT, () => {
    console.log(`Server responding http://localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.log(error);
});