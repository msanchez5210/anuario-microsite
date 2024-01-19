window.onload = () => {

    //Menú desplegable
    let menuIcon = document.querySelector('.material-symbols-outlined.menu');
    let closeIcon = document.querySelector('.material-symbols-outlined.close');
    let menu = document.querySelector('.menu_desplegable');

    menuIcon.addEventListener('click', () => {
        menu.style.display = 'flex';
    });

    closeIcon.addEventListener('click', () => {
        menu.style.display = 'none';
    });
    
    
    //Proyectos
    let cajaProyectos = document.querySelector(".caja");
    let verMasBtn = document.getElementById("boton_vermas"); 

    let proyectosData = [];

    let cargarProyectos = () => {
        let proyectosPorCargar = proyectosData.splice(0, 8);

        proyectosPorCargar.forEach(proyecto => {
            let cadaProyecto = document.createElement('article');
            cadaProyecto.classList.add('proyecto');

            let imagenes = proyecto.imagenes ? proyecto.imagenes.split(',') : [];
            let primeraImagen = imagenes.length > 0 ? imagenes[0].trim() : '';

            let tituloHTML = proyecto.titulo ? `<h2>${proyecto.titulo}</h2>` : '';
            let subtituloHTML = proyecto.subtitulo ? `<p>${proyecto.subtitulo}</p>` : '';
            let nombreEstudianteHTML = proyecto.nombre_estudiante ? `<p>${proyecto.nombre_estudiante}</p>` : '';

            let imagenHTML = primeraImagen ? `<img class="imagenes_proyectos" src="${primeraImagen}" alt="Imagen proyecto">` : '';

            cadaProyecto.innerHTML = `
                <div class="textos_apartados">
                    ${tituloHTML}
                    ${subtituloHTML}
                    ${nombreEstudianteHTML}
                </div>
                <div class="imagenes_contenedor">
                    ${imagenHTML}
                </div>
            `;

            cajaProyectos.appendChild(cadaProyecto);
        });

        if (proyectosData.length === 0) {
            verMasBtn.style.display = 'none';
        }
    };

    let mostrarDetallesProyecto = (proyecto) => {
        let proyectoId = proyecto + 1;
    
        let urlParams = new URLSearchParams();
        urlParams.set('id', proyectoId);
    
        let url = `detalles.html?${urlParams.toString()}`;
    
        // Redirige a la nueva página con los parámetros
        window.location.href = url;
    };
    
    
    fetch('data/anuario.json')
        .then(res => res.json())
        .then(data => {
            proyectosData = data;
            cargarProyectos();
        });
    
    verMasBtn.addEventListener('click', cargarProyectos);

    
    cajaProyectos.addEventListener('click', (event) => {
        let clickedProyecto = event.target.closest('.proyecto');
    
        if (clickedProyecto) {
            let proyectoIndex = Array.from(cajaProyectos.children).indexOf(clickedProyecto);
            let proyecto = proyectosData[proyectoIndex];
    
            mostrarDetallesProyecto(proyectoIndex);
        }
    });

    
};
