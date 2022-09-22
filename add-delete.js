let addForm = document.getElementById('add-form');
let memberInformation;

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

function getMemberInfoFromForm(type){
    let prefix="";
    if(type=="edit"){
        prefix="edit-";
    }
    let firstName=document.getElementById(prefix+'firstName').value;
    let lastName=document.getElementById(prefix+'lastName').value;
    let adress=document.getElementById(prefix+'adress').value;
    let zip=document.getElementById(prefix+'zip').value;
    let city=document.getElementById(prefix+'city').value;
    let country=document.getElementById(prefix+'country').value;
    let gender=document.getElementById(prefix+'gender').value;
    let age=document.getElementById(prefix+'age').value;

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

     
    memberInformation={
        firstName:firstName,
        lastName:lastName,
        address:{
            streetAndNumber:adress,
            postalCode:zip,
            city:city,
            country:country
        },
        sports:sports,
        gender:gender,
        age:age,
        activity_class:activity[0]
        }

}


addForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    memberInformation=null;
    getMemberInfoFromForm('add');
    
    fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(memberInformation)
    })
    .then(res => {
        if (res.ok) { 
            //alert("add request successful");
            showToast(0);
            addForm.reset();
            memberCard.innerHTML += renderPerson(memberInformation) ;
            
        } else { alert("add request unsuccessful") }
        return res
    })
    .then(function(response){ 
        return response.json()})
    .catch(error => console.error('Error:', error)); 
});
      

function deletePerson(domElement){
    let id=domElement.dataset.id;
    console.log("clicked detele "+id);
    fetch('http://127.0.0.1:3000/users/'+id, {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(res => {
            if (res.status===200) { 
                domElement.remove();
                alert("Delete person successful") 
            }else { 
                alert("Delete person unsuccessful") 
            }
            return res
    })
    .catch(error => console.log(error))
    }


