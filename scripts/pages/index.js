    async function getPhotographers() {
        let photographers2=[];
        return fetch('data/photographers.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            photographers2 = data.photographers;
            console.log(photographers2);
            return photographers2; // Affiche les données des photographes dans la console
        })
        .catch(error => {
            console.error(error);
        });
        
        // et bien retourner le tableau photographers seulement une fois récupéré
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
        var photographers = await getPhotographers();
        console.log(photographers);
        displayData(photographers);
    };
    
    init();
    
