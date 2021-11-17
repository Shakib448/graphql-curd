import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../Graphql/Mutation";

const UpdatePassword = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatePassword, { error, loading }] = useMutation(UPDATE_PASSWORD);

  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

  return (
    <div>
      <div className="createUser">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="old password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={() =>
            updatePassword({
              variables: {
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword,
              },
            })
          }
        >
          update password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
