const BASE_URL = ' https://fsa-crud-2aa9294fe819.herokuapp.com/api/richard-stewart'

let events = []

const eventsContainer = document.getElementById('events')

async function getEvents() {
    try {
        const response = await fetch(`${BASE_URL}/events`)
        const json = await response.json()

    return json.data

    } catch(err) {
        console.error(err)
    }
    
}

const form = document.getElementById('edit')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = form.elements

    let {id, name, description, imageUrl } = formData

    const updatedObject = {
        name: name.value,
        description: description.value,
        imageUrl: imageUrl.value
    }

    console.log('updatedObject', JSON.stringify(updatedObject))
    const response = await fetch(`${BASE_URL}/events/${id.value}`, {
        body: JSON.stringify(updatedObject),
    })

    const json = await response.json()
    console.log(json)

    events = await getEvents()
    renderEvents()

})

function renderEvents() {

    const htmlEvents = events.map(eve => {
        let div = document.createElement('div')

        div.classname = 'card'
    
        div.innerHTML = `<h3>#${eve.id}</h3>
                        <img src=${eve.imageUrl} />
                        <h3>${eve.name}</h3>
                        <p>${eve.description}</p>`

        return div
    })
   eventsContainer.replaceChildren(...htmlEvents)
}

async function startApp() {
    events = await getEvents()

    renderEvents()
}

startApp()