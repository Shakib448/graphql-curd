import React from "react";

import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER } from "../Graphql/Mutation";
import { GET_ALL_USERS } from "../Graphql/Queries";

const User = (): JSX.Element => {
  const [deleteUser, { error: mutationError }] = useMutation(DELETE_USER);
  const { data, loading, error: queryError } = useQuery(GET_ALL_USERS);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (queryError) return <h1>Error!</h1>;
  if (mutationError) return <h1>An error has occurred!</h1>;
  return (
    <div>
      {data &&
        data.getAllUsers.map(
          (item: { id: string; name: string; username: string }) => (
            <div key={item.id}>
              <h1>name : {item.name} </h1>
              <h1>username : {item.username}</h1>
              <button
                onClick={() => deleteUser({ variables: { id: item.id } })}
              >
                Delete
              </button>
            </div>
          )
        )}
    </div>
  );
};

export default User;
