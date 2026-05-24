const form = document.getElementById("eventform")
const formMessage = document.getElementsByClassName("form-message")[0]

form.addEventListener("submit", function(event){
    event.preventDefault();

    const title = document.getElementById("title").value
    const category = document.getElementById("category").value
    const details = document.getElementById("details").value

    if(!title || !category || !details){
        formMessage.textContent = "Please Complete All Fields!"

        return
    }

    console.log(title, category, details)

})

console.log(form)