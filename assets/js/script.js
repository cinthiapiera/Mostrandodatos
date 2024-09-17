$(document).ready(function() {
    let pagina = 1;

    const $btnAnterior = $('#btnAnterior');
    const $btnSiguiente = $('#btnSiguiente');
    const $contenedor = $('#contenedor');
    const $barsIcon = $('.navbar .fa-bars');
    const $menuMobile = $('.menu-mobile');

    // Función para cargar los libros desde la API
    const cargarLibros = async () => {
        try {
            const respuesta = await $.ajax({
                url: `https://gutendex.com/books/?page=${pagina}`,
                method: 'GET',
                dataType: 'json'
            });

            let libros = '';
            respuesta.results.forEach(libro => {
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

            $contenedor.html(libros);

        } catch (error) {
            console.log('Error:', error);
        }
    }

    // Agregar eventos a los botones de paginación
    $btnSiguiente.on('click', () => {
        if (pagina < 1000) {
            pagina += 1;
            cargarLibros();
        }
    });

    $btnAnterior.on('click', () => {
        if (pagina > 1) {
            pagina -= 1;
            cargarLibros();
        }
    });

    // Cargar los libros al iniciar
    cargarLibros();

    // Manejo del menú móvil
    $barsIcon.on('click', () => {
        $menuMobile.toggleClass('active');
    });
});