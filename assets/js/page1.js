$(document).ready(function() {
    let pagina = 1;
    const $btnAnterior = $('#btnAnterior');
    const $btnSiguiente = $('#btnSiguiente');
    const $contenedor = $('#contenedor');
    const $barsIcon = $('.navbar .fa-bars');
    const $menuMobile = $('.menu-mobile');

    const $searchInput = $('#search-input');
    const $btnBuscar = $('#buscar');
    const $btnLimpiar = $('#btnLimpiar');

    // Función para cargar los libros desde la API
    function cargarLibros(query = '') {
        const url = query ? `https://gutendex.com/books?search=${query}&page=${pagina}` : `https://gutendex.com/books/?page=${pagina}`;
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(respuesta) {
                if (respuesta.results.length > 0) {
                    mostrarLibros(respuesta.results);
                } else {
                    $contenedor.html('<p>No se encontraron libros con ese título.</p>');
                }
            },
            error: function(error) {
                console.log('Error:', error);
                $contenedor.html('<p>Ocurrió un error al cargar los libros. Inténtalo nuevamente más tarde.</p>');
            }
        });
    }

    // Función para mostrar los libros en el contenedor // se cambio la url para direccionarlo a la pagina de detalle
    function mostrarLibros(libros) {
        let librosHtml = '';
        libros.forEach(libro => {
            const imgUrl = libro.formats["image/jpeg"] || libro.formats["text/html"];
            const author = libro.authors[0]?.name || "Autor desconocido";
            librosHtml += `
                <div class="libro">
                    <a href="page2.html?id=${libro.id}">
                        <img class="cover" src="${imgUrl}" alt="Portada de ${libro.title}">
                    </a>
                    <h3 class="titulo">${libro.title}</h3>
                    <p>${author}</p>
                </div>
            `;
        });
        $contenedor.html(librosHtml);
    }

    // Evento para el botón Siguiente
    $btnSiguiente.on('click', function() {
        if (pagina < 1000) {
            pagina++;
            const query = $searchInput.val();
            cargarLibros(query);
        }
    });

    // Evento para el botón Anterior
    $btnAnterior.on('click', function() {
        if (pagina > 1) {
            pagina--;
            const query = $searchInput.val();
            cargarLibros(query);
        }
    });

    // Evento para el botón Buscar
    $btnBuscar.on('click', function() {
        const query = $searchInput.val();
        pagina = 1; // Reinicia a la primera página en caso de nueva búsqueda
        cargarLibros(query);
    });

    // Evento para el botón Limpiar
    $btnLimpiar.on('click', function() {
        $searchInput.val(''); // Limpiar el campo de búsqueda
        pagina = 1; // Reinicia a la primera página
        cargarLibros(); // Cargar todos los libros
    });

    // Búsqueda al presionar Enter
    $searchInput.on('keypress', function(e) {
        if (e.which === 13) { // Código de tecla Enter
            const query = $searchInput.val();
            pagina = 1; // Reinicia a la primera página
            cargarLibros(query);
        }
    });

    // Cargar los libros al iniciar la página
    cargarLibros();

    // Manejo del menú móvil
    $barsIcon.on('click', function() {
        $menuMobile.toggleClass('active');
    });
});