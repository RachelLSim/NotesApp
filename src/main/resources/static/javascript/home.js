//Cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1]

//DOM Elements
const submitForm = document.getElementById("note-form")
const noteContainer = document.getElementById("note-container")

//Modal Elements
let noteBody = document.getElementById("note-body")
let updateNoteBtn = document.getElementById("update-note-button")

const headers = {
    'Content-Type': 'application/json'
}
const baseUrl = "http://localhost:1000/api/v1/notes/"



const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        body: document.getElementById("note-input").value
    }
    await addNote(bodyObj)
    document.getElementById("note-input").value = ''
}
//matthew doesn't have "async function" he has "const"
const addNote = async(obj) => {
    const response = await fetch(`http://localhost:1000/api/v1/notes/users/${userId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        return getNotes(userId)
    }
}

const getNotes = async(userId) => {
    await fetch(`http://localhost:1000/api/v1/notes/users/${userId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createNoteCards(data))
        .catch(err => console.error(err))
}
 const handleDelete = async(noteId) => {
     await fetch(baseUrl + noteId, {
         method: "DELETE",
         headers: headers
     })
         .catch(err => console.error(err))
     return getNotes(userId)
 }
const getNoteById = async (noteId) => {
    await fetch(baseUrl + noteId, {
        method: "GET",
        headers:headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))

 }

 const handleNoteEdit = async (noteId) => {
    let bodyObj = {
        id: noteId,
        body: noteBody.value
    }
    await fetch(baseUrl, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err))
     return getNotes(userId)
 }


 //Helper Functions

//this function accepts an array of objects, loops through it and creates
//a notecard for each item and appends it to our container for notes

const createNoteCards = async (array) => {
    noteContainer.innerHTML = ''
    array.forEach(obj => {
        let noteCard = document.createElement("div")
        noteCard.classList.add("m-2")
        // language=HTML
        noteCard.innerHTML =`
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column justify-content-between" style="height: available">
                    <p class="card-text">${obj.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                        <button onclick="getNoteById(${obj.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#note-edit-modal">Edit</button>
                    </div>
                </div>
            </div>`

        noteContainer.append(noteCard)
    })
}

function handleLogout(){
    let c = document.cookie.split(";")
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}
//this function accepts an object as an arg and uses it to populate the fields within the modal as well as
//assign custom "data-" tag to the "save" button element

const populateModal = (obj) => {
    noteBody.innerText = ''
    noteBody.innerText = obj.body
    updateNoteBtn.setAttribute('data-note-id', obj.id)
}

//invoke getNotes method

getNotes(userId).then(value => console.log("Handler 1"))

//Event Listeners
submitForm.addEventListener("submit", handleSubmit)
updateNoteBtn.addEventListener("click", (e) => {
    let noteId = e.target.getAttribute('data-note-id')
    handleNoteEdit(noteId)
})
