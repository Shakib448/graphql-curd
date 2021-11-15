import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD } from "./Mutation/User";
import { GET_ALL_USER } from "./Queries/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: { getAllUsers: GET_ALL_USER },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePassword: UPDATE_PASSWORD,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
