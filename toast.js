let added= document.getElementById("toast-add");
let rejected=document.getElementById('toast-err');

function showToast(msg){
    if(msg===0){
       added.style.visibility="visible";
        setTimeout(function(){ added.style.visibility="hidden"; },5000);
       added.style.visibility="visible";
           
    }else{
        rejected.style.visibility="visible";
        setTimeout(function(){ rejected.style.visibility="hidden"; },5000);
        rejected.style.visibility="visible";
    
    }
}