const formModal = document.getElementById("form-modal");
const nameModal = document.getElementById("nameModal");
const lastNameModal = document.getElementById("lastNameModal");
const emailModal = document.getElementById("email");
const messageModal = document.getElementById("message");
const contactBouton = document.getElementById("contactBouton");
const buttonSubmit = document.getElementById("buttonSubmit");
const fermetureModal = document.getElementById("fermeture-modal");

let valideForm = {
    "nameModal":false,
    "lastNameModal":false,
    "email":false,
    "message":false
}

//CONST REGEX
const regexName =/^[a-zA-Z-éèê]{2,}$/;
const regexMail =/^[a-zA-Z0-9.éèê_+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
const regexMessage = /^[a-zA-Z0-9\s,'-()éèêàâ]*$/;

//action URL
buttonSubmit.addEventListener("click",formModalValidation);

nameModal.addEventListener("input", function()
{
  verifRegex(nameModal, regexName);
});

lastNameModal.addEventListener("input", function()
{
  verifRegex(lastNameModal, regexName);
});

emailModal.addEventListener("input", function(){
  verifRegex(emailModal, regexMail);
});

messageModal.addEventListener("input", function(){
  verifRegex(messageModal,regexMessage);
})

// Vérification des champs en fonction de chaque regex
function verifRegex($name, $regex){
    console.log($regex.test($name.value));
    if ($regex.test($name.value)==false)
    {
      valideForm[$name.name]=false;
      $name.style.border = "2px solid red";
    }
    else {
      valideForm[$name.name]=true;
      $name.style.border = "2px solid green";
    }
  }

  fermetureModal.addEventListener("click",function(event){
    event.preventDefault();
    closeModal();
  });

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

buttonSubmit.addEventListener("click", formModalValidation)

//Validation de la modal de contact
function formModalValidation(event){
  console.log(valideForm);
  verifRegex(nameModal, regexName);
  verifRegex(lastNameModal, regexName); 
  verifRegex(emailModal, regexMail);
  verifRegex(messageModal,regexMessage);

    if (toutesLesValeursSontVraies(valideForm)){
        
        console.log("toutes les valeurs sont true");
        console.log("Prénom :" + nameModal.value);
        console.log("Nom :" + lastNameModal.value);
        console.log("Email :" + emailModal.value);
        console.log("Message :" +messageModal.value);
        closeModal();
        formModal.reset();
        valideForm = {
          "nameModal":false,
          "lastNameModal":false,
          "email":false,
          "message":false
      }
    }
    else {
      console.log("c'est faux")
    }
    event.preventDefault();
}






