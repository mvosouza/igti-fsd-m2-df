import express from 'express';
import gradesRouter from './routes/grades.js';

const port = 3000;
const app = express();

app.use(express.json());

//Routes
app.use('/grades', gradesRouter);

app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error(err);
  }
});
