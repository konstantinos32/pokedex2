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
    console.log(pokemon);
}



// Event Listeners



// Start App
loadPokemon();