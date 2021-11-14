import { GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    const { name, username, password } = args;
    return args;
  },
};
