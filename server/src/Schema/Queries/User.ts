import { GraphQLList } from "graphql";
import { UserType } from "../TypeDefs/User";

export const GET_ALL_USER = {
  type: new GraphQLList(UserType),
  resolve() {
    return [];
  },
};
