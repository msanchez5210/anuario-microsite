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

    document.getElementById('btnInicio').addEventListener('click', function() {
        window.location.href = 'index.html';
    });


    //Página de detalles

    const contenidoIzquierda = document.querySelector('.contenido_izquierda');
    const contenidoDerecha = document.querySelector('.contenido_derecha');

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
        const titulosDetalles = document.querySelector('.titulos_detalles');
    
        //Nombre del proyecto
        const tituloProyecto = document.createElement('h2');
        tituloProyecto.textContent = proyectoIndex.titulo;
        
        //Subtítulo del proyecto
        const subtituloProyecto = document.createElement('p');
        subtituloProyecto.classList.add('subtitulo_detalles')
        subtituloProyecto.textContent = proyectoIndex.subtitulo;

        //Nombre, Curso y especialidad
        const datosAlumno = document.createElement('div');
        datosAlumno.classList.add('datos_alumno');

        const autorProyecto = document.createElement('p');
        autorProyecto.classList.add('nombre_estudiante');
        autorProyecto.textContent = proyectoIndex.nombre_estudiante;

        const correoEstudiante = document.createElement('p');
        correoEstudiante.classList.add('correo_estudiante');
        correoEstudiante.textContent = proyectoIndex.correo_estudiante;

        const cursoProyecto = document.createElement('p');
        cursoProyecto.classList.add('curso');
        cursoProyecto.textContent = proyectoIndex.curso;

        const especialidadProyecto = document.createElement('p');
        especialidadProyecto.classList.add('especialidad');
        especialidadProyecto.textContent = proyectoIndex.especialidad;

        datosAlumno.appendChild(autorProyecto);
        datosAlumno.appendChild(correoEstudiante);
        datosAlumno.appendChild(cursoProyecto);
        datosAlumno.appendChild(especialidadProyecto);

        //Asignatura
        const asignaturaProyecto = document.createElement('p');
        asignaturaProyecto.classList.add ('asignatura');
        asignaturaProyecto.textContent = proyectoIndex.asignatura;

        const palabrasClave = document.createElement('p');
        palabrasClave.classList.add('palabras_clave');
        palabrasClave.textContent = proyectoIndex.palabras_clave;

    
        titulosDetalles.appendChild(tituloProyecto);
        titulosDetalles.appendChild(subtituloProyecto);
        titulosDetalles.appendChild(datosAlumno);
        titulosDetalles.appendChild(asignaturaProyecto);
        titulosDetalles.appendChild(palabrasClave);
        

    
        const descripcion = document.createElement('div');
        descripcion.classList.add('descripcion_detalles');

        //Descripción del proyecto

        const descripcionProyecto = document.createElement('p');
        descripcionProyecto.textContent = proyectoIndex.descripcion;

        descripcion.appendChild(descripcionProyecto);
    
        // Agrega lógica para imágenes según la plantilla
        const imagenes = proyectoIndex.imagenes.split(',');
    
        if (proyectoIndex.plantilla === 1) {
            contenidoIzquierda.appendChild(descripcion);

            imagenes.forEach(imagen => {
                const contenedorImg = document.createElement('div');
                contenedorImg.classList.add('contenedor_img');
    
                const imgElement = document.createElement('img');
                imgElement.src = imagen.trim();
    
                contenedorImg.appendChild(imgElement);
                contenidoDerecha.appendChild(contenedorImg);
            });
        } else if (proyectoIndex.plantilla === 2) {
            contenidoDerecha.appendChild(descripcion);

            imagenes.forEach(imagen => {
                const contenedorImg = document.createElement('div');
                contenedorImg.classList.add('contenedor_img');
    
                const imgElement = document.createElement('img');
                imgElement.src = imagen.trim();
    
                contenedorImg.appendChild(imgElement);
                contenidoIzquierda.appendChild(contenedorImg);
            });
        }
    


        // Enlace al documento del proyecto
        const enlaceDocInfo = document.createElement('a');
        enlaceDocInfo.href = proyectoIndex.doc_info;
        enlaceDocInfo.textContent = 'Ver el documento del proyecto';
        enlaceDocInfo.style.color = '#FFED00';
        enlaceDocInfo.style.display = 'flex';
        enlaceDocInfo.style.justifyContent = 'center';
        enlaceDocInfo.style.paddingTop = '40px'


        containerDetalles.appendChild(enlaceDocInfo);
    };
};
