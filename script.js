// adding new note on clicking on the new button 
const addBtn = document.getElementById('addBtn')

// saving the textarea in the localStorage
const updateLSData =()=>{
    const textareaAll = document.querySelectorAll('textarea')
    let notes =[];
    textareaAll.forEach((note)=> notes.push(note.value))
    localStorage.setItem('notes',JSON.stringify(notes))
}

// function to add new note
const addNewNote=(text)=>{
    console.log(text)
    // creating the note div 
    const note = document.createElement('div')
    note.classList.add('notes')
    const htmlData = `    <div class="operations">
                            <button class="edit-btn"><i class="fas fa-edit"></i></button>
                            <button class="trash-btn"><i class="fas fa-trash"></i></button>
                        </div>
                        <div class="main ${text?"":"hidden"}"></div>
                        <textarea class="${text ? "hidden":""}"></textarea>`

    note.insertAdjacentHTML('afterbegin',htmlData)

    
    
    // getting the reference 
    editBtn = note.querySelector('.edit-btn')
    delBtn = note.querySelector('.trash-btn')
    mainDiv = note.querySelector('.main')
    textArea = note.querySelector('textarea')

    // adding the text 
    textArea.value = text
    mainDiv.innerHTML = text



    // delete the note on clicking on delBtn
    delBtn.addEventListener('click',()=>{
        note.remove()
    })

    // toggle the class 'hidden' on the click on the editBtn
    editBtn.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('change',(e)=>{
        const value = e.target.value;
        mainDiv.innerHTML = value
        updateLSData()
    })


    // adding the note to the note container
    document.querySelector('.notes-container').appendChild(note)

}


// getting the notes from the localStorage
const notes = JSON.parse(localStorage.getItem("notes"))

if(notes){
    notes.forEach((note)=>addNewNote(note))
    
}


// adding notes click on the addBtn
addBtn.addEventListener('click',()=>{
    addNewNote("")
})

