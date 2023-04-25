const formModal = document.getElementById("form-modal");
const nameModal = document.getElementById("nameModal");
const lastNameModal = document.getElementById("lastNameModal");
const emailModal = document.getElementById("email");
const messageModal = document.getElementById("message");
const contactBouton = document.getElementById("contactBouton");
const buttonSubmit = document.getElementById("buttonSubmit");
/*let valideForm = {
    "nameModal":false,
    "lastNameModal":false,
    "email":false,
    "message":false
}*/
let valideForm = {
    "nameModal":true,
    "lastNameModal":true,
    "email":true,
    "message":true
}

//CONST REGEX
const regexName =/^[a-zA-Z-éèê]{2,}$/;
const regexMail =/^[a-zA-Z0-9.éèê_+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

//action URL
buttonSubmit.addEventListener("click",formModalValidation);

/*nameModal.addEventListener("input",function verifRegex($name){
    console.log(regexName.test(nameModal.value));
    if (regexName.test(nameModal.value)==false)
    {
      valideForm[$name.name]=false;
      nameModal.validity.valid;
    }
    else {
      valideForm[$name.name]=true;
      nameModal.validity.valid=false;
    }
});*/

//Verifier si tous les éléments du tableau de vérification
function toutesLesValeursSontVraies(valideForm) {
    for (var val in valideForm) {
      if (valideForm[val] === false) {
        return false;
      }
    }
    return true;
  }

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

contactBouton.addEventListener("click",displayModal);

function closeModal() {
    const modal = document.getElementById("contact_modal");
    console.log("click")
    modal.style.display = "none";
}

function formModalValidation(event){

    if (toutesLesValeursSontVraies(valideForm)){
        console.log("toutes les valeurs sont true");
        closeModal();
        console.log(formModal);
        formModal.reset();
        event.preventDefault();
    }
    event.preventDefault();
    
}






