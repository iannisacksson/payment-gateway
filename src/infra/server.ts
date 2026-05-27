import { Database } from './database/sequelize';
import express from 'express';
import { router } from './routes';

const app = express();
const port = 3003;
Database.getInstance(); // Initialize the database connection
app.use(express.json());

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
