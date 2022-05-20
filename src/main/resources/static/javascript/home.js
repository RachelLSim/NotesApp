//Cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1]

//DOM Elements
const submitForm = document.getElementById("note-form")
const noteContainer = document.getElementById("note-container")

//Modal Elements
let noteBody = document.getElementById('note-body')
let updateNoteBtn = document.getElementById('update-note-button')

const headers = {
    'Content-Type': 'application/json'
}

const baseURL = "http://localhost8080/api/v1/notes/"

function handleLogout(){
    let c = document.cookie.split(";")
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        body: document.getElementById("note-input").value
    }
    await addNote(bodyObj)
    document.getElementById("note-input").value = ''
}

async function addNote(obj){
    const response = await fetch(`${baseUrl}/user/${userId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        return getNotes(userId)
    }
}

async function getNotes(userId) {
    await fetch(`${baseUrl}user/${userId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createNoteCards(data))
        .catch(err => console.error)
}
 async function getNoteById(noteId){
    await fetch(baseUrl +noteId, {
        method: "GET",
        headers:headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))

 }

 async function handleNoteEdit(noteId){
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

 async function handleDelete(noteId) {
     await fetch(baseUrl + noteId, {
         method: "DELETE",
         headers: headers
     })
         .catch(err => console.error(err))

     return getNotes(userId)
 }

 //Helper Functions

//this function accepts an array of objects, loops through it and creates
//a notecard for each item and appends it to our container for notes

const createNoteCards = (array) => {
    noteContainer.innerHTML = ''
    array.forEach(obj => {
        let noteCard = document.createElement("div")
        notecard.classList.add("m-2")
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

//this function accepts an object as an arg and uses it to populate the fields within the modal as well as
//assign custom "data-" tag to the "save" button element

const populateModal = (obj) =>{
    noteBody.innerText = ''
    noteBody.innerText = obj.body
    updateNoteBtn.setAttribute('data-note-id', obj.id)
}

//invoke getNotes method

getNotes(userId)

//Event Listeners
submitForm.addEventListener("submit", handleSubmit)
updateNoteBtn.addEventListener("click", (e) => {
    let noteId = e.target.getAttribute('data-note-id')
    handleNoteEdit(noteId)
})