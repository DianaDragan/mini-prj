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


