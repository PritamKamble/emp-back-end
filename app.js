const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  next();
});

const employees = [];

app.get('/', (req, res) => {
  res.status(200).json(employees);
});

app.post('/', (req, res) => {
    employees.push(req.body);
    res.status(200).json({msg: "Employee added successfully"});
});

app.put('/', (req, res) => {
  const index = employees.findIndex(e => e.id === req.body.id);
  if (index !== -1) {
    employees.splice(index, 1, req.body);
    res.status(200).json({ msg: "updated success" });
  }
  else {
    res.status(400).json({ msg: "NO Employee found with given id.!" });
  }
})

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = employees.findIndex(e => +e.id === +id);
  if (index !== -1) {
    employees.splice(index, 1);
  }
  res.status(200).json({ msg: "deleted success" });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});