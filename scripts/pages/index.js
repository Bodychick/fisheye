    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers2=[];
        /*let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]*/
        fetch('data/photographers.json',)
        .then(response => response.json())
        .then(data => {
            console.log(data.photographers)
            photographers2 = data.photographers;
            console.log(({photographers2: [...photographers2]})); // Affiche les données des photographes dans la console
        })
        .catch(error => console.error(error));

        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers2;
        //photographers;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        console.log(photographers);
        photographers.forEach((photographer) => {
            console.log(photographer);
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        console.log(photographers);
        displayData(photographers);
    };
    
    init();
    
