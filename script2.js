const addBtn = document.getElementById("addBtn")

const updateLSData = ()=>{
    const textareaAll = document.querySelectorAll('textarea')
    const notes = []

    textareaAll.forEach((curEle)=>{
        return notes.push(curEle.value)
    })
    localStorage.setItem('notes',JSON.stringify(notes))
}

const addNewNote = (text="")=>{
    const note = document.createElement("div")
    note.classList.add("notes")
    const htmlData = ` 
    <div class="operations">
    <button class="edit-btn"><i class="fas fa-edit"></i></button>
    <button class="trash-btn"><i class="fas fa-trash"></i></button>
</div>
<div class="main ${text?"":"hidden"} "></div>
<textarea class="${text ? "hidden":""}"></textarea>
    `
    note.insertAdjacentHTML("afterbegin",htmlData)

    // getting the refernces
    const editBtn = note.querySelector('.edit-btn')
    const delBtn = note.querySelector('.trash-btn')
    const mainDiv = note.querySelector('.main')
    const textarea = note.querySelector('textarea')

    delBtn.addEventListener('click',()=>{
        note.remove()
        updateLSData()
    })

    textarea.value = text
    mainDiv.innerHTML = text

    // toggle using edit btn 
    editBtn.addEventListener('click',()=>{
        textarea.classList.toggle('hidden')
        mainDiv.classList.toggle('hidden')
    })

    textarea.addEventListener('change',(e)=>{
        const value = e.target.value
        mainDiv.innerHTML = value
        updateLSData();
    })


    document.querySelector('.notes-container').appendChild(note)

    
}

// getting data from the localStorage
const notes = JSON.parse(localStorage.getItem('notes'))
if(notes){
    notes.forEach((note)=>addNewNote(notes))
}

addBtn.addEventListener('click',()=>{
    addNewNote()
})