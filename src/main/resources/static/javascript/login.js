const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username")
const loginPassword = document.getElementById("login-password")

const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:1000/api/v1/users'

const handleSubmit = async (e) => {
    e.preventDefault()

    let bodyObj = {
        username: loginUsername.value,
        password: loginPassword.value
    }
    const response = await fetch(`http://localhost:1000/api/v1/users/login`, {
        method:"POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })

        .catch(err => console.error(err.message))

    const responseArr = await response.json()

    if(response.status === 200){
        document.cookie = `userId=${responseArr[1]}`
        window.location.replace(responseArr[0])
    }
}

loginForm.addEventListener("submit", handleSubmit)