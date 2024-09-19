
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
        // Comprobamos si hay resultados
        if (data.results && data.results.length > 0) {
            // Limpiamos el contenedor antes de añadir nuevos libros
            $('#contenedor').empty();
            
            // Iteramos sobre cada libro en los resultados
            data.results.forEach(book => {
                let div = $("<div></div>").addClass("libro"); // Creamos un nuevo div para cada libro
    
                // Creamos la imagen
                let img = $("<img>")
                    .attr("src", book.formats["image/jpeg"] || 'default-image.jpg') // Imagen por defecto si no hay
                    .addClass("cover");
                div.append(img);
    
                // Creamos el título
                let libro = $("<h3></h3>")
                    .addClass("titulo")
                    .text(book.title || 'Título no disponible'); // Texto por defecto si no hay título
                div.append(libro);
    
                // Creamos el autor
                let author = $("<p></p>")
                    .text(book.authors[0]?.name || "Autor desconocido"); // Texto por defecto si no hay autor
                div.append(author);
    
                // Añadimos el div del libro al contenedor
                $('#contenedor').append(div);
            });
        } else {
            alert("No se encontraron libros.");
        }
    }
});

//<div class="contenedor" id="contenedor"></div>