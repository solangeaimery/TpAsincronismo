const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// variables

const endPoint = "https://63855351875ca3273d3a9730.mockapi.io/Jobs/"
const cardSection = $("#cards-section")

const getJobs = () => {
    fetch(endPoint)
        .then(res => res.json())
        .then(data => {
            generateCards(data)
        })
}

getJobs()


const generateCards = (jobs) => {
    for (const { name, descripcion, imagen, experiencia} of jobs) {
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
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                ver detalles
            </button>
        </div>
    </div>
        `
    }
}