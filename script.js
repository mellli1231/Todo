//check if using local storage by searching for 'items'
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []; //set items to an empty array if not
let originalTask = []; //store original tasks before edit
let darkOn = localStorage.getItem("darkMode") ? JSON.parse(localStorage.getItem("darkMode")) : false;

console.log(itemsArray); //view array in console
console.log(darkOn); //view theme in console

document.querySelector("#enter").addEventListener("click", () => { //enter button
    const item = document.querySelector("#item"); //get item
    createItem(item);
});

document.querySelector("#item").addEventListener("keypress", (event) => { //enter key
    if (event.key === "Enter") {
        const item = document.querySelector("#item");
        createItem(item);
    }
});

function createItem(item){ //create item
    itemsArray.push(item.value) //store item onto array
    localStorage.setItem("items", JSON.stringify(itemsArray)) //store array into local storage
    location.reload()
}

function displayItems(){
    let items = ""
    for(let i = 0; i < itemsArray.length; i++) { //display each item
        items +=  `<div class="item">
                    <div class="input-controller">
                        <textarea disabled>${itemsArray[i]}</textarea>
                        <div class="edit-controller">
                            <i class="fa-solid fa-square-check deleteBtn"></i> 
                            <i class="fa-solid fa-pen-to-square editBtn"></i> 
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class = "saveBtn">Save</button>
                        <button class = "cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".todo-list").innerHTML = items //todo_list is the items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn") //get all delete buttons/checkmarks
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => {deleteItem(i)}) //delete item where button was clicked
    })
}

function deleteItem(i) { //delete item from array
    itemsArray.splice(i, 1) //remove 1 item at index i
    localStorage.setItem("items", JSON.stringify(itemsArray)) //store array into local storage
    location.reload() //refresh page
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn") //access all edit buttons
    const updateController = document.querySelectorAll(".update-controller") //access save and cancel buttons
    const inputs = document.querySelectorAll(".input-controller textarea") //access all text areas
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => { //when edit button is clicked
            updateController[i].style.display = "block" //display save and cancel button
            originalTask[i] = itemsArray[i]; //store original text
            inputs[i].disabled = false //allow for edit
        })
    })
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn") //access all save buttons
    const updateController = document.querySelectorAll(".update-controller") //access all save and cancel buttons
    const inputs = document.querySelectorAll(".input-controller textarea") //access all text areas
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => { //if save button clicked       
            updateController[i].style.display = "none" //hide save and cancel button
            updateItem(inputs[i].value, i) //update and save new input    
        })
    })
}

function updateItem(text, i) {
    itemsArray[i] = text //store new value
    localStorage.setItem("items", JSON.stringify(itemsArray)) //update local storage
    location.reload() //reload page
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn") //access all cancel buttons
    const updateController = document.querySelectorAll(".update-controller") //access all save and cancel buttons
    const inputs = document.querySelectorAll(".input-controller textarea") //access all text areas
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none" //hide save and cancel button
            inputs[i].value = originalTask[i]; //revert to original text
            inputs[i].disabled = true //unable to edit anymore
        })
    })
}

function displayDate() { //display the date
    let date = new Date()
    date = date.toString().split(" ") //get date string array
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

function activateThemeListener() {
    const themeButton = document.getElementById('theme') //get button
    const iconElement = themeButton.querySelector('i') //get icon
    themeButton.addEventListener("click", () => { //when click theme button, change theme
        darkOn = !darkOn //change theme value in local storage
        applyTheme(darkOn, iconElement) 
        localStorage.setItem("darkMode", JSON.stringify(darkOn))
    })
}

function applyTheme(darkOn, iconElement) {
    if (darkOn) { //apply dark theme
        document.body.classList.add('dark-theme') //toggle dark-theme
        iconElement.classList.remove('fa-moon') //toggle icon
        iconElement.classList.add('fa-sun')
    }
    else { //apply light theme
        document.body.classList.remove('dark-theme') //toggle dark-theme
        iconElement.classList.add('fa-moon') //toggle icon
        iconElement.classList.remove('fa-sun')
    }
}

window.onload = function() {//display when page loads
    const themeButton = document.getElementById('theme') 
    const iconElement = themeButton.querySelector('i')
    applyTheme(darkOn, iconElement)
    activateThemeListener()
    displayDate()
    displayItems()
}