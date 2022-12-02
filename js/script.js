const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)


// variables

const endPoint = "https://63855351875ca3273d3a9730.mockapi.io/Jobs/"
const cardSection = $("#cards-section")
const cardDetailSection = $("#card-detail-section")
const headerContainer = $("#header-container")
const btnDetail = $$(".btn-detail")
const formSection = $("#form-section")
const boxBanner = $(".box-banner")



//**************fetchs*************//
const getJobs = () => {
    fetch(endPoint)
        .then(res => res.json())
        .then(data => {
            generateCards(data)
        })
}

getJobs()


const getJob = (id) => {
    fetch(`https://63855351875ca3273d3a9730.mockapi.io/Jobs/${id}`)
        .then(res => res.json())
        .then(data => {
            generateDetailCard(data)

        })
}

//***********************DOM************************//
const generateCards = (jobs) => {
    for (const { id, name, descripcion, imagen, experiencia } of jobs) {
        cardSection.innerHTML += `
        <div id="card">
        <div class="flex justify-center">
            <img src="${imagen}" alt="${name}">
        </div>
        <div>
            <h3 class="text-lg m-2">${name}</h3>
            <p class="m-1">${descripcion}</p>
        </div>
        <div class="m-2">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">${experiencia}</span>
        </div>
        <div class="flex justify-end items-end m-2">
            <button
                class="btn-detail bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" data-id="${id}">
                ver detalles
            </button>
        </div>
    </div>
        `
    }
    for (const btn of $$(".btn-detail")) {
        btn.addEventListener("click", () => {
            const jobId = btn.getAttribute("data-id")
            getJob(jobId)
            formSection.classList.add("hidden")
            cardSection.classList.add("hidden")
            boxBanner.classList.add("hidden")
        })
    }
}

const generateDetailCard = (data) => {
    const { id, name, imagen, descripcion, experiencia } = data
    cardDetailSection.innerHTML += `
        <div id="card-details">
        <div class="flex justify-center">
            <img src="${imagen}" alt="${name}">
        </div>
        <div>
            <h3 class="text-lg m-2">${name}</h3>
            <p class="m-1">${descripcion}</p>
        </div>
        <div class="m-2">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">${experiencia}</span>
        </div>
        <div class="flex justify-end items-end m-2">
            <button
                class="btn-edit-job bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" data-id="${id}">
                Editar trabajo
            </button>
            <button
                class="btn-delete-job bg-white hover:bg-gray-100 text-red-600 font-semibold py-2 px-4 border border-red-600 mx-1 rounded shadow" data-id="${id}">
                Eliminar trabajo
            </button>
        </div>
    </div>

        `
    for (const btn of $$(".btn-delete-job")) {
        btn.addEventListener("click", () => {
            const jobId = btn.getAttribute("data-id")
            $("#delete-job-modal").setAttribute("data-id", jobId)
            $("#delete-job-modal").classList.remove("hidden")
        })
    }
}

//******************Functionality*******************//

const deleteJob = (id) => {
    fetch(`https://63855351875ca3273d3a9730.mockapi.io/Jobs/${id}`, {
        method: "DELETE"
    }).finally(() => window.location.href = "index.html")
}

//funcionalidad y eventos de modal

//variables
const addJobModal = $("#add-job-modal")
const addJob = $("#add-job")
const saveModalBtn = $("#save-modal-btn")
const cancelModalBtn = $("#cancel-modal-btn")


addJob.addEventListener("click", (e) => {
    e.preventDefault()
    addJobModal.classList.remove("hidden")
})

cancelModalBtn.addEventListener("click", () => {
    addJobModal.classList.add("hidden")
})



