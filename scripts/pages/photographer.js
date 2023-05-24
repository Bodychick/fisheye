
/*
    Récupération des données contenus dans le fichier json
*/ 
async function getPhotographers() {
    return fetch('data/photographers.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        var photographers2 = data;
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
    loadLightbox(medias);
    likeOnPhoto(medias);    
}

/* Affichage du header avec les informations sur photographe */
async function displayHeaderPhotographer(resultPhotographer) {
    console.log(resultPhotographer)
    resultPhotographer.forEach((photographe) => {
        const photographeModel = photographerFactory(photographe);
        console.log(photographeModel);
        photographeModel.getHeaderPhotographer();
    });
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
    
    displayHeaderPhotographer(resultPhotographer);

    //var medias = await getMediaByPhotographer();
    //console.log(medias)
    let result = medias.filter(media => media.photographerId==id);
    // Récupérer les données filtrées
    result = await triMedias(result);
    result  = switchTri(result, "popular");
    displayData(result);
}

//Ajouter dans le local storage les médias likés
function ajouterDansLocalStorage(id, like){
    const nomTableau = "photoLiked";
    // Récupération du tableau depuis le localStorage
    var tableauRecupere = localStorage.getItem(nomTableau);
    var idString = id.toString();

    if(tableauRecupere.length == 0){
        localStorage.setItem(nomTableau,idString);
    }
    else {
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

//permet de détecter si l'utilisateur veut liker une photo + modifcation de l'afficjhage et du nombre de like
function likeOnPhoto(result){
    if(localStorage.getItem("photoLiked")== null){
        localStorage.setItem("photoLiked","")
    }
    if(document.getElementsByName("like")){
        const likeLiens = document.getElementsByName("like");
        likeLiens.forEach((lien) => {
            lien.addEventListener("click",function(){
                const like = lien.firstChild; 
                console.log(lien.firstChild);
                const article = like.closest('.media');  
                const title = article.querySelector('figcaption span:first-child').textContent;
                var likes = result.filter(resul=> resul.title==title);
                //var index = result.indexOf(result.find(item => item.title === title));

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
        })
    }
}

/*  Change le nombre de like total du photographe */
function modifyPriceBloc(numberofLikes){
    const likesBloc = document.getElementById("likesValue");
    console.log(likesBloc.textContent);
    likesBloc.textContent = parseInt(likesBloc.textContent,10) + numberofLikes;
}

// Création de la lightbox
// on récupère toutes les images de la page et on ajoute un listener au click sur celle-ci 
// On récupère l'élément parent .media pour obtenir tout l'article et passer les éléments textuels + le tableau des result
function loadLightbox(result) {
    console.log("Chargement de la Lightbox "+result);
    let images = Array.from(document.getElementsByClassName("lienLightbox"));
    images = Array.from(images);
    images.forEach((image) => {
        image.addEventListener("click",function createLightbox(){
            var article = image.closest('.media');
            console.log(article);
            const valuetitre = article.querySelector('figcaption span:first-child').textContent;
            var videoSrc = article.querySelector('video.image source');
            var imageSrc = article.querySelector('img.image');
            var media="";

            if (imageSrc == null) {
                videoSrc = videoSrc.getAttribute("src");
                media = document.createElement("video");
                media.classList.add("image-Lightbox");
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
                media.classList.add("image-Lightbox");
                media.setAttribute("id","mediaSource");
                media.setAttribute("alt",valuetitre);
                media.src=imageSrc;
                console.log(media);
            }

            const fondLightbox = document.createElement("div");
            fondLightbox.classList.add("fond-Lightbox");
            fondLightbox.setAttribute("id","fond-Lightbox");
            const contentLightbox =document.createElement("div");
            contentLightbox.classList.add("content-Lightbox");
            contentLightbox.setAttribute("aria-label","Vue rapprochée de l'image")
            const column1 = document.createElement("div");
            const column2 = document.createElement("div");
            const column3 = document.createElement("div");
            column1.classList.add("column-Lightbox");
            column2.classList.add("column-Lightbox");
            column3.classList.add("column-Lightbox");
            const icone = document.createElement("i");
            icone.classList.add("fa-solid","fa-xmark");
            icone.setAttribute("id","closeLightbox");
            icone.setAttribute("role","button");
            icone.setAttribute("aria-label", "Fermer la lightbox");

            const backArrow = document.createElement("i");
            const forwardArrow = document.createElement("i");

            backArrow.classList.add("fa-solid","fa-angle-left");
            backArrow.setAttribute("id","beforeMedia");
            backArrow.setAttribute("role","button");
            backArrow.setAttribute("aria-label", "Média précédent");
            forwardArrow.classList.add("fa-solid","fa-angle-right");
            forwardArrow.setAttribute("id","nextMedia");
            forwardArrow.setAttribute("role","button");
            forwardArrow.setAttribute("aria-label", "Média suivant");
            const titre = document.createElement("h1");
            titre.textContent=valuetitre;
            titre.setAttribute("id","titre")
            icone.classList.add("iconeLightbox");
            column2.appendChild(media);
            column2.appendChild(titre);
            column1.appendChild(backArrow);
            column3.appendChild(forwardArrow);
            column3.appendChild(icone);
            contentLightbox.appendChild(column1);
            contentLightbox.appendChild(column2);
            contentLightbox.appendChild(column3);
            fondLightbox.appendChild(contentLightbox);
            if(document.getElementById("fond-Lightbox")==null){
                main.appendChild(fondLightbox);
            }    
            closeLightbox();
            beforeMedia(result);
            nextMedia(result);
        });   
    });
    
}

/* Fonction qui permet la fermeture de la lightbox */
function closeLightbox(){
    const Lightbox  = document.getElementById("fond-Lightbox");
    const closeLightbox = document.getElementById("closeLightbox");
    if (closeLightbox != null){
        closeLightbox.addEventListener("click", function fermerLightbox(){
            Lightbox.remove();
        });
    }
    document.addEventListener('keydown', function (){
        if (event.keyCode === 27) {
            Lightbox.remove();
        }
    }); 
}

/*
Détecte si l'utilisateuur veut afficher le média précédent (clavier/click)
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
/* Trouve le média précédent à afficher */
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


/*
Détecte si l'utilisateur veut l'élément suivant au clic/clavier
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

//Trouve le média suivant à afficher
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
    let media = document.querySelector(".image-Lightbox");
    const name = document.getElementById("name");
    let text = name.textContent.split(' ');
    let urlMedia = "assets/"+text[0] ;

    if(result.image == null){
        //c'est une video
        console.log("C'est une video ET L'ANCIEN MEDIA' EST : "+media.tagName)
        if (media.tagName=="IMG"){
            let newMedia = document.createElement("video");
            newMedia.classList.add("image-Lightbox");
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
            newMedia.classList.add("image-Lightbox");
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