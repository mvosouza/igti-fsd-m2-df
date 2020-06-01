import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const filePath = './src/data/grades.json';

router.post('/', async (req, res) => {
  try {
    const params = req.body;

    const rawData = await fs.readFile(filePath, 'utf8');
    const gradesFile = JSON.parse(rawData);
    const newGrade = {
      id: gradesFile.nextId++,
      ...params,
      timestamp: new Date(),
    };
    gradesFile.grades.push(newGrade);
    await fs.writeFile(filePath, JSON.stringify(gradesFile));

    res.status(201).send(newGrade);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
