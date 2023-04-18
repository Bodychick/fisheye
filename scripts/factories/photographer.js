function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const city = document.createElement("p");
        city.textContent="London, UK";
        city.classList.add("city");
        const quote = document.createElement("p");
        quote.textContent="Voir le beau dans le quotidien";
        const price = document.createElement("p");
        price.textContent="400€/jour";
        price.classList.add("price");
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(city);
        article.appendChild(quote);
        article.appendChild(price);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}