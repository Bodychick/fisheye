    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        
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
        
        fetch('data/photographers.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            let photographers2=[];
            console.log(data.photographers)
            photographers2 = data.photographers;
            console.log(photographers2); // Affiche les données des photographes dans la console
            return photographers2;
        })
        .catch(error => {
            console.error(error)
        });

        // et bien retourner le tableau photographers seulement une fois récupéré
        console.log("Avant le return");        
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
        let photographers = await getPhotographers();
        console.log(photographers);
        displayData(photographers);
    };
    
    init();
    
