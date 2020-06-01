import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const filePath = './src/data/grades.json';

//Functions
const readFileAsJson = async (file) => {
  const rawData = await fs.readFile(file, 'utf8');
  return JSON.parse(rawData);
};

/************
 *  Routes  *
 ************/

//Item 01
router.post('/', async (req, res) => {
  try {
    const params = req.body;

    const gradesFile = await readFileAsJson(filePath);
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

//Item 02
router.put('/', async (req, res) => {
  try {
    const params = req.body;

    const gradesFile = await readFileAsJson(filePath);
    const index = gradesFile.grades.findIndex(
      (grade) => grade.id === parseInt(params.id, 10)
    );

    if (index == -1) {
      res.status(404).send();
      return;
    }
    gradesFile.grades[index] = { ...params, timestamp: new Date() };
    await fs.writeFile(filePath, JSON.stringify(gradesFile));
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
