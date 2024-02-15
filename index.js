//Setup

const Base_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/erik-rodriguez/events'

let events = []

const eventsContainer = document.getElementById('events')

// Fetch Calls 

async function getEvents(){ 
    try{ 

        const response = await fetch(`${Base_URL}`)
        const json = await response.json()

        return json.data

    }catch(err){
        console.error(err)
    }
}   



//event listeners 


//render functions 

function renderEvents(){
    const htmlEvents = events.map(eve => {
        let div = document.createElement('div')
        div.className = 'card'
        div.innerHTML = `<h3>#${eve.id}</h3>
                         <h3>${eve.name}</h3> 
                         <h3>Time:${eve.date}</h3>
                        <h3>Location: ${eve.location}</h3>
                         <p>${eve.description}</p>`
    
     
    return div 
    })

eventsContainer.replaceChildren(...htmlEvents)    
}

async function startApp(){ 
    events = await getEvents()

    renderEvents()

}

startApp()