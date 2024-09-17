// Obtener el ID del libro desde la URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

// Función para cargar los detalles del libro desde la API
const cargarDetalles = async () => {
	try {
		const respuesta = await fetch(`https://gutendex.com/books/${bookId}`);

		if (respuesta.status === 200) {
			const libro = await respuesta.json();
			
			const titulo = libro.title;
			const autor = libro.authors[0]?.name || "Autor desconocido";
			const paginas = libro.formats["text/html; charset=utf-8"] ? "Disponible en formato web" : "No disponible";
			const popularidad = libro.download_count;
			const idiomas = libro.languages.join(', ');
			const descripcion = libro.subjects.join(', ') || "No hay descripción disponible.";
			const cover = libro.formats["image/jpeg"] || "https://via.placeholder.com/300x400?text=No+Image";
			const id = libro.id;

			// Actualizar los elementos HTML con los detalles del libro
			document.getElementById('titulo').textContent = titulo;
			document.getElementById('autor').textContent = autor;
			document.getElementById('paginas').textContent = paginas;
			document.getElementById('popularidad').textContent = popularidad;
			document.getElementById('idiomas').textContent = idiomas;
			document.getElementById('descripcion').textContent = descripcion;
			document.getElementById('id').textContent = id;
			document.getElementById('cover').src = cover;

		} else {
			console.error('No se pudo obtener la información del libro');
		}
	} catch (error) {
		console.error('Error al obtener los detalles del libro:', error);
	}
}

// Cargar los detalles del libro al iniciar la página
cargarDetalles();



