let updateForm= document.getElementById('edit-form');
let populateEdit= document.querySelector('#edit-form');

function editPerson(id) {
    console.log("clicked edit "+id);

    fetch('http://127.0.0.1:3000/users/'+id, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then(res => {
            if (res.ok) { console.log("edit request successful") }
            else { console.log("edit request unsuccessful") }
            return res
        })
        .then(function(res){ 
            return res.json()})
        .then(data => {
            console.log(data);
            personInformation=data;
            populateEdit.setAttribute("data-memberid",id);
            populateEditForm(personInformation);

    })
        .catch(error => console.log(error))
}

function populateEditForm(person){
    const fields1=['firstName','lastName','gender','age'];
    const fields2=['city','country'];

    fields1.forEach(name =>  populateEdit.querySelector(`#edit-${name}`).value = person[name]);
    fields2.forEach(name =>  populateEdit.querySelector(`#edit-${name}`).value = person.address[name]);

    populateEdit.querySelector("#edit-adress").value=person.address.streetAndNumber;
    populateEdit.querySelector("#edit-zip").value=person.address.postalCode;

    let radioboxes = document.querySelectorAll('input[name="edit-activity"]');
    radioboxes.forEach((radiobox) => {
        if(member.activity_class===radiobox.value){
            radiobox.checked=true;
        //console.log('api: '+member.activity_class+' si radio:'+ radiobox.value);=
        }
    });

    let checkboxes = document.querySelectorAll('input[name="edit-sports"]');
    checkboxes.forEach((checkbox) => {
        member.sports.forEach((m)=>{
            if(m===checkbox.value){
                checkbox.checked=true;
                //console.log('api: '+m+' si checkbox:'+ checkbox.value);
            }
        
     });
    });

}

updateForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    personInformation=null;
    getPersonInfoFromForm('edit');
    personInformation.id=populateEdit.dataset.memberid;

    saveEditPerson(personInformation)
        .then(() => saveEditPerson(personInformation))
        .then(() => updateCard(personInformation))
        .catch(error => console.error('Error:', error)) 

        populateEdit.reset();
 })


async function saveEditPerson(personInformation){

    fetch('http://127.0.0.1:3000/users/'+personInformation.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(personInformation)
            })
            .then(res => {
                if (res.ok) { 
                    console.log("HTTP request successful");
                }else { 
                    showToast(1);
                    console.log("HTTP request unsuccessful") 
                }
                return res
            })
            .then(function(res){ 
                return res.json()
            })
            .catch(error => console.log(error))
 }

function updateCard(personInformation){
    let singleMemberCard=document.querySelector(`.member-card[data-id='${personInformation.id}']`);
    singleMemberCard.outerHTML= renderPerson(personInformation) ;
    
 }
