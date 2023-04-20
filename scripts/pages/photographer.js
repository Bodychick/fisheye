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
    let nbLikes=0;
    const photographersSection = document.querySelector(".medias_section");
    console.log(medias);
    medias.forEach((media) => {
        console.log(media);
        const mediaModel = mediaFactory(media);
        const userCardDOM = mediaModel.getMediaCardDom();
        nbLikes=nbLikes+media.likes;
        photographersSection.appendChild(userCardDOM);
    });
    let priceConteneur = document.getElementById("price");
    priceConteneur.textContent = nbLikes+ " likes, " + priceConteneur.textContent;
};

async function displayHeaderPhotographer(resultPhotographer) {
    const image=document.getElementById("image_photographer");
    const namePhotographer = document.getElementById("name");
    const location = document.getElementById("location");
    const tagline = document.getElementById("tagline");
    console.log(resultPhotographer);
    namePhotographer.textContent=resultPhotographer.name;
    location.textContent=resultPhotographer.city + ", " + resultPhotographer.country;
    tagline.textContent=resultPhotographer.tagline;
    image.src= `assets/photographers/${resultPhotographer.portrait}`;

    const mainSection = document.getElementById("main");
    const element = document.createElement("p");
    element.setAttribute("id","price");
    element.textContent= resultPhotographer.price +" € / jour"
    mainSection.appendChild(element);
}

async function init(){
    // récupère l'URL
    const url = new URL(window.location.href); 
    const params = new URLSearchParams(url.search);
    // Récupérer la valeur de l'id
    const id = params.get('id');
    console.log(id)

    var photographers = await getPhotographers();
    let resultPhotographer = await photographers.filter(photographer =>photographer.id==id);
    console.log(resultPhotographer)
    displayHeaderPhotographer(resultPhotographer[0]);

    var medias = await getMediaByPhotographer();
    //console.log(medias)
    let result = medias.filter(media => media.photographerId==id);
    console.log(result);

    displayData(result);
}

init();