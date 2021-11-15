import React from "react";
import Queries from "../src/Components/Queries";
import { GET_ALL_USERS } from "../src/Graphql/Queries";
import { client } from "./_app";

const newUser = ({ data, dataLoading }) => {
  return <Queries data={data} dataLoading={dataLoading} />;
};

export default newUser;

export async function getStaticProps() {
  const { data, loading } = await client.query({
    query: GET_ALL_USERS,
  });

  return {
    props: {
      data: data.getAllUsers,
      dataLoading: loading,
    },
  };
}
