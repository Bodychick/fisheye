//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    return fetch('data/photographers.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        photographers2 = data.photographers;
        console.log(photographers2);
        return photographers2; // Affiche les données des photographes dans la console
    })
    .catch(error => {
        console.error(error);
    });   
    // et bien retourner le tableau photographers seulement une fois récupéré
}

async function getMediaByPhotographer() {
    let photographers2=[];
    return fetch('data/photographers.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        photographers2 = data.media;
        console.log(photographers2);
        return photographers2; // Affiche les données des photographes dans la console
    })
    .catch(error => {
        console.error(error);
    });
    
    // et bien retourner le tableau photographers seulement une fois récupéré
}

async function displayData(medias) {
    const photographersSection = document.querySelector(".medias_section");
    console.log(medias);
    medias.forEach((media) => {
        console.log(media);
        const mediaModel = mediaFactory(media);
        const userCardDOM = mediaModel.getMediaCardDom();
        photographersSection.appendChild(userCardDOM);
    });
};

async function displayPhotographerInfo(photographer){
    const mainSection = document.getElementById("main");
}

async function init(){
    // récupère l'URL
    const url = new URL(window.location.href); 
    const params = new URLSearchParams(url.search);
    // Récupérer la valeur de l'id
    const id = params.get('id');

    var photographers = await getPhotographers();
    let resultPhotographer = photographers.filter(photographer =>photographer.photographerId==id);

    var medias = await getMediaByPhotographer();
    //console.log(medias)
    let result = medias.filter(media => media.photographerId==id);
    console.log(result);

    displayData(result);
}

init();