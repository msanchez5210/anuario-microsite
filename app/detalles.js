//Al cargar la nueva página
window.onload = () => {

    //Menú desplegable
    const menuIcon = document.querySelector('.material-symbols-outlined.menu');
    const closeIcon = document.querySelector('.material-symbols-outlined.close');
    const menu = document.querySelector('.menu_desplegable');

    menuIcon.addEventListener('click', () => {
        menu.style.display = 'flex';
    });

    closeIcon.addEventListener('click', () => {
        menu.style.display = 'none';
    });

    const urlParams = new URLSearchParams(window.location.search);
    const proyectoId = urlParams.get('id');

    if (proyectoId) {
        fetch('data/anuario.json')
            .then(res => res.json())
            .then(data => {
                const proyecto = data.find(item => item.id === parseInt(proyectoId));
                console.log('Id:', proyecto);
                mostrarDetalles(proyecto);
            });
    } else {
        console.error('No se proporcionó un ID de proyecto en la URL.');
    }

    function mostrarDetalles(proyectoIndex) {
        const containerDetalles = document.querySelector('.container_detalles');
        const contenidoArriba = document.querySelector('.contenido_arriba');
        const contenidoAbajo = document.querySelector('.contenido_abajo');    
        const titulosDetalles = document.querySelector('.titulos_detalles');

        const tituloProyecto = document.createElement('h2');
        tituloProyecto.textContent = proyectoIndex.titulo;
    
        const subtituloProyecto = document.createElement('p');
        subtituloProyecto.textContent = proyectoIndex.subtitulo;
    
        titulosDetalles.appendChild(tituloProyecto);
        titulosDetalles.appendChild(subtituloProyecto);

        const descripcion = document.createElement('div');
        descripcion.classList.add('descripcion_detalles');

        const descripcionProyecto = document.createElement('p');
        descripcionProyecto.textContent = proyectoIndex.descripcion;

        descripcion.appendChild(descripcionProyecto);
        contenidoArriba.appendChild(descripcion);

        const imagenes = proyectoIndex.imagenes.split(',');
        const cantidadImagenes = imagenes.length;

        

        switch (cantidadImagenes) {
            case 6:
                for (let i = 0; i < 3; i++) {
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('imagen-contenedor');
    
                    const imagen = document.createElement('img');
                    imagen.src = imagenes[i].trim();
                    imagen.alt = `Imagen ${i + 1}`;
    
                    contenedor.appendChild(imagen);
                    contenidoArriba.appendChild(contenedor);
                }
    
                for (let i = 3; i < 6; i++) {
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('imagen-contenedor');
    
                    const imagen = document.createElement('img');
                    imagen.src = imagenes[i].trim();
                    imagen.alt = `Imagen ${i + 1}`;
    
                    contenedor.appendChild(imagen);
                    contenidoAbajo.appendChild(contenedor);
                }
                break;
    
            case 5:
                for (let i = 0; i < 3; i++) {
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('imagen-contenedor');
    
                    const imagen = document.createElement('img');
                    imagen.src = imagenes[i].trim();
                    imagen.alt = `Imagen ${i + 1}`;
    
                    contenedor.appendChild(imagen);
                    contenidoArriba.appendChild(contenedor);
                }
    
                for (let i = 3; i < 5; i++) {
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('imagen-contenedor');
    
                    const imagen = document.createElement('img');
                    imagen.src = imagenes[i].trim();
                    imagen.alt = `Imagen ${i + 1}`;
    
                    contenedor.appendChild(imagen);
                    contenidoAbajo.appendChild(contenedor);
                }
                break;
    
            case 3:
                for (let i = 0; i < 3; i++) {
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('imagen-contenedor');
    
                    const imagen = document.createElement('img');
                    imagen.src = imagenes[i].trim();
                    imagen.alt = `Imagen ${i + 1}`;
    
                    contenedor.appendChild(imagen);
                    contenidoArriba.appendChild(contenedor);
                }
                break;
    
            case 2:
                for (let i = 0; i < 2; i++) {
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('imagen-contenedor');
    
                    const imagen = document.createElement('img');
                    imagen.src = imagenes[i].trim();
                    imagen.alt = `Imagen ${i + 1}`;
    
                    contenedor.appendChild(imagen);
                    contenidoArriba.appendChild(contenedor);
                }
                break;
    
            default:
                const contenedor = document.createElement('div');
                contenedor.classList.add('imagen-contenedor');

                const imagen = document.createElement('img');
                imagen.src = imagenes[i].trim();
                imagen.alt = `Imagen ${i + 1}`;

                contenedor.appendChild(imagen);
                contenidoArriba.appendChild(contenedor);
                break;
        }

        // Agregar enlace a doc_info
        const enlaceDocInfo = document.createElement('a');
        enlaceDocInfo.href = proyectoIndex.doc_info;
        enlaceDocInfo.textContent = 'Ver el documento del proyecto';
        enlaceDocInfo.style.color = '#FFED00';
        containerDetalles.appendChild(enlaceDocInfo);
    };

    

};
