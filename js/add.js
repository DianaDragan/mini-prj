let addForm = document.getElementById('add-form');
let personInformation;



function getPersonInfoFromForm(type){
    let prefix="";
    if(type=="edit"){
        prefix="edit-";
    }
    let fields=['firstName', 'lastName', 'adress', 'zip', 'city', 'country', 'gender', 'age']
    fields.forEach(name=> fields[name]=document.getElementById(`${prefix}${name}`).value)

    let checkboxes = document.querySelectorAll('input[name="'+prefix+'sports"]:checked');
    let sports = [];
    checkboxes.forEach((checkbox) => {
        sports.push(checkbox.value);
    });

    let radioboxes = document.querySelectorAll('input[name="'+prefix+'activity"]:checked');
    let activity=[];
    radioboxes.forEach((radiobox) => {
        activity.push(radiobox.value);
    });

     
    personInformation={
        firstName:fields.firstName,
        lastName:fields.lastName,
        address:{
            streetAndNumber:fields.adress,
            postalCode:fields.zip,
            city:fields.city,
            country:fields.country
        },
        sports:sports,
        gender:fields.gender,
        age:fields.age,
        activity_class:activity[0]
        }

}


addForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    memberInformation=null;
    getMemberInfoFromForm('add');
    
    savePerson(personInformation)
    .then(() => memberCard.innerHTML += renderPerson(personInformation))
    .catch(error => console.error('Error:', error)) 
});
      

async function savePerson(personInformation){
    
    fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(personInformation)
    })
    .then(res => {
        if (res.ok) { 
            //alert("add request successful");
            showToast(0);
            addForm.reset();
            
        } else { alert("add request unsuccessful") }
        return res;
    })
}

