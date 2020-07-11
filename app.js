console.log("My Notes Application")
showNotes()

let addNotes = document.getElementById('addbtn')
addNotes.addEventListener('click', function (event) {
    let text = document.getElementById('addtxt')
    let title = document.getElementById('title')
    let notes = localStorage.getItem('notes')

    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }

    let myObj = {
        title: title.value,
        text: text.value
    }
    notesObj.push(myObj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    console.log(notesObj)
    text.value = ''
    title.value = ''
    showNotes()
})

function showNotes() {
    let notes = localStorage.getItem('notes')

    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    Array.from(notesObj).forEach((element, index) => {
        html += `
        <div class=" my-2 mx-2 card cardNotes" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id = "${index}" onClick = "DeleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>
                `;
    })
    let notesele = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesele.innerHTML = html
    } else {
        notesele.innerHTML = '<h2>Nothing to show</h2>';
        console.log(notesele.innerHTML)
    }
}

function DeleteNote(index) {
    let notes = localStorage.getItem('notes')

    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index, 1)
    // console.log(notesObj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}

let search = document.getElementById('searchtxt')
search.addEventListener('input', (event) => {
    // console.log(search.value)
    let cardNotes = document.getElementsByClassName('cardNotes')
    // console.log(cardNotes)
    Array.from(cardNotes).forEach((element) => {
        // console.log(element)
        // console.log(element.textContent)
        let searchedelement = element.getElementsByTagName('p')[0]
        searchedelement = searchedelement.innerText
        if (searchedelement.includes(search.value)) {
            element.style.display = "block";
        } else {
            element.style.display = "None";
        }
    })
})