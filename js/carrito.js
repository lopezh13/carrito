/** asignacion de variables */

//document.getElementById()
//console.log(document);
const carrito = document.getElementById('carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

/** apartado de los metodos */
cargarEventos();

//Metodo para cargar todos los eventos para el carrito de cursos
function cargarEventos(){
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    //eliminamos todos los elementos de los cursos que hay en el arreglo
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        removerHTML();
    })
}

function agregarCurso(e){
    //Evitamos que la etiqueta <a> redireccione, cancelado su evento por defecto
    e.preventDefault();
    
    //Validamos que exista la clase 'agregar-carrito' en el elemento que yo seleccione
    if(e.target.classList.contains('agregar-carrito')){
        //console.log(e.target);
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //console.log(cursoSeleccionado);

        leerDatosCurso(cursoSeleccionado);
    }
}

//metodo para convertir el curso seleccionado en un objeto y agregarlo en el array
function leerDatosCurso(curso){
    console.log(curso)

    //Creando el objeto de curso seleccionado y obteniendo la informacion del html del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h5').textContent,
        precio: curso.querySelector('.precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisar si el curso ya existe en el arreglo articulosCarrito
    const existe_curso = articulosCarrito.some(curso => curso.id === infoCurso.id);

    //si el curso existe, me devolvera true
    if(existe_curso){
        /* si el curso existe, actualizamos la cantidad en base al id del curso,  volvemos a condicionar si el id 
            existe, para poder actualizar la informacion de ese curso en especifico
        */
        const curso_actualizado = articulosCarrito.map( curso => {
            if(curso.id == infoCurso.id){
                curso.cantidad += 1;
                return curso; //actualizamos el curso que tiene el mismo id del curso actual
            }else{
                return curso; //retornamos los otros cursos que ya estan dentro del arreglo
            }
        })
        //hacemos una copia del arreglo ya actualizado 
        articulosCarrito = [...curso_actualizado];
    }else{
        //si el curso no existe, hacemos una copia del arreglo + el curso actual que seleccione el usuario
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //articulosCarrito = [infoCurso];
    //console.log(articulosCarrito)
    carritoHTML();
}

//metodo para iterar los elementos del arreglo en una tabla html
function carritoHTML(){
    //llamamos la funcion removerHTML() para evitar que se duplique el primer curso que se selecciona
    removerHTML();


    //iteramos el arreglo de articulosCarrito para mostrar todos los cursos que hay en el arreglo en una tabla
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, id, cantidad} = curso;
        
        //creando un elemento html <tr>
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        //agregamos los cursos al apartado del tbody
        contenedorCarrito.appendChild(fila);
    })
}

//removiendo al primer hijo que se repite en la tabla de los cursos
function removerHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

/** metodo para eliminar un curso en base a su ID */
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //filtramos un nuevo array con todos los cursos que sean diferentes al cursoId
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        //una vez teniendo el nuevo arreglo, llamamos al metodo carritoHTML() para que forme la tabla, con el nuevo arreglo
        carritoHTML();
    }
}
