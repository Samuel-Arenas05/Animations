
//Agregar la libreria de Muuri para el algoritmo de las grids//

const grid = new Muuri('.grid',{  
    rounding: false
});

//Escuchar el evento cargar en la ventana para realizar todo el codigo//

window.addEventListener('load', () => {

    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas')
    const enlances = document.querySelectorAll('#categorias a')


    //Agregamos el listener para la barra de de categorias//

    enlances.forEach( (elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();

            enlances.forEach((enlance)=> enlance.classList.remove('activo'));

            evento.target.classList.add('activo')

            const categoria = evento.target.innerHTML.replace(/ /g, "").toLowerCase();

            categoria=== "todos" ?  grid.filter('[data-categoria]'): grid.filter(`[data-categoria=${categoria}]`)

        });
    });

    //Agregamos el listener para la barra de busqueda//

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {


        const busqueda = evento.target.value.replace(/ /g, "");
        grid.filter((item)=> item.getElement().dataset.etiquetas.includes(busqueda))
    });

    //Agregamos el listener para el overlay de la imagenes (overlay es poner la imagen superpuesta a otra)//

    const overlay = document.getElementById('overlay')
    document.querySelectorAll(".grid .item img").forEach((elemento) => {
       
        elemento.addEventListener('click', () => {
            overlay.classList.add('activo')

            const descripcion = elemento.parentNode.parentNode.dataset.descripcion
            const rutaV = elemento.getAttribute('video')
            const rutaI = elemento.getAttribute('src')
            const video = document.querySelector('#overlay video')
            const img = document.querySelector('#overlay img')
            const videoComprobacion = document.querySelector('#overlay video').src=rutaV
            
            document.querySelector('#overlay img').src=rutaI

            if(videoComprobacion==null){
                video.style.display='none'
                img.style.display='block'
            }else{
                video.style.display='block'
                img.style.display='none'
            }

            document.querySelector('#overlay .descripcion').innerHTML = descripcion
        })  
    })
    
    //Agregamos el listener para el boton de cerrar el overlay//

    document.querySelector('#btn-cerrar').addEventListener('click', () => {
        overlay.classList.remove('activo')
    })

     //Agregamos el listener cerrar el overlay con cualquier parte de la pantalla//

     overlay.addEventListener('click', (event) => {
        event.target.id === 'overlay' ? overlay.classList.remove('activo') : ''
     })
});

