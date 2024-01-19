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

    document.getElementById('btnInicio').addEventListener('click', function() {
        window.location.href = 'index.html';
    });


    //Página de detalles

    let contenidoIzquierda = document.querySelector('.contenido_izquierda');
    let contenidoDerecha = document.querySelector('.contenido_derecha');

    let urlParams = new URLSearchParams(window.location.search);
    let proyectoId = urlParams.get('id');

    if (proyectoId) {
        fetch('data/anuario.json')
            .then(res => res.json())
            .then(data => {
                let proyecto = data.find(item => item.id === parseInt(proyectoId));
                console.log('Id:', proyecto);
                mostrarDetalles(proyecto);
            });
    } else {
        console.error('No se proporcionó un ID de proyecto en la URL.');
    }

    function mostrarDetalles(proyectoIndex) {
        let containerDetalles = document.querySelector('.container_detalles');
        let titulosDetalles = document.querySelector('.titulos_detalles');
    
        //Nombre del proyecto
        let tituloProyecto = document.createElement('h2');
        tituloProyecto.textContent = proyectoIndex.titulo;
        
        //Subtítulo del proyecto
        let subtituloProyecto = document.createElement('p');
        subtituloProyecto.classList.add('subtitulo_detalles')
        subtituloProyecto.textContent = proyectoIndex.subtitulo;

        //Nombre, Curso y especialidad
        let datosAlumno = document.createElement('div');
        datosAlumno.classList.add('datos_alumno');

        let autorProyecto = document.createElement('p');
        autorProyecto.classList.add('nombre_estudiante');
        autorProyecto.textContent = proyectoIndex.nombre_estudiante;

        let correoEstudiante = document.createElement('p');
        correoEstudiante.classList.add('correo_estudiante');
        correoEstudiante.textContent = proyectoIndex.correo_estudiante;

        let cursoProyecto = document.createElement('p');
        cursoProyecto.classList.add('curso');
        cursoProyecto.textContent = proyectoIndex.curso;

        let especialidadProyecto = document.createElement('p');
        especialidadProyecto.classList.add('especialidad');
        especialidadProyecto.textContent = proyectoIndex.especialidad;

        datosAlumno.appendChild(autorProyecto);
        datosAlumno.appendChild(correoEstudiante);
        datosAlumno.appendChild(cursoProyecto);
        datosAlumno.appendChild(especialidadProyecto);

        //Asignatura
        let asignaturaProyecto = document.createElement('p');
        asignaturaProyecto.classList.add ('asignatura');
        asignaturaProyecto.textContent = proyectoIndex.asignatura;

        let palabrasClave = document.createElement('p');
        palabrasClave.classList.add('palabras_clave');
        palabrasClave.textContent = proyectoIndex.palabras_clave;

    
        titulosDetalles.appendChild(tituloProyecto);
        titulosDetalles.appendChild(subtituloProyecto);
        titulosDetalles.appendChild(datosAlumno);
        titulosDetalles.appendChild(asignaturaProyecto);
        titulosDetalles.appendChild(palabrasClave);
        

    
        let descripcion = document.createElement('div');
        descripcion.classList.add('descripcion_detalles');

        //Descripción del proyecto

        let descripcionProyecto = document.createElement('p');
        descripcionProyecto.textContent = proyectoIndex.descripcion;

        descripcion.appendChild(descripcionProyecto);
    
        // Agrega lógica para imágenes según la plantilla
        let imagenes = proyectoIndex.imagenes.split(',');
    
        if (proyectoIndex.plantilla === 1) {
            contenidoIzquierda.appendChild(descripcion);

            imagenes.forEach(imagen => {
                let contenedorImg = document.createElement('div');
                contenedorImg.classList.add('contenedor_img');
    
                let imgElement = document.createElement('img');
                imgElement.src = imagen.trim();
    
                contenedorImg.appendChild(imgElement);
                contenidoDerecha.appendChild(contenedorImg);
            });
        } else if (proyectoIndex.plantilla === 2) {
            contenidoDerecha.appendChild(descripcion);

            imagenes.forEach(imagen => {
                let contenedorImg = document.createElement('div');
                contenedorImg.classList.add('contenedor_img');
    
                let imgElement = document.createElement('img');
                imgElement.src = imagen.trim();
    
                contenedorImg.appendChild(imgElement);
                contenidoIzquierda.appendChild(contenedorImg);
            });
        }
    


        // Enlace al documento del proyecto
        let enlaceDocInfo = document.createElement('a');
        enlaceDocInfo.href = proyectoIndex.doc_info;
        enlaceDocInfo.textContent = 'Ver el documento del proyecto';
        enlaceDocInfo.style.color = '#FFED00';
        enlaceDocInfo.style.display = 'flex';
        enlaceDocInfo.style.justifyContent = 'center';
        enlaceDocInfo.style.paddingTop = '40px'


        containerDetalles.appendChild(enlaceDocInfo);
    };
};
