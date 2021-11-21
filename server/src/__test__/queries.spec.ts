import { query } from "express";
import supertest from "supertest";
import app from "../utils/server";

const request = supertest(app);

describe("Testing the queries", () => {
  it("fetch users", async (done) => {
    request
      .post("/graphql")
      .send({ query: "{getAllUsers {name username}}" })
      .expect(200);
    done();
  });
});
