    async function getPhotographers() {
        let photographers2=[];
        fetch('data/photographers.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            let photographers2=[];
            photographers2 = data.photographers;
            console.log(photographers2);
            return photographers2; // Affiche les données des photographes dans la console
        })
        .catch(error => {
            console.error(error)
        });

        return photographers2;
        // et bien retourner le tableau photographers seulement une fois récupéré
       // console.log("Avant le return");
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
    
