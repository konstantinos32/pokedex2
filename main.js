console.log("Main page loaded");

// DOM Elements
const pokemonContainer = document.querySelector("#pokemonContainer");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

// Variables
const apiUrl = "https://pokeapi.co/api/v2/pokemon";

// Functions
async function loadPokemon() {
    const response= await fetch(apiUrl);
    const data= await response.json();
  
     for (const pokemon of data.results) {

        getPokemonDetails(pokemon.url);

}

}

async function getPokemonDetails(url) {
    const response= await fetch(url);
    const pokemon= await response.json();
    displayPokemon(pokemon);
}
function displayPokemon(pokemon) {

    //Card creation
    const card= document.createElement("div");
    card.className="bg-white round-lg shadow-md p-4";

    //Image creation
    const image=document.createElement("img");
    image.src= pokemon.sprites.front_default;
    image.alt=pokemon.name;
    image.className="mx-auto";

    //name creation
    const name= document.createElement("h2");
    name.textContent=pokemon.name;
    name.className = "text-xl font-bold text-center mt-3 capitalize";

    //image and name addition to the card
    card.appendChild(image);
    card.appendChild(name);

    // card added to the page
    pokemonContainer.appendChild(card);
}



// Event Listeners



// Start App
loadPokemon();