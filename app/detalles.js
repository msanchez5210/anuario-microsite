window.onload = () => {
    // Obtén el valor del ID del proyecto de los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const proyectoId = urlParams.get('id');

    if (proyectoId) {
        // Si hay un ID de proyecto, realiza la carga dinámica
        fetch('data/anuario.json')
            .then(res => res.json())
            .then(data => {
                const proyecto = data.find(item => item.id === proyectoId);

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
    
        // Asegurarse de que haya un proyecto y tenga la propiedad 'titulo'
        if (proyecto && proyecto.titulo) {
            // Crear elementos HTML para mostrar la información
            const tituloElement = document.createElement('h2');
            tituloElement.textContent = proyecto.titulo;
    
            // ... (otras partes de tu código)
    
            // Agregar los elementos al contenedor
            containerDetalles.appendChild(tituloElement);
    
            // ... (otras partes de tu código)
        } else {
            console.error('El objeto del proyecto no tiene la propiedad "titulo" o es nulo/undefined.');
        }
    }
    
    
};