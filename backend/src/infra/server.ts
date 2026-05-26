import "../infra/database";
import express from "express";
import { router } from "./routes";

const app = express();
const port = 3003;
app.use(express.json());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
