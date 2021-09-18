const express = require('express');
const uuid = require('uuid');
const tareas = require('./db.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get('/tareas', (_, res) => {
  res.send(tareas);
});

app.get('/tareas/:terminadas', (req, res) => {
  const terminadas = req.params.terminadas === 'true';
  const tareasFiltradas = tareas.tareas.filter((el) => el.terminada === terminadas);
  res.send({
    tareas: tareasFiltradas,
  });
});

app.get('/tarea/:id', (req, res) => {
  const { id } = req.params;
  const tarea = tareas.tareas.find((el) => el.id === id);
  res.send({
    tarea,
  });
});

app.delete('/tarea/:id', (req, res) => {
  const { id } = req.params;
  const idx = tareas.tareas.findIndex((el) => el.id === id);
  tareas.tareas.splice(idx, 1);

  res.send(tareas);
});

app.post('/nueva', (req, res) => {
  const { titulo, descripcion } = req.body;

  if (titulo && descripcion) {
    const nuevaTarea = {
      id: uuid.v4(),
      titulo,
      descripcion,
      terminada: false,
    };

    tareas.tareas.push(nuevaTarea);
    res.send(nuevaTarea);
  } else {
    res.send({
      error: 'No se ha podido crear la tarea :(',
    });
  }
});

app.put('/tarea', (req, res) => {
  const {
    id,
    titulo,
    descripcion,
    terminada,
  } = req.body;

  const tareaIdx = tareas.tareas.findIndex((el) => el.id === id);

  if (titulo && descripcion) {
    tareas.tareas[tareaIdx] = {
      id,
      titulo,
      descripcion,
      terminada: terminada === 'true',
    };
  } else {
    tareas.tareas[tareaIdx].terminada = terminada === 'true';
  }

  res.send({});
});

app.listen(3000, () => {
  console.log('Server started: http://localhost:3000/');
});
