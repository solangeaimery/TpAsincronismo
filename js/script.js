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

const deleteJob = (id) => {
    fetch(`https://63855351875ca3273d3a9730.mockapi.io/Jobs/${id}`, {
        method: "DELETE"
    }).finally(() => window.location.href = "index.html")
}

const editJob = (id) => {
    fetch(`https://63855351875ca3273d3a9730.mockapi.io/Jobs/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJob())
    }).finally(() => window.location.href = "index.html")
}

const AddNewJob = () => {
    fetch(`https://63855351875ca3273d3a9730.mockapi.io/Jobs/`, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveNewJob())
    }).finally(() => window.location.href = "index.html")
}

//***********************DOM************************//
const generateCards = (jobs) => {
    $("#card-detail-section").classList.add("hidden")
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
    $("#card-detail-section").classList.remove("hidden")
    const { id, name, imagen, descripcion, experiencia, tipo, locacion } = data
    cardDetailSection.innerHTML += `
        <div id="card-details" class="shadow-md h-fit mt-9">
        <div class="flex justify-center">
            <img src="${imagen}" alt="${name}">
        </div>
        <div>
            <h3 class="text-xl m-2">${name}</h3>
            <p class="m-1">${descripcion}</p>
        </div>
        <div class="m-2">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">${experiencia}</span>
        </div>
        <div class="m-2">
                <span
                class="inline-block px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2">
                <i class="fa-solid fa-location-dot inline-block px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"></i>
                ${locacion}
                </span>
        </div>
        <div id="btn-container-detail" class="flex justify-end items-end m-2">
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
    $("#name-edit-Job").value = name
    $("#edit-description").value = descripcion
    $("#edit-imagen").value = imagen
    $("#experiencia-edit").value = experiencia
    $("#tipe-edit").value = tipo

    $("#save-edit-job-btn").setAttribute("data-id", id)


    for (const btn of $$(".btn-delete-job")) {
        btn.addEventListener("click", () => {
            const jobId = btn.getAttribute("data-id")
            $("#delete-job-modal").setAttribute("data-id", jobId)
            $("#delete-job-modal").classList.remove("hidden")
        })
    }

    for (const btn of $$(".btn-edit-job")) {
        btn.addEventListener("click", () => {
            $("#edit-job-form").classList.remove("hidden")
            const jobId = btn.getAttribute("data-id")
            $("#edit-job-form").setAttribute("data-id", jobId)
            $("#btn-container-detail").classList.add("hidden")

        })
    }
}

const saveJob = () => {
    return {
        name: $("#name-edit-Job").value,
        descripcion: $("#edit-description").value,
        imagen: $("#edit-imagen").value,
        experiencia: $("#experiencia-edit").value,
        tipo: $("#tipe-edit").value,
    }
}

const saveNewJob = () => {
    return {
        name: $("#name-add-Job").value,
        descripcion: $("#add-job-descripcion").value,
        imagen: $("#modal-imagen").value,
        experiencia: $("#experiencia-modal").value,
        tipo: $("#tipo-modal").value,
    }
}


//******************Functionality*******************//

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

$("#btn-delete-job-modal").addEventListener("click", () => {
    const jobId = $("#delete-job-modal").getAttribute("data-id")
    deleteJob(jobId)
    $("#delete-job-modal").classList.add("hidden")

})

$("#btn-cancel-job-modal").addEventListener("click", () => {
    $("#delete-job-modal").classList.add("hidden")
})

const editJobEvent = () => {
    console.log("holu")
}

$("#edit-form").addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("holu")
})

//no logro que me funcionen con eventos de tipo click ni con submit en el form. raaro.
const editFormSave = () => {
    const jobId = $("#save-edit-job-btn").getAttribute("data-id")
    editJob(jobId)
}

const editFormCancel = () => {
    $("#edit-job-form").classList.add("hidden")
    $("#btn-container-detail").classList.remove("hidden")
}



