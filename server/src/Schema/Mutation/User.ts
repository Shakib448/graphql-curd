import { GraphQLString, GraphQLID } from "graphql";
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

export const UPDATE_PASSWORD = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await User.findOne({ username: username });
    const userPassword = user?.password;

    if (oldPassword === userPassword) {
      user.username = username;
      user.password = newPassword;

      const updateUser = await user.save();
      return updateUser;
    } else {
      throw new Error("Password do not match!");
    }
  },
};

export const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const user = await User.findById(args.id);
    if (user) {
      const removeUser = await user.remove();
      return removeUser;
    }
  },
};
