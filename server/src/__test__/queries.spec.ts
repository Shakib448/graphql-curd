import supertest from "supertest";
import { connectDB } from "../config/db";
import app from "../utils/server";

const request = supertest(app);

describe("Testing the queries", () => {
  afterAll(async () => {
    await connectDB();
  });

  it("fetch users", async () => {
    request
      .post("/graphql")
      .send({
        query: "{ getAllUsers{id, name, username, password} }",
      })
      .expect(200)
      .end(function (err, res) {
        res.body.data.getAllUsers.map((dt: any) => {
          expect(typeof dt.id).toBe("string");
          expect(typeof dt.name).toBe("string");
          expect(typeof dt.username).toBe("string");
          expect(typeof dt.password).toBe("string");
        });
        expect(res.body).toBeInstanceOf(Object);

        expect(res.body.data.getAllUsers.length).toEqual(4);
      });
  });
});
