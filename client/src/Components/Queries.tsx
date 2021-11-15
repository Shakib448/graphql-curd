const Queries = ({ data, dataLoading }: any) => {
  if (dataLoading) return "Loading...";
  return (
    <div>
      {data &&
        data.map((item: any) => (
          <div key={item.id}>
            <h1>name : {item.name}</h1>
            <h1>username : {item.username}</h1>
          </div>
        ))}
    </div>
  );
};

export default Queries;
