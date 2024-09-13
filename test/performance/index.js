import express from 'express';
import path from 'path';
import { sortPerformance, sortByPerformance } from './performanceTest.js';

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'tests.html'));
});

app.get('/test/sort', (req, res) => {
  const str = sortPerformance();
  res.send(str);
});

app.get('/test/sortby', (req, res) => {
  const str = sortByPerformance();
  res.send(str);
});

// eslint-disable-next-line no-console
app.listen(3030, 'localhost', () => console.log('Listening on localhost:3030'));
