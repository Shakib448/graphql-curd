import supertest from "supertest";
import app from "../utils/server";
import testDB from "../utils/dbHandler";

const request = supertest(app);

beforeAll(async () => await testDB.connect());
// beforeEach(async () => await testDB.clear());
afterAll(async () => await testDB.close());
describe("Testing the queries", () => {
  it("fetch users", async () => {
    const req = request
      .post("/graphql")
      .send({
        query: "query { getAllUsers{id, name, username, password} }",
      })
      .send([
        { id: "1", name: "shakib", username: "muktadir", password: "password" },
      ]);
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

  it("user password update", async () => {
    const req = request.post("/graphql").send({
      query:
        'mutation {updatePassword(username: "shakib", oldPassword: "shakib", newPassword: "newPassword") { message } }',
    });
    const res = await req;

    expect(res.body.data.updatePassword.message).toBe(
      "Successfully updated the user!"
    );

    expect(res.statusCode).toBe(200);
  });
});
