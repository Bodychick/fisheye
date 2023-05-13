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

