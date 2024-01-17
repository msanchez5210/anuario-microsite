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
        // Si hay un ID de proyecto, realiza la carga dinámica
        fetch('data/anuario.json')
            .then(res => res.json())
            .then(data => {
                const proyecto = data.find(item => item.id === parseInt(proyectoId));
                console.log('Id:', proyecto);
                mostrarDetalles(proyecto);
            });
    } else {
        // Si no hay un ID de proyecto, maneja el caso en consecuencia
        console.error('No se proporcionó un ID de proyecto en la URL.');
    }

    function mostrarDetalles(proyectoIndex) {
        const containerDetalles = document.querySelector('.container_detalles');
        const contenidoArriba = document.querySelector('.contenido_arriba');
        const contenidoAbajo = document.querySelector('.contenido_abajo');    
        const imagenes = proyectoIndex.imagenes.split(',');
        const cantidadImagenes = imagenes.length;
        

        switch (cantidadImagenes) {
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
    
            case 4:
                for (let i = 0; i < 2; i++) {
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('imagen-contenedor');
    
                    const imagen = document.createElement('img');
                    imagen.src = imagenes[i].trim();
                    imagen.alt = `Imagen ${i + 1}`;
    
                    contenedor.appendChild(imagen);
                    contenidoArriba.appendChild(contenedor);
                }
    
                for (let i = 2; i < 4; i++) {
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
                // Estructura para 3 imágenes
                // ...
                break;
    
            case 2:
                // Estructura para 2 imágenes
                // ...
                break;
    
            default:
                // Manejar otros casos si es necesario
                break;
        }

        // Agregar enlace a doc_info
        const enlaceDocInfo = document.createElement('a');
        enlaceDocInfo.href = proyectoIndex.doc_info;
        enlaceDocInfo.textContent = 'Ver Documento de Información';
        containerDetalles.appendChild(enlaceDocInfo);
    };

    

};
