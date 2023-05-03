function photographerFactory(data) {
    //const {name, portrait } = data;
    const {name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

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
    return { name, picture, city, country, tagline, price, id, getUserCardDOM }
}

function mediaFactory(data){
     const {id, photographerId, title, image, video, likes, date, price } = data;

     //Savoir dans quel dossier prendre l'image en sélectionnant le prénom du photographe
     //Récupérer le name du photographe + déduire le prénom dans penant tout ce qu'il y a avant l'espace
      const name = document.getElementById("name");
      let text = name.textContent.split(' ');
      console.log(text)
      let media = "assets/"+text[0] ;
      let mediaElement="";
      const source = document.createElement("source");
      if(image==null){
         media = media +"/" + video;
         mediaElement = document.createElement("video");
         //mediaElement.setAttribute("controls","");
         mediaElement.classList.add("image")
         source.setAttribute("src",media);
         mediaElement.appendChild(source);
      }
      else {
         media = media +"/"+image;
         mediaElement = document.createElement("img");
         mediaElement.classList.add("image")
         mediaElement.setAttribute("src", media);
         mediaElement.setAttribute("alt", title);
      }

      // Savoir si c'est une vidéo ou une image

     function getMediaCardDom() {
        const article = document.createElement('article'); 
        article.classList.add("media");
        const figure = document.createElement("figure");
        
        const figcaption = document.createElement("figcaption");
        const figcaptionChild = document.createElement("span");
        const figcaptionChild2 = document.createElement("span");
        const iconLikes = document.createElement("i");
        iconLikes.classList.add("fa-solid","fa-heart");
        
        figcaptionChild.textContent=title;
        figcaptionChild2.textContent=likes+" ";
        figcaptionChild2.appendChild(iconLikes);
        figcaption.classList.add("color-red");
        figcaption.appendChild(figcaptionChild);
        figcaption.appendChild(figcaptionChild2);
        figure.appendChild(mediaElement);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        return (article);
     }
     return { id, photographerId, title, image, video, likes, date, price, mediaElement, getMediaCardDom }
}