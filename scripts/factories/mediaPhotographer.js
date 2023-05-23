function mediaFactory(data){
    const {id, photographerId, title, image, video, likes, date, price } = data;

    //Savoir dans quel dossier prendre l'image en sélectionnant le prénom du photographe
    //Récupérer le name du photographe + déduire le prénom dans penant tout ce qu'il y a avant l'espace
    const nomTableau = "photoLiked";
     const name = document.getElementById("name");
     let text = name.textContent.split(' ');
     console.log(text)
     let media = "assets/"+text[0] ;
     let mediaElement="";
     const source = document.createElement("source");
     let classLiked="fa-regular";
     const idString = id.toString();
     var like = likes;
     const lien = document.createElement("a");
     lien.href="#";
     lien.classList.add("lienVisionneuse");
     var tableauRecupere = localStorage.getItem(nomTableau);
     console.log(tableauRecupere);
 
     if(tableauRecupere != null){
        var tableauFinal = tableauRecupere.split(" ");
        console.log(tableauFinal);
        
        if(tableauFinal.includes(idString)){
           classLiked="fa-solid";
            //S'ils sont dans le tableau et donc liké, likes +1
           like++;
           console.log(like);
        };
    }      

     if(image==null){
        media = media +"/" + video;
        mediaElement = document.createElement("video");
        //mediaElement.setAttribute("controls","");
        mediaElement.classList.add("image")
        mediaElement.setAttribute("alt", title);
        mediaElement.setAttribute("aria-label","Cliquez sur la vidéo pour l'agrandir"); 
        source.setAttribute("src",media);
        mediaElement.appendChild(source);
        lien.appendChild(mediaElement);
     }
     else {
        media = media +"/"+image;
        mediaElement = document.createElement("img");
        mediaElement.classList.add("image")
        mediaElement.setAttribute("src", media);
        mediaElement.setAttribute("alt", title);
        mediaElement.setAttribute("aria-label","Cliquez sur l'image pour l'agrandir");
        lien.appendChild(mediaElement);
     }

     // Savoir si c'est une vidéo ou une image

    function getMediaCardDom() {
       const article = document.createElement('article'); 
       article.classList.add("media");
       const figure = document.createElement("figure");
    
       const figcaption = document.createElement("figcaption");
       const figcaptionChild = document.createElement("span");
       const figcaptionChild2 = document.createElement("span");
       const figcaptionLikes = document.createElement("span");
  
       figcaptionLikes.setAttribute("id","numberLikes");
       figcaptionLikes.classList.add("numberLikes");
       
       const lienLike = document.createElement("button");
       lienLike.classList.add("buttonLike");
       lienLike.setAttribute("name","like");
       const iconLikes = document.createElement("i");
       iconLikes.classList.add(classLiked,"fa-heart","color-red");
       iconLikes.setAttribute("role","button");
       iconLikes.setAttribute("aria-label","Cliquez ici pour liker ce contenu");
       lienLike.appendChild(iconLikes);
       
       figcaptionChild.textContent=title;
       figcaptionLikes.textContent=like;
       figcaptionChild2.appendChild(figcaptionLikes);
       figcaptionChild2.appendChild(lienLike);
       figcaption.classList.add("color-red");
       figcaption.appendChild(figcaptionChild);
       figcaption.appendChild(figcaptionChild2);
       figure.appendChild(lien);
       figure.appendChild(figcaption);
       article.appendChild(figure);
       return (article);
    }
   
    return { id, photographerId, title, image, video, likes, date, price, lien, classLiked, like, getMediaCardDom }
}