const apiKey = '218549589fc1a6b4b567ecf0b05e38f2';
let currentPage = 1;
let totalPages = 1;

function displayMovies(page) {
    const contenedorPeliculas = document.getElementById('seccion_cartelera');
    contenedorPeliculas.innerHTML = ''; // Limpiar el contenido anterior

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`) /*el fetch hace una solicitud a la API de moviedb, lo que obtiene una lista de peliculas. El then convierte los datos en formato JSON. El metodo then maneja la respuesta de la solicitud*/
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            totalPages = data.total_pages;

            movies.forEach(movie => {
                const seccionPoster = document.createElement('div');
                seccionPoster.className = 'seccion_poster';

                const img = document.createElement('img');
                img.className = 'poster';
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = '';

                const title = document.createElement('h3');
                title.textContent = movie.title;

                const details = document.createElement('p');
                details.innerHTML = `Código: ${movie.id}<br>
                                   Título original: ${movie.original_title}<br>
                                   Idioma original: ${movie.original_language}<br>
                                   Año: ${movie.release_date}`;

                const button = document.createElement('a');
                button.className = 'button';
                button.href = 'agregar-a-favoritos';
                button.textContent = 'Agregar a favoritos';

                seccionPoster.appendChild(img);
                seccionPoster.appendChild(title);
                seccionPoster.appendChild(details);
                seccionPoster.appendChild(button);
                contenedorPeliculas.appendChild(seccionPoster);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updatePagination() {
    const paginacionElement = document.getElementById('paginacion');
    paginacionElement.innerHTML = '';

    const btnAnterior = document.createElement('button');
    btnAnterior.className = 'btnpaginacion';
    btnAnterior.id = 'btnAnterior';
    btnAnterior.textContent = 'Anterior';
    btnAnterior.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayMovies(currentPage);
            updatePagination();
        }
    });
    paginacionElement.appendChild(btnAnterior);

    const btnSiguiente = document.createElement('button');
    btnSiguiente.className = 'btnpaginacion';
    btnSiguiente.id = 'btnSiguiente';
    btnSiguiente.textContent = 'Siguiente';
    btnSiguiente.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayMovies(currentPage);
            updatePagination();
        }
    });
    paginacionElement.appendChild(btnSiguiente);
}

displayMovies(currentPage);
updatePagination();

function agregarFavorito(id) {
    let local=[];
    local = localStorage.getItem("Favoritos");
    let nuevo = id;
    let control = true;
    if (local != null){
        for (let i = 0; i < local.length; i++){ 
            if(local[i] == nuevo) {
                control = false;
                i = local.lenght;
            };
        };
        if (control){
            let msj = document.getElementById("sec-messages");
            localStorage.setItem("Favoritos",id);
            msj.innerHTML='<p class="verde">Película agregada con éxito!</p>';
        }
        else{
            let msj = document.getElementById("sec-messages");
            msj.innerHTML='<p class="amarillo">La película ingresada ya se encuentra almacenada</p>';
        };
        }
    else{
        let msj = document.getElementById("sec-messages");
        localStorage.setItem("Favoritos",id);
        msj.innerHTML='<p class="verde">Película agregada con éxito!</p>';
    }
    }



function updatePagination() {
const paginacionElement = document.getElementById('paginacion');
paginacionElement.innerHTML = '';

const btnAnterior = document.createElement('button');
btnAnterior.className = 'btnpaginacion';
btnAnterior.id = 'btnAnterior';
btnAnterior.textContent = 'Anterior';
btnAnterior.addEventListener('click', () => {
if (currentPage > 1) {
  currentPage--;
  displayMovies(currentPage);
  updatePagination();
}
});
paginacionElement.appendChild(btnAnterior);

const btnSiguiente = document.createElement('button');
btnSiguiente.className = 'btnpaginacion';
btnSiguiente.id = 'btnSiguiente';
btnSiguiente.textContent = 'Siguiente';
btnSiguiente.addEventListener('click', () => {
if (currentPage < totalPages) {
  currentPage++;
  displayMovies(currentPage);
  updatePagination();
}
});
paginacionElement.appendChild(btnSiguiente);
}

displayMovies(currentPage);
updatePagination();
