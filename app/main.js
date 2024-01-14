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
    
    
    //Proyectos
    let cajaProyectos = document.querySelector(".caja");
    let verMasBtn = document.getElementById("boton_vermas"); 

    let proyectosData = [];

    const cargarProyectos = () => {
        const proyectosPorCargar = proyectosData.splice(0, 8);

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

    const mostrarDetallesProyecto = (proyecto) => {
        const proyectoId = proyecto.id;
    
        const urlParams = new URLSearchParams();
        urlParams.set('id', proyectoId);
    
        const url = `detalles.html?${urlParams.toString()}`;
    
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
        const clickedProyecto = event.target.closest('.proyecto');
    
        if (clickedProyecto) {
            const proyectoIndex = Array.from(cajaProyectos.children).indexOf(clickedProyecto);
            const proyecto = proyectosData[proyectoIndex];
    
            mostrarDetallesProyecto(proyecto);
        }
    });

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
