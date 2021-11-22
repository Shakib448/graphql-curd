import supertest from "supertest";
import { connectDB, stopDB } from "../config/db";
import User from "../Schema/Entities/Users";
import app from "../utils/server";

const request = supertest(app);

describe("Testing the queries", () => {
  beforeAll(async () => {
    await connectDB();
    await User.remove();
  });

  afterAll(async () => {
    await stopDB();
  });

  it("has a module", () => {
    expect(User).toBeDefined();
  });

  it("create user ", async () => {
    const req = request.post("/graphql").send({
      query:
        'mutation {createUser(name :"muktadir", username :"shakib", password :"password") { name username } }',
    });
    const res = await req;

    expect(typeof res.body.data.createUser.name).toBe("string");
    expect(typeof res.body.data.createUser.username).toBe("string");

    expect(res.statusCode).toBe(200);
  });

  it("user password update", async () => {
    const req = request.post("/graphql").send({
      query:
        'mutation {updatePassword(username: "shakib", oldPassword: "password", newPassword: "newPassword") { message } }',
    });
    const res = await req;

    expect(res.body.data.updatePassword.message).toBe(
      "Successfully updated the user!"
    );

    expect(res.statusCode).toBe(200);
  });

  it("fetch users", async () => {
    const req = request.post("/graphql").send({
      query: "query { getAllUsers{id, name, username, password} }",
    });

    const res = await req;

    res.body.data.getAllUsers.map((dt: any) => {
      expect(typeof dt.id).toBe("string");
      expect(typeof dt.name).toBe("string");
      expect(typeof dt.username).toBe("string");
      expect(typeof dt.password).toBe("string");
    });
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body.data.getAllUsers.length).toEqual(1);
  });
});
