import pokemons from "./pokemons.js"
const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const sortBy = document.getElementById("sortBy");
const searchButton = document.getElementById("searchButton");



function generator(pokemonList) {
    pokemonContainer.innerHTML = '';
    pokemonList.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add('card');
        card.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.img}" alt="">
            <p>${pokemon.type}</p>
            <p>${pokemon.weight}</p>
        `;
        pokemonContainer.appendChild(card);
    });
}

generator(pokemons);



function searchProduct() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const searchedPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    generator(searchedPokemons);
}

searchInput.addEventListener('input', searchProduct);



function filterProduct() {
    const filterValue = filterType.value;

    if (searchInput.value === '') {
        if (filterValue === "all") {
            generator(pokemons);
            return;
        }
    
        const filteredPokemons = pokemons.filter(pokemon =>
            pokemon.type.includes(filterValue)
        );
    
        generator(filteredPokemons);
    } else if (!(searchInput.value === '')) {
        const searchValue = searchInput.value.toLowerCase().trim();

        const searchedPokemons = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchValue)
        );
    
        generator(searchedPokemons);
        if (filterValue === "all") {
            generator(searchedPokemons);
            return;
        }
    
        const filteredPokemons = searchedPokemons.filter(pokemon =>
            pokemon.type.includes(filterValue)
        );
    
        generator(filteredPokemons);
    }
}

filterType.addEventListener("change", filterProduct);




function sortProduct() {
    const filterValue = filterType.value;
    const sortValue = sortBy.value;
    const searchValue = searchInput.value.toLowerCase().trim();

    let filteredPokemons = pokemons;

    
    if (searchValue !== '') {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchValue)
        );
    }

    
    if (filterValue !== "all") {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.type.includes(filterValue)
        );
    }

    
    switch (sortValue) {
        case "alphabeticalAsc":
            filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "alphabeticalDesc":
            filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "weightAsc":
            filteredPokemons.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
            break;
        case "weightDesc":
            filteredPokemons.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
            break;
    }

    generator(filteredPokemons);
}

sortBy.addEventListener("change", sortProduct);
filterType.addEventListener("change", sortProduct);
searchInput.addEventListener("input", sortProduct);

sortBy.addEventListener("change", sortProduct);

searchButton.addEventListener("click", searchProduct, filterProduct, sortProduct)