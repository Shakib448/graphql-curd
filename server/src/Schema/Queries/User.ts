import { GraphQLList } from "graphql";
import { UserType } from "../TypeDefs/User";
import User from "../Entities/Users";

export const GET_ALL_USER = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await User.find();
  },
};
