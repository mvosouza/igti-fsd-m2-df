import express from 'express';

const port = 3000;
const app = express();

app.use(express.json());

app.get('/grades', (req, res) => {
  res.send('Recieved!');
});

app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error(err);
  }
});
