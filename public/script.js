const tareaTemplate = (tarea) => (`
<li class="list-group-item" style="cursor: pointer;">
  <div>
    <h4 style="display: inline; ${this.terminada ? 'text-decoration: line-through;' : ''}">${tarea.titulo}</h4>
  </div>
  <p>${tarea.descripcion}</p>

  ${this.terminada 
    ? `<a href="/estado/${tarea.id}/false"><button class="btn btn-warning">Marcar como pendiente</button></a>`
    : `<a href="/estado/${tarea.id}/true"><button class="btn btn-success">Marcar como terminada</button></a>`
  }

  <a href="/editar.html?id=${tarea.id}"><button class="btn btn-primary">Editar</button></a>
  <a href="/eliminar/${this.id}"><button class="btn btn-danger">Eliminar</button></a>
</li>
`);

const listaTareasElem = document.querySelector('#lista-tareas');

fetch('http://localhost:3000/tareas/')
.then((res) => res.json())
.then((res) => {
  listaTareasElem.innerHTML = '';
  for (const tarea of res.tareas) {
    listaTareasElem.innerHTML += (tareaTemplate(tarea));
  }
})
.catch((err) => {
  console.log('Error en fetch:', err);
});