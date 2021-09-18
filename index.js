const express = require('express');
const handlebars = require('express-handlebars');
const axios = require('axios');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  defaultLayout: 'index',
  extname: 'hbs',
}));

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get('/', async (req, res) => {
  let reqUrl = 'http://localhost:3000/tareas/';

  if (req.query.terminadas) {
    reqUrl += req.query.terminadas;
  }

  const resData = await axios.get(reqUrl);

  res.render('main', {
    tareas: resData.data.tareas,
  });
});

app.get('/nueva', (_, res) => {
  res.render('nueva');
});

app.post('/nueva', async (req, res) => {
  const { titulo, descripcion } = req.body;
  await axios.post('http://localhost:3000/nueva', {
    titulo,
    descripcion,
  });

  res.redirect('/');
});

app.get('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const resData = await axios.get(`http://localhost:3000/tarea/${id}`);
  res.render('editar', resData.data.tarea);
});

app.post('/editar', async (req, res) => {
  const {
    id,
    titulo,
    descripcion,
    terminada,
  } = req.body;

  await axios.put('http://localhost:3000/tarea', {
    id,
    titulo,
    descripcion,
    terminada,
  });

  res.redirect('/');
});

app.get('/estado/:id/:terminada', async (req, res) => {
  const { id, terminada } = req.params;

  await axios.put('http://localhost:3000/tarea', {
    id,
    terminada,
  });

  res.redirect('back');
});

app.get('/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  await axios.delete(`http://localhost:3000/tarea/${id}`);
  res.redirect('/');
});

app.listen(8080, () => {
  console.log('Server started: http://localhost:8080/');
});
