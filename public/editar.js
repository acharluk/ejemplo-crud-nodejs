const url = new URLSearchParams(window.location.search)
const id = url.get('id');

const tituloInputElem = document.querySelector('#titulo');
const descripcionInputElem = document.querySelector('#descripcion');
const idInputElem = document.querySelector('#id');
const terminadaInputElem = document.querySelector('#terminada');

fetch(`http://localhost:3000/tarea/${id}`)
.then((res) => res.json())
.then(({ tarea }) => {
  tituloInputElem.value = tarea.titulo;
  descripcionInputElem.value = tarea.descripcion;
  idInputElem.value = tarea.id;
  terminadaInputElem.checked = tarea.terminada;
})
.catch((err) => {
  console.log('Error en fetch:', err);
});