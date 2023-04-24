//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    return fetch('data/photographers.json')
    .then(response => {
        return response.json();
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
    if(photographersSection.childElementCount>0)
    {
        while(photographersSection.firstChild){
            photographersSection.removeChild(photographersSection.firstChild);
        }
    }
    console.log(medias);
    medias.forEach((media) => {
        console.log(media);
        const mediaModel = mediaFactory(media);
        const userCardDOM = mediaModel.getMediaCardDom();
        nbLikes=nbLikes+media.likes;
        photographersSection.appendChild(userCardDOM);
    });
    let priceConteneur = document.getElementById("price");
    const likesConteneur = document.getElementById("likes")
    if(likesConteneur == null){
        const likes = document.createElement("span");
        likes.setAttribute("id","likes");
        const iconLikes = document.createElement("i");
        iconLikes.classList.add("fa-solid","fa-heart");
        console.log(iconLikes)
        likes.textContent=+ nbLikes + "   ";
        likes.appendChild(iconLikes);
        console.log(likes)
        priceConteneur.insertBefore(likes, priceConteneur.firstChild);
        console.log("tout est passé")
    }
    
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
    const price = document.createElement("span")
    price.setAttribute("id","priceConteneur");
    price.textContent= resultPhotographer.price +" € / jour"
    element.appendChild(price);
    mainSection.appendChild(element);
}

function switchTri(data,value){
    switch(value){
        case 'date':
            data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
                });
            console.log(data);
        return data;
        case 'popular':
            data.sort(function(a,b){
                // to get a value that is either negative, positive, or zero.
                return (b.likes) - (a.likes);
                });
            console.log(data);
            return data;
        case 'title':
            data.sort((a, b) => a.title.localeCompare(b.title));
            console.log(data);
            return data;

        default:
            console.log("erreur")
        break;
    }
}

async function triMedias(data){
    console.log("en arrivant dans la fonction trimedia")
    console.log(data)
    const selectTri = document.getElementById("select_filter");
    selectTri.addEventListener("input", function(){
        let value = selectTri.value;
        console.log(value)
        data  = switchTri(data, value);
        displayData(data);
    });
    return data;
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
    // Récupérer les données filtrées
    console.log("avant letri média")
    console.log(result)
    result = await triMedias(result);
    console.log(result);
    result  = switchTri(result, "popular");
    displayData(result);
}

init();