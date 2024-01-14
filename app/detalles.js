//Al cargar la nueva página
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const proyectoId = urlParams.get('id');

    if (proyectoId) {
        // Si hay un ID de proyecto, realiza la carga dinámica
        fetch('data/anuario.json')
            .then(res => res.json())
            .then(data => {
                const proyecto = data.find(item => item.id === parseInt(proyectoId));

                // Ahora, puedes trabajar con los detalles del proyecto en esta página
                console.log('Id:', proyecto);

                // Luego, puedes mostrar los detalles del proyecto en tu página
                mostrarDetalles(proyecto);
            });
    } else {
        // Si no hay un ID de proyecto, maneja el caso en consecuencia
        console.error('No se proporcionó un ID de proyecto en la URL.');
    }

    function mostrarDetalles(proyecto) {
        const containerDetalles = document.querySelector('.container_detalles');

        // Crear elementos HTML y asignar contenido dinámico
        const titulo = document.createElement('h2');
        titulo.textContent = proyecto.titulo;

        const subtitulo = document.createElement('p');
        subtitulo.textContent = proyecto.subtitulo;

        const descripcion = document.createElement('p');
        descripcion.textContent = proyecto.descripcion;

        // Puedes seguir creando más elementos y asignando contenido

        // Agregar elementos al contenedor
        containerDetalles.appendChild(titulo);
        containerDetalles.appendChild(subtitulo);
        containerDetalles.appendChild(descripcion);
        
        // Aquí puedes seguir agregando más elementos según tus necesidades

        // Agregar imágenes
        proyecto.imagenes.split(',').forEach((imagenURL, index) => {
            const imagen = document.createElement('img');
            imagen.src = imagenURL.trim();
            imagen.alt = `Imagen ${index + 1}`;
            containerDetalles.appendChild(imagen);
        });

        // Agregar enlace a doc_info
        const enlaceDocInfo = document.createElement('a');
        enlaceDocInfo.href = proyecto.doc_info;
        enlaceDocInfo.textContent = 'Ver Documento de Información';
        containerDetalles.appendChild(enlaceDocInfo);
    };


};
