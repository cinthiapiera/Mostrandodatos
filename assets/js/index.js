
$(document).ready(function () {


    



    $("#buscar").click(function(ele) {
        ele.preventDefault(); // Método que evita que mi página se recargue

        // Obtiene el valor del campo de entrada usando el id correcto
        let categoriaBooks = $("#search-input").val();
        
        if (categoriaBooks) {
            categoriaBooks = categoriaBooks.toLowerCase(); // Convierte a minúsculas
            buscarBooks(categoriaBooks);
        } else {
            alert("Por favor, introduzca un valor");
        }
        $("#search-input").val(''); // Limpia el campo de entrada
    });

    $("#btnLimpiar").click(function (e){
        e.preventDefault();
        $("#book-container").empty();
        $("#search-input").val("");
    })

    function buscarBooks(books) {
        $.ajax({
            type: "GET",
            url: `https://gutendex.com/books?search=${books}`, // Verifica que esta URL es correcta
            dataType: "json",
            async: true,
            success: function(data) { renderBooks(data) },
            error: function(textStatus, errorThrown) {
                console.error("Error en la solicitud:", textStatus, errorThrown);
                alert("Ocurrió un error al buscar los libros.");
            }
        });
    }

    function renderBooks(data) {
        // Asegúrate de que data.results y data.results[0] existen y tienen las propiedades esperadas
        if (data.results && data.results.length > 0) {
            let book = data.results[0]; // Solo usando el primer libro como ejemplo

            let div = $("<div></div>");
            div.addClass("divlibro");

            let img = $("<img>");
            // Asegúrate de que 'book.formats["image/jpeg"]' tenga un valor válido
            img.attr("src", book.formats["image/jpeg"] || 'default-image.jpg'); // Usa una imagen predeterminada si no se encuentra la imagen
            img.addClass("cardimg");
            div.append(img);

            let libro = $("<h3></h3>");
            libro.addClass("nombre");
            libro.append(book.title || 'Título no disponible'); // Proporciona un texto por defecto si el título no está disponible
            div.append(libro);

            $('#book-container').append(div);
        } else {
            alert("Libro no encontrado.");
        }
    }
});