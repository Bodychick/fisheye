function photographerFactory(data) {
    //const {name, portrait } = data;
    const {name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const lieu = document.createElement("p");
        lieu.textContent=city +", "+ country;
        lieu.classList.add("city");
        const quote = document.createElement("p");
        quote.textContent=tagline;
        const tarif = document.createElement("p");
        tarif.textContent=price +"€/jour";
        tarif.classList.add("price");
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(city);
        article.appendChild(quote);
        article.appendChild(price);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}