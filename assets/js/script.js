$(document).ready(function() {
    let pagina = 1;
    const $btnAnterior = $('#btnAnterior');
    const $btnSiguiente = $('#btnSiguiente');
    const $contenedor = $('#contenedor');
    const $barsIcon = $('.navbar .fa-bars');
    const $menuMobile = $('.menu-mobile');

    // Función para cargar los libros desde la API
    function cargarLibros() {
        $.ajax({
            url: `https://gutendex.com/books/?page=${pagina}`,
            method: 'GET',
            dataType: 'json',
            success: function(respuesta) {
                mostrarLibros(respuesta.results);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }

    // Función para mostrar los libros en el contenedor
    function mostrarLibros(libros) {
        let librosHtml = '';
        libros.forEach(libro => {
            const imgUrl = libro.formats["image/jpeg"] || libro.formats["text/html"];
            const author = libro.authors[0]?.name || "Autor desconocido";
            librosHtml += `
                <div class="libro">
                    <a href="detalle-libro.html?id=${libro.id}">
                        <img class="cover" src="${imgUrl}" alt="Portada del libro">
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
            cargarLibros();
        }
    });

    // Evento para el botón Anterior
    $btnAnterior.on('click', function() {
        if (pagina > 1) {
            pagina--;
            cargarLibros();
        }
    });

    // Cargar los libros al iniciar la página
    cargarLibros();

    // Manejo del menú móvil
    $barsIcon.on('click', function() {
        $menuMobile.toggleClass('active');
    });
});