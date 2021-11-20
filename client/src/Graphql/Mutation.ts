import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($name: String!, $username: String!, $password: String!) {
    createUser(name: $name, username: $username, password: $password) {
      id
      name
      username
      password
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($username: String! ,$oldPassword: String! ,$newPassword: String!) {
    updatePassword(username: $username ,oldPassword: $oldPassword ,newPassword: $newPassword
    ) {
      message
    }
  }
`;
