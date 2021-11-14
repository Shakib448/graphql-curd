import { GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import User from "../Entities/Users";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    return await User.create(args);
  },
};
