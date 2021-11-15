import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../Graphql/Queries";

const Queries = ({ data, dataLoading }) => {
  if (dataLoading) return "Loading...";
  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>name : {item.name}</h1>
          <h1>username : {item.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default Queries;
