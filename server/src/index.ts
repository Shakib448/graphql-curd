import app from "./utils/server";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server responding http://localhost:${PORT}`);
});
