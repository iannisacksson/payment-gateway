import express from "express";
import routes from "./routes";

const app = express();
const port = 3003;

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
