$(document).ready(function() {
    // Obtener el ID del libro desde la URL
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    // Función para cargar los detalles del libro desde la API
    const cargarDetalles = async () => {
        try {
            const respuesta = await $.ajax({
                url: `https://gutendex.com/books/${bookId}`,
                method: 'GET',
                dataType: 'json'
            });

            const titulo = respuesta.title;
            const autor = respuesta.authors[0]?.name || "Autor desconocido";
            const paginas = respuesta.formats["text/html; charset=utf-8"] ? "Disponible en formato web" : "No disponible";
            const popularidad = respuesta.download_count;
            const idiomas = respuesta.languages.join(', ');
            const descripcion = respuesta.subjects.join(', ') || "No hay descripción disponible.";
            const cover = respuesta.formats["image/jpeg"] || "https://via.placeholder.com/300x400?text=No+Image";
            const id = respuesta.id;

            // Actualizar los elementos HTML con los detalles del libro
            $('#titulo').text(titulo);
            $('#autor').text(autor);
            $('#paginas').text(paginas);
            $('#popularidad').text(popularidad);
            $('#idiomas').text(idiomas);
            $('#descripcion').text(descripcion);
            $('#id').text(id);
            $('#cover').attr('src', cover);

        } catch (error) {
            console.error('Error al obtener los detalles del libro:', error);
        }
    }

    // Cargar los detalles del libro al iniciar la página
    cargarDetalles();
});