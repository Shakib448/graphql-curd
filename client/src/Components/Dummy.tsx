import { gql, useMutation } from "@apollo/client";

export const DELETE_DOG_MUTATION = gql`
  mutation deleteDog($name: String!, $breed: String!) {
    deleteDog(name: $name, breed: $breed) {
      name
      breed
    }
  }
`;

export function DeleteButton() {
  const [mutate, { loading, error, data }] = useMutation(DELETE_DOG_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) return <p>Success!</p>;

  return (
    <button
      onClick={() => mutate({ variables: { name: "Buck", breed: "Breed" } })}
    >
      Update password
    </button>
  );
}
