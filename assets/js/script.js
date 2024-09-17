let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Agregar eventos a los botones de paginación
btnSiguiente.addEventListener('click', () => {
	if (pagina < 1000) {
		pagina += 1;
		cargarLibros();
	}
});

btnAnterior.addEventListener('click', () => {
	if (pagina > 1) {
		pagina -= 1;
		cargarLibros();
	}
});

// Función para cargar los libros desde la API
const cargarLibros = async () => {
	try {
		const respuesta = await fetch(`https://gutendex.com/books/?page=${pagina}`);

		// Si la respuesta es correcta
		if (respuesta.status === 200) {
			const datos = await respuesta.json();

			let libros = '';
			datos.results.forEach(libro => {
				const imgUrl = libro.formats["image/jpeg"] || libro.formats["text/html"];
				const author = libro.authors[0]?.name || "Autor desconocido";
				
				libros += `
					<div class="libro">
						<a href="detalle-libro.html?id=${libro.id}">
							<img class="cover" src="${imgUrl}" alt="Portada del libro">
						</a>
						<h3 class="titulo">${libro.title}</h3>
						<p>${author}</p>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = libros;

		} else if (respuesta.status === 404) {
			console.log('No se encontraron libros');
		} else {
			console.log('Hubo un error y no sabemos qué pasó');
		}

	} catch (error) {
		console.log(error);
	}
}

// Cargar los libros al iniciar
cargarLibros();


const barsIcon = document.querySelector('.navbar .fa-bars');
const menuMobile = document.querySelector('.menu-mobile');

barsIcon.addEventListener('click', () => {
    menuMobile.classList.toggle('active');
});