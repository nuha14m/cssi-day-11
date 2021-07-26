let googleUser = null
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user){//if user is logged in 
            console.log("Logged in as", user.displayName)
            googleUser = user
        }
        else{//not logged in 
            console.log("Not logged in")
        }
    })
   
const createNoteButton = document.querySelector("#createNoteButton")
createNoteButton.addEventListener("click",() => {
    const noteTitle = document.querySelector("#noteTitle").value
    const noteText = document.querySelector("#noteText").value
    console.log(noteTitle, noteText)

    firebase.database().ref(`/users/${googleUser.uid}`).push({
        title: noteTitle,
        text: noteText
    }).then(() =>{
        console.log("database write successful")
         document.querySelector("#noteTitle").value =""
         document.querySelector("#noteText").value = ""

    })
    .catch(error => {
        console.log("error writing new note: ", error)
    })

})
console.log(createNoteButton)
}