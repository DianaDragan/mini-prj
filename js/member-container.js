let persons=[];
let memberCard= document.querySelector('.members-container');

function initListeners(){
    memberCard.addEventListener('click', (e) =>{
        if(e.target.classList.contains("edit-member")){
            editPerson(e.target.parentElement.dataset.id);
        }
    
        if(e.target.classList.contains("delete-member")){
            deletePerson(e.target.parentElement);

        }
    })
}

async function getPersons(){
    let response = await fetch('http://127.0.0.1:3000/users')
    let personsResponse= await response.json();
    persons = personsResponse;
    //renderPersons();
}
getPersons().then( ()=>renderPersons());

function renderPersons(){
    persons.forEach(person => {
        memberCard.innerHTML+=renderPerson(person);
    });
    initListeners();
}


function renderPerson(person){
    return `
    <div class="member-card " data-id="${person.id}">
    <div class="icon" > <h1>D</h1> </div>
    <div class="member-data">
        <p class="member-name">
            ${person.firstName} ${person.lastName}
        </p>
        <p class="member-details">
            ID: ${person.id}
        </p>
        <p class="member-details">
            ${person.gender}
        </p>
    </div>
    <button class="edit edit-member" >Edit</button>
    <button class="delete delete-member">Delete</button>
    </div>`;
    
 }

 
