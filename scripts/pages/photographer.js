//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    return fetch('data/photographers.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        photographers2 = data;
        console.log(photographers2);
        return photographers2; // Affiche les données des photographes dans la console
    })
    .catch(error => {
        console.error(error);
    });   

    
    // et bien retourner le tableau photographers seulement une fois récupéré
}

/*async function getMediaByPhotographer() {
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
}*/

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
    const nomPhotographerModal = document.getElementById("nomPhotographerModal");
    console.log(resultPhotographer);
    nomPhotographerModal.textContent =  nomPhotographerModal.textContent +": " + resultPhotographer.name
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
    const articles = document.getElementsByClassName("media");
    const main = document.getElementById("main");
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
    loadVisionneuse(result, articles);
}

function loadVisionneuse(result, articles) {
    console.log(result)
    articles = Array.from(articles);
    articles.forEach((article) => {
        article.addEventListener("click",function createVisionneuse(){
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
            const backArrow = document.createElement("i");
            const forwardArrow = document.createElement("i");
            backArrow.classList.add("fa-solid","fa-angle-left");
            backArrow.setAttribute("id","beforeMedia");
            forwardArrow.classList.add("fa-solid","fa-angle-right");
            forwardArrow.setAttribute("id","nextMedia");
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
        });   
    });
    
}

function closeVisionneuse(){
    const visionneuse  = document.getElementById("fond-visionneuse");
    const closeVisionneuse = document.getElementById("closeVisionneuse");
    if (closeVisionneuse != null){
        closeVisionneuse.addEventListener("click", function fermerVisionneuse(){
            visionneuse.remove();
        });
    }
}

function beforeMedia(result){
    console.log(result)
    const beforeArrow = document.getElementById("beforeMedia");
    let title = document.getElementById("titre");
    if (beforeArrow!=null){
        beforeArrow.addEventListener("click", function beforeMediaElement(){
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
        });
    } 
}

function nextMedia(result){
    console.log(result)
    const nextArrow = document.getElementById("nextMedia");
    let title = document.getElementById("titre");
    if (nextArrow!=null){
        nextArrow.addEventListener("click", function nextMediaElement(){
            //console.log(title);
            let actualValue = result.indexOf(result.find(item => item.title === title.textContent));
            console.log("NEXT : The actual value is " + actualValue);

            if(actualValue+1 >= result.length){
                actualValue = 0;
            }
            else {
                actualValue++;
            }
            changerMedia(result[actualValue], title);
        });
    } 
}


function changerMedia (result, title){
    console.log(title)
    title.textContent=result.title;
    console.log(result.title);
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
            media.innerHTML = newMedia;
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
            media.innerHTML = newMedia;
            console.log(media)            
        }else {
            const mediaSource = document.getElementById("mediaSource");
            mediaSource.src=urlMedia+"/"+result.image;
        }

    }
}



init();