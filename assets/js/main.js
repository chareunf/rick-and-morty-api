const URL = "https://rickandmortyapi.com/api/character"
const d = document
const $main = d.getElementById("mainContainer")
const $templateCard = d.getElementById("template-card").content
const fragment = d.createDocumentFragment()

//paginacion
const $templatePaginacion = d.getElementById("template-paginacion").content
const $navButtons = d.getElementById("nav-buttons")

console.log($templatePaginacion)

const fetchApiRickad = async (url) => {



    try {

        loaderFunction()
        const res = await fetch(url)
        const json = await res.json()

        const info = json.info
        //const results = json.results

        if (!res.ok) throw { status: res.status, statusText: res.statusText }


        console.log(json)
        //console.log(res.url)
        const mostrarCard = (json) => {

            json.results.forEach(elem => {
                //console.log(elem)
                const clone = $templateCard.cloneNode(true)
                clone.querySelector(".card-img-top").src = elem.image
                clone.querySelector(".card-title").textContent = elem.name
                clone.querySelector(".species").textContent = `Especie: ${elem.species}`
                clone.querySelector(".status").textContent = `Estatus: ${elem.status}`
                clone.querySelector(".type").textContent = (elem.type === "") ? "Tipo: No especificado" : `Tipo: ${elem.type}`


                fragment.appendChild(clone)

            });

            $main.appendChild(fragment)




        }
        $main.textContent = ""
        mostrarCard(json)

        paginacion(json)


    } catch (error) {
        console.log(error)

        const message = error.statusText || "Ocurrio un error"

        $main.innerHTML = `<p class="error">Error ${error.status}: ${message}</p>`
    }





}



const paginacion = (json) => {
    console.log(json.info)
    const info = json.info
    const clonePag = $templatePaginacion.cloneNode(true)

    clonePag.querySelector(".btn-outline-secondary").setAttribute("data-url", info.prev)
    clonePag.querySelector(".btn-outline-primary").setAttribute("data-url", info.next)

    $navButtons.textContent = ""

    if (!info.prev) {
        clonePag.querySelector(".btn-outline-secondary").setAttribute("disabled", "")
        //clonePag.querySelector(".btn-outline-secondary").disabled = false


    } else {
        clonePag.querySelector(".btn-outline-secondary").removeAttribute("disabled")
        //clonePag.querySelector(".btn-outline-secondary").disabled = true
    }

    if (!info.next) {
        clonePag.querySelector(".btn-outline-primary").setAttribute("disabled", "")
        //clonePag.querySelector(".btn-outline-primary").disabled = false


    } else {
        clonePag.querySelector(".btn-outline-primary").removeAttribute("disabled")
        //clonePag.querySelector(".btn-outline-primary").disabled = true
    }

    $navButtons.appendChild(clonePag)


    // $navButtons.addEventListener("click",e=>{
    //     console.log(e.target.matches)
    //     if(e.target.matches(".btn-outline-primary")){

    //        fetchApiRickad(info.next)
    //     }

    //     if(e.target.matches(".btn-outline-secondary")){

    //         fetchApiRickad(info.prev)
    //      }

    // })


}



d.addEventListener("DOMContentLoaded", fetchApiRickad(URL))

$navButtons.addEventListener("click", e => {
    console.log(e.target)
    if (e.target.matches(".btn-outline-primary")) {
        let value = e.target.dataset.url
        fetchApiRickad(value)
    }

    if (e.target.matches(".btn-outline-secondary")) {
        let value = e.target.dataset.url
        fetchApiRickad(value)
    }

})

function loaderFunction(){
    const loader=`<img class="loader" src="./assets/loader/my-loader.svg" alt="Loader">`
    $main.insertAdjacentHTML("afterbegin",loader)
}