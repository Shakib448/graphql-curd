import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../Graphql/Mutation";

const Queries = ({ data, dataLoading }: any) => {
  const [deleteUser, { error }] = useMutation(DELETE_USER);

  console.log(dataLoading);

  if (dataLoading) return "Loading...";
  if (error) return `Have some problem with ${error}`;

  return (
    <div>
      {data &&
        data.map((item: any) => (
          <div key={item.id}>
            <h1>
              name : {item.name} / {item.id}
            </h1>
            <h1>username : {item.username}</h1>
            <button onClick={() => deleteUser({ variables: { id: item.id } })}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Queries;
