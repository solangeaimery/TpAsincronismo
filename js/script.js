const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const hideElement = (selector) => selector.classList.add("hidden")
const unhideElement = (selector) => selector.classList.remove("hidden")

// variables
const cardSection = $("#cards-section")
const formSection = $("#form-section")
const boxBanner = $(".box-banner")
let arrDataJobs = []

//**************fetchs*************//
const getJobs = (isSearch) => {
    unhideElement($(".spinner"))
    fetch("https://63855351875ca3273d3a9730.mockapi.io/Jobs/")
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                if (isSearch) {
                    generateCards(data)
                }
                arrDataJobs = data
            }, 2000)
        })
}

getJobs(true)

const getJob = (id) => {
    unhideElement($(".spinner"))
    fetch(`https://63855351875ca3273d3a9730.mockapi.io/Jobs/${id}`)
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                generateDetailCard(data)
            }, 2000)
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
    cardSection.innerHTML = ""
    hideElement($("#card-detail-section"))
    hideElement($(".spinner"))

    for (const { id, name, descripcionCorta, imagen } of jobs) {
        cardSection.innerHTML += `
        <div id="card" class="h-fit w-min">
        <div class="flex justify-center ">
            <img src="${imagen}" alt="${name}">
        </div>
        <div>
            <h3 class="text-xl m-2">${name}</h3>
            <p class="m-1 text-sm">${descripcionCorta}</p>
        </div>
        <div class="flex justify-end items-end m-2">
            <button
                class="btn-detail text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" data-id="${id}">
                ver detalles
            </button>
        </div>
    </div>
        `
    }

    for (const btn of $$(".btn-detail")) {
        btn.addEventListener("click", () => {
            unhideElement($("#card-detail-section"))
            const jobId = btn.getAttribute("data-id")
            getJob(jobId)
            hideElement(formSection)
            hideElement(cardSection)
            hideElement(boxBanner)
        })
    }
}


const generateDetailCard = (data) => {
    hideElement($(".spinner"))
    const { id, name, imagen, descripcion,descripcionCorta, experiencia, tipo, locacion } = data
    $("#card-detail-section").innerHTML += `
        <div id="card-details" class="shadow-md h-fit w-fit m-7 p-4 md:w-1/3">
        <div class="flex justify-center">
            <img src="${imagen}" alt="${name}">
        </div>
        <div>
            <h3 class="text-xl m-2">${name}</h3>
            <p class="m-1 text-sm">${descripcion}</p>
        </div>
        <div class="m-2">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-4">${experiencia}</span>
        </div>
        <div class="m-2">
                <span
                class="inline-block px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2">
                <i class="fa-solid fa-location-dot inline-block px-3 py-1 text-lg font-semibold text-gray-700 mr-2 mb-2"></i>
                ${locacion}
                </span>
        </div>
        <div id="btn-container-detail" class="flex justify-end items-end m-2">
            <button
                class="btn-edit-job bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-sm" data-id="${id}">
                Editar trabajo
            </button>
            <button
                class="btn-delete-job bg-white hover:bg-gray-100 text-red-600 font-semibold py-2 px-4 border border-red-600 mx-1 rounded shadow text-sm" data-id="${id}">
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
    $("#edit-job-descripcion-short").value = descripcionCorta
    $("#edit-location").value = locacion
    $("#save-edit-job-btn").setAttribute("data-id", id)


    for (const btn of $$(".btn-delete-job")) {
        btn.addEventListener("click", () => {
            const jobId = btn.getAttribute("data-id")
            $("#delete-job-modal").setAttribute("data-id", jobId)
            unhideElement($("#delete-job-modal"))
        })
    }

    for (const btn of $$(".btn-edit-job")) {
        btn.addEventListener("click", () => {
            unhideElement($("#edit-job-form"))
            const jobId = btn.getAttribute("data-id")
            $("#edit-job-form").setAttribute("data-id", jobId)
            hideElement($("#btn-container-detail"))

        })
    }
}

const saveJob = () => {
    return {
        name: $("#name-edit-Job").value,
        descripcion: $("#edit-description").value,
        descripcionCorta: $("#edit-job-descripcion-short").value,
        imagen: $("#edit-imagen").value,
        experiencia: $("#experiencia-edit").value,
        tipo: $("#tipe-edit").value,
        locacion: $("#edit-location").value
    }
}

const saveNewJob = () => {
    return {
        name: $("#name-add-Job").value,
        descripcion: $("#add-job-descripcion").value,
        descripcionCorta: $("#add-job-descripcion-short").value,
        imagen: $("#modal-imagen").value,
        experiencia: $("#experiencia-modal").value,
        tipo: $("#tipo-modal").value,
        locacion: $("#location-modal").value,
    }
}


//******************Functionality*******************//

//******filters*******//

const filterBy = (filter, property) => {
    const newArrFilter = arrDataJobs.filter(job => {
        if (filter === job[property]) {
            return job
        }
    })
    return arrDataJobs = newArrFilter
}

const inputsValueAll = () => {
    for (const input of $$(".input-value-all")) {
        if (input.value === "All") {
            arrDataJobs = arrDataJobs
        }
    }
}

const filterCards = () => {
    getJobs(false)
    inputsValueAll()
    hideElement($("#no-reults"))
    if ($("#filter-location").value !== "All") {
        filterBy($("#filter-location").value, "locacion")
    }
    if ($("#filter-type").value !== "All") {
        filterBy($("#filter-type").value, "tipo")
    }
    if ($("#filter-experience").value !== "All") {
        filterBy($("#filter-experience").value, "experiencia")
    }
    if (arrDataJobs.length === 0) {
        unhideElement($("#no-reults"))
    }
    return arrDataJobs

}

//funcionalidad y eventos de modal


$("#add-job").addEventListener("click", (e) => {
    e.preventDefault()
    unhideElement($("#add-job-modal"))
    hideElement($(".modal-form-error"))
})

$("#cancel-modal-btn").addEventListener("click", () => {
    hideElement($("#add-job-modal"))
})

$("#save-modal-btn").addEventListener("click", () => {
    if ($("#name-add-Job").value !== "" && $("#add-job-descripcion").value !== "" && $("#modal-imagen").value !== "") {
        AddNewJob()
    }
    else {
        unhideElement($(".modal-form-error"))
    }

})

$("#btn-delete-job-modal").addEventListener("click", () => {
    const jobId = $("#delete-job-modal").getAttribute("data-id")
    deleteJob(jobId)
    hideElement($("#delete-job-modal"))

})

$("#btn-cancel-job-modal").addEventListener("click", () => {
    hideElement($("#delete-job-modal"))
})

const editFormSave = () => {
    const jobId = $("#save-edit-job-btn").getAttribute("data-id")
    if ($("#name-edit-Job").value !== "" && $("#edit-description").value !== "" && $("#edit-imagen").value !== "" && $("#edit-job-descripcion-short").value !== "" ) {
        editJob(jobId)
    }
    else {
        unhideElement($(".form-edit-error"))
    }
}

const editFormCancel = () => {
    hideElement($("#edit-job-form"))
    unhideElement($("#btn-container-detail"))
}

$("#search-btn").addEventListener("click", (e) => {
    e.preventDefault()
    filterCards()
    generateCards(arrDataJobs)
})



