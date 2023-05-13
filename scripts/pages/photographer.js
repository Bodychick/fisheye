
/*
    Récupération des données contenus dans le fichier json
*/ 
async function getPhotographers() {
    return fetch('data/photographers.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        photographers2 = data;
        return photographers2; 
    })
    .catch(error => {
        console.error(error);
    });       
}

/* Affichage de tous les médias 1 par 1 en lien avec la factory */
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
        const mediaModel = mediaFactory(media);
        console.log(mediaModel);
        const userCardDOM = mediaModel.getMediaCardDom();
        nbLikes=nbLikes+media.likes;
        photographersSection.appendChild(userCardDOM);
    });
    let priceConteneur = document.getElementById("price");
    const likesConteneur = document.getElementById("likes")
    if(likesConteneur == null){
        const likes = document.createElement("span");
        likes.setAttribute("id","likes");
        const likesValue = document.createElement("span");
        likesValue.classList.add("numberLikes");
        likesValue.setAttribute("id","likesValue");
        likesValue.textContent = nbLikes;
        likes.appendChild(likesValue);
        const iconLikes = document.createElement("i");
        iconLikes.classList.add("fa-solid","fa-heart");
        likes.textContent== nbLikes;
        likes.appendChild(iconLikes);
        priceConteneur.insertBefore(likes, priceConteneur.firstChild);
    }
    loadVisionneuse(medias);
    likeOnPhoto(medias);    
}

/* Affichage du header avec les informations sur photographe */
async function displayHeaderPhotographer(resultPhotographer) {
    const image=document.getElementById("image_photographer");
    const namePhotographer = document.getElementById("name");
    const location = document.getElementById("location");
    const tagline = document.getElementById("tagline");
    const nomPhotographerModal = document.getElementById("nomPhotographerModal");
    console.log(resultPhotographer);
    nomPhotographerModal.textContent =  nomPhotographerModal.textContent +": " + resultPhotographer.name
    namePhotographer.textContent=resultPhotographer.name;
    location.textContent=resultPhotographer.city + ", " + resultPhotographer.country;
    tagline.textContent=resultPhotographer.tagline;
    image.src= `assets/photographers/${resultPhotographer.portrait}`;

    // Création du bloc fixe avec les prix
    const mainSection = document.getElementById("main");
    const element = document.createElement("p");
    element.setAttribute("id","price");
    const price = document.createElement("span")
    price.setAttribute("id","priceConteneur");
    price.textContent= resultPhotographer.price +" € / jour"
    element.appendChild(price);
    mainSection.appendChild(element);
}

/* En fonction du click sur select, renvoie un tableau des valeurs triées */
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

/* Permet de faire le tri au click sur le select */ 
async function triMedias(data){
    console.log("en arrivant dans la fonction trimedia")
    console.log(data)
    const selectTri = document.getElementById("select_filter");
    const articles = document.getElementsByClassName("media");
    selectTri.addEventListener("input", function(){
        let value = selectTri.value;
        console.log(value);
        data  = switchTri(data, value);
        displayData(data);
    });
    return data;
}

/* Fonction d'initialisation */
async function init(){
    localStorage.clear();
    // récupère l'URL
    const url = new URL(window.location.href); 
    const params = new URLSearchParams(url.search);
    const articles = document.getElementsByClassName("media");
    //const image = document.getElementsByClassName("image");
    // Récupérer la valeur de l'id
    const id = params.get('id');
    console.log(id)

    var data = await getPhotographers();
    var photographers = data.photographers;
    console.log(photographers);
    var medias = data.media;
    console.log(medias);
    
    let resultPhotographer = await photographers.filter(photographer =>photographer.id==id);
    console.log(resultPhotographer)
    displayHeaderPhotographer(resultPhotographer[0]);

    //var medias = await getMediaByPhotographer();
    //console.log(medias)
    let result = medias.filter(media => media.photographerId==id);
    // Récupérer les données filtrées
    result = await triMedias(result);
    result  = switchTri(result, "popular");
    displayData(result);
}

function ajouterDansLocalStorage(id, like){
    const nomTableau = "photoLiked";
    // Récupération du tableau depuis le localStorage
    var tableauRecupere = localStorage.getItem(nomTableau);
    var idString = id.toString();

    if(tableauRecupere.length == 0){
        localStorage.setItem(nomTableau,idString);
    }
    else {
        // Récupération du tableau depuis le localStorage
        var tableauRecupere = localStorage.getItem(nomTableau);
        console.log("le tableau récupéré :");
        console.log(tableauRecupere);

        // Conversion de la chaîne de caractères en tableau
        var tableauFinal = tableauRecupere.split(" ");
        console.log(tableauFinal);
        if(like== "liked"){
            if(tableauFinal.includes(id)){
                //déjà liké donc n'apparait pas
            }
            else {
                //on ajouté l'élément liké
                tableauFinal.push(idString);
                var tableauEnChaine = tableauFinal.join(" ");
                console.log("On ajoute le nouvel élément :");
                console.log(tableauFinal);
            }
        }
        else {
            //suppression de l'élément déliké
            console.log(id);

            var filteredArray = tableauFinal.filter(function(element) {
                return element !== idString;
            });

            console.log("On supprime l'élément :");
            console.log(filteredArray);
            // Conversion en chaîne de caractères JSON
            tableauEnChaine = filteredArray.join(" ");
            
        }
        localStorage.setItem(nomTableau,tableauEnChaine);
    }
}

function likeOnPhoto(result){
    if(localStorage.getItem("photoLiked")== null){
        localStorage.setItem("photoLiked","")
    }
    const likes = document.querySelectorAll(".fa-heart");
    likes.forEach((like)=> {
        like.addEventListener("click", function incrementLikes(){
          const article = like.closest('.media');  
          const title = article.querySelector('figcaption span:first-child').textContent;
          var likes = result.filter(resul=> resul.title==title);
          index = result.indexOf(result.find(item => item.title === title));

          if(like.classList.contains("fa-regular"))
          {
            var bloc = like.parentNode.parentNode;
            var blocText = bloc.querySelector("#numberLikes").textContent;
            blocText = parseInt(blocText, 10) + 1;
            bloc.querySelector("#numberLikes").textContent = blocText;
            like.classList.replace("fa-regular","fa-solid");
            console.log(likes);
            ajouterDansLocalStorage(likes[0].id, "liked");
            modifyPriceBloc(1);
          }
          else if (like.classList.contains("fa-solid")) {
            var bloc = like.parentNode.parentNode;
            var blocText = bloc.querySelector("#numberLikes").textContent;
            blocText = parseInt(blocText, 10) - 1;
            bloc.querySelector("#numberLikes").textContent = blocText;
            like.classList.replace("fa-solid","fa-regular");
            console.log(likes);
            ajouterDansLocalStorage(likes[0].id, "unliked");
            modifyPriceBloc(-1);
          }      
        });
    });
}

function modifyPriceBloc(numberofLikes){
    const likesBloc = document.getElementById("likesValue");
    console.log(likesBloc.textContent);
    likesBloc.textContent = parseInt(likesBloc.textContent,10) + numberofLikes;
}

// on récupère toutes les images de la page et on ajoute un listener au click sur celle-ci 
// On récupère l'élément parent .media pour obtenir tout l'article et passer les éléments textuels + le tableau des result
function loadVisionneuse(result) {
    console.log("Chargement de la visionneuse "+result);
    let images = Array.from(document.getElementsByClassName("image"));
    images = Array.from(images);
    images.forEach((image) => {
        image.addEventListener("click",function createVisionneuse(){
            var article = image.closest('.media');
            console.log(article);
            const valuetitre = article.querySelector('figcaption span:first-child').textContent;
            var videoSrc = article.querySelector('video.image source');
            var imageSrc = article.querySelector('img.image');
            var media="";

            if (imageSrc == null) {
                videoSrc = videoSrc.getAttribute("src");
                media = document.createElement("video");
                media.classList.add("image-visionneuse");
                media.setAttribute("controls","");
                const source  = document.createElement("source");
                source.setAttribute("alt", valuetitre);
                source.setAttribute("id","mediaSource");
                source.src=videoSrc;
                media.appendChild(source);
                console.log(media);
            }
            else {
                imageSrc = imageSrc.getAttribute("src");
                media = document.createElement("img");
                media.classList.add("image-visionneuse");
                media.setAttribute("id","mediaSource");
                media.setAttribute("alt",valuetitre);
                media.src=imageSrc;
                console.log(media);
            }

            const fondVisionneuse = document.createElement("div");
            fondVisionneuse.classList.add("fond-visionneuse");
            fondVisionneuse.setAttribute("id","fond-visionneuse");
            const contentVisionneuse =document.createElement("div");
            contentVisionneuse.classList.add("content-visionneuse");
            const column1 = document.createElement("div");
            const column2 = document.createElement("div");
            const column3 = document.createElement("div");
            column1.classList.add("column-visionneuse");
            column2.classList.add("column-visionneuse");
            column3.classList.add("column-visionneuse");
            const icone = document.createElement("i");
            icone.classList.add("fa-solid","fa-xmark");
            icone.setAttribute("id","closeVisionneuse");
            icone.setAttribute("role","button");
            icone.setAttribute("aria-label", "Cliquez pour fermer la lightbox");

            const backArrow = document.createElement("i");
            const forwardArrow = document.createElement("i");

            backArrow.classList.add("fa-solid","fa-angle-left");
            backArrow.setAttribute("id","beforeMedia");
            backArrow.setAttribute("role","button");
            backArrow.setAttribute("aria-label", "Cliquez pour afficher le média précédent");
            forwardArrow.classList.add("fa-solid","fa-angle-right");
            forwardArrow.setAttribute("id","nextMedia");
            forwardArrow.setAttribute("role","button");
            forwardArrow.setAttribute("aria-label", "Cliquez pour afficher le média suivant");
            const titre = document.createElement("h1");
            titre.textContent=valuetitre;
            titre.setAttribute("id","titre")
            icone.classList.add("iconeVisionneuse");
            column2.appendChild(media);
            column2.appendChild(titre);
            column1.appendChild(backArrow);
            column3.appendChild(forwardArrow);
            column3.appendChild(icone);
            contentVisionneuse.appendChild(column1);
            contentVisionneuse.appendChild(column2);
            contentVisionneuse.appendChild(column3);
            fondVisionneuse.appendChild(contentVisionneuse);
            if(document.getElementById("fond-visionneuse")==null){
                main.appendChild(fondVisionneuse);
            }    
            closeVisionneuse();
            beforeMedia(result);
            nextMedia(result);
            gestionnaireTouche(result);
        });   
    });
    
}

/* Fonction qui permet la fermeture de la lightbox */
function closeVisionneuse(){
    const visionneuse  = document.getElementById("fond-visionneuse");
    const closeVisionneuse = document.getElementById("closeVisionneuse");
    if (closeVisionneuse != null){
        closeVisionneuse.addEventListener("click", function fermerVisionneuse(){
            visionneuse.remove();
        });
    }
    document.addEventListener('keydown', function (){
        if (event.keyCode === 27) {
            visionneuse.remove();
        }
    }); 
}

/*Fonction qui prend le media précédent du tableau (result) sur la lightbox
Si l'élément est en position 0. On le repasse tout en haut du tableau
*/ 
function beforeMedia(result){
    console.log(result)
    const beforeArrow = document.getElementById("beforeMedia");
    let title = document.getElementById("titre");
    if (beforeArrow!=null){
        beforeArrow.addEventListener("click", function (){
            beforeMediaElement(result, title)
        });
    }
    
    document.addEventListener('keydown', function (){
        if (event.keyCode === 37) {
            console.log("gauche");
            beforeMediaElement(result, title);
            } 
    });     
}
function beforeMediaElement(result, title){
    //console.log(title);
    let actualValue = result.indexOf(result.find(item => item.title === title.textContent));
    console.log("BEFORE : The actual value is " + actualValue);

    if(actualValue-1 < 0){
        actualValue = result.length-1;
    }
    else {
        actualValue--;
    }

    changerMedia(result[actualValue], title);
}


/*Fonction qui prend le media suivant du tableau (result) sur la lightbox
Si l'élément est en position maximum (longueur du tableau). On le repasse tout en positon 0
*/ 
function nextMedia(result){
    console.log(result)
    const nextArrow = document.getElementById("nextMedia");
    let title = document.getElementById("titre");
    if (nextArrow!=null){
        nextArrow.addEventListener("click", function (){
            nextMediaElement(result, title);
        });
    }

    // Naviation par touche
    document.addEventListener('keydown', function (){
        if (event.keyCode === 39) {
            nextMediaElement(result, title);
        }
    });    
}

function nextMediaElement(result, title){

    //On trouve l'index de l'élément
    let actualValue = result.indexOf(result.find(item => item.title === title.textContent));
    console.log("NEXT : The actual value is " + actualValue);

    if(actualValue+1 >= result.length){
        actualValue = 0;
    }
    else {
        actualValue++;
    }
    changerMedia(result[actualValue], title);
}

/* Fonction qui permet de changer le type de média entre photo et video en navigant dans la lightbox */ 
function changerMedia (result, title){
    title.textContent=result.title;
    console.log(result);
    let media = document.querySelector(".image-visionneuse");
    const name = document.getElementById("name");
    let text = name.textContent.split(' ');
    let urlMedia = "assets/"+text[0] ;

    if(result.image == null){
        //c'est une video
        console.log("C'est une video ET L'ANCIEN MEDIA' EST : "+media.tagName)
        if (media.tagName=="IMG"){
            let newMedia = document.createElement("video");
            newMedia.classList.add("image-visionneuse");
            newMedia.setAttribute("controls","");
            const source  = document.createElement("source");
            source.setAttribute("id","mediaSource");
            source.src=urlMedia+"/"+result.video;
            newMedia.appendChild(source);
            media.parentElement.replaceChild(newMedia, media);
            console.log(media)
        }
        else {
            const mediaSource = document.getElementById("mediaSource");
            mediaSource.src=urlMedia+"/"+result.video;
        }
    }
    else {
        // c'est une image
        console.log("C'est une image ET L'ANCIEN MEDIA EST : "+media.tagName)
        if (media.tagName == "VIDEO") {
            // possible dans dupliquer en créant fonction commune avec ligne 178
            let newMedia = document.createElement("img");
            newMedia.classList.add("image-visionneuse");
            newMedia.setAttribute("id","mediaSource");
            newMedia.src=urlMedia+"/"+result.image;
            console.log(newMedia);
            media.parentElement.replaceChild(newMedia, media);
            console.log(media)            
        }else {
            const mediaSource = document.getElementById("mediaSource");
            mediaSource.src=urlMedia+"/"+result.image;
        }

    }
}


init();