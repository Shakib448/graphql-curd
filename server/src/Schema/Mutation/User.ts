import { GraphQLString, GraphQLID } from "graphql";

import { UserType } from "../TypeDefs/User";
import { MessageType } from "./../TypeDefs/Messages";
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
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await User.findOne({ username: username });
    const userPassword = user?.password;

    if (!user) {
      throw new Error("No user found!");
    }

    if (oldPassword === userPassword) {
      user.username = username;
      user.password = newPassword;
      await user.save();
      return { successful: true, message: "Successfully updated the user!" };
    } else {
      throw new Error("Password do not match!");
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const user = await User.findById(args.id);
    if (user) {
      await user.remove();
      return { successful: true, message: "Successfully deleted the user!" };
    } else {
      return { successful: false, message: "No User was found!" };
    }
  },
};
