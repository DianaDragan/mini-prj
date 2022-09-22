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
            memberInformation=data;
            populateEdit.setAttribute("data-memberid",id);
            populateEditForm(memberInformation);

    })
        .catch(error => console.log(error))
}

function populateEditForm(member){
    populateEdit.querySelector("#edit-firstName").value=member.firstName;
    populateEdit.querySelector("#edit-lastName").value=member.lastName;
    populateEdit.querySelector("#edit-adress").value=member.address.streetAndNumber;
    populateEdit.querySelector("#edit-zip").value=member.address.postalCode;
    populateEdit.querySelector("#edit-city").value=member.address.city;
    populateEdit.querySelector("#edit-country").value=member.address.country;
    populateEdit.querySelector("#edit-gender").value=member.gender;
    populateEdit.querySelector("#edit-age").value=member.age;

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
    memberInformation=null;
    getMemberInfoFromForm('edit');
    memberInformation.id=populateEdit.dataset.memberid;

    fetch('http://127.0.0.1:3000/users/'+memberInformation.id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(memberInformation)
        })
        .then(res => {
            if (res.ok) { 
                let singleMemberCard=document.querySelector(`.member-card[data-id='${memberInformation.id}']`);
                singleMemberCard.outerHTML= renderPerson(memberInformation) ;
                populateEdit.reset();

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

 })