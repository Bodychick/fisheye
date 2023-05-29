//factoryMethod d'un pohotographe
function photographerFactory(data) {
    //const {name, portrait } = data;
    const {name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    //Function de création d'un fiche photographe
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt","Photo de "+ name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const lien = document.createElement('a');
        lien.setAttribute("href","photographer.html?id="+id);
        lien.appendChild(img);
        lien.appendChild(h2);
        const lieu = document.createElement("p");
        lieu.textContent=city +", "+ country;
        lieu.classList.add("city");
        const quote = document.createElement("p");
        quote.textContent=tagline;
        const tarif = document.createElement("p");
        tarif.textContent=price +"€/jour";
        tarif.classList.add("price");
        article.appendChild(lien);
        article.appendChild(lieu);
        article.appendChild(quote);
        article.appendChild(tarif);
        return (article);
    }

    //Affichage du header Photograph
    function getHeaderPhotographer(){
        const imageBloc=document.getElementById("photo-photographe");
        const namePhotographer = document.getElementById("name");
        const location = document.getElementById("location");
        const tagline = document.getElementById("tagline");
        const nomPhotographerModal = document.getElementById("nomPhotographerModal");
        const image = document.createElement("img");
        console.log(data);
        nomPhotographerModal.textContent =  nomPhotographerModal.textContent +": " + data.name;
        namePhotographer.textContent=data.name;
        location.textContent=data.city + ", " + data.country;
        tagline.textContent=data.tagline;
        image.src= `assets/photographers/${data.portrait}`;
        image.alt="Photo de " + data.name;
        image.setAttribute("id","image_photographer");
        imageBloc.appendChild(image);
        // Création du bloc fixe avec les prix
        const mainSection = document.getElementById("main");
        const element = document.createElement("p");
        element.setAttribute("id","price");
        const price = document.createElement("span")
        price.setAttribute("id","priceConteneur");
        price.textContent= data.price +" € / jour"
        element.appendChild(price);
        mainSection.appendChild(element);
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM,getHeaderPhotographer }
}

