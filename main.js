console.log("Main page loaded");

// DOM Elements
const pokemonContainer = document.querySelector("#pokemonContainer");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

// Variables
const apiUrl = "https://pokeapi.co/api/v2/pokemon";

// Functions
async function loadPokemon() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  for (const pokemon of data.results) {
    getPokemonDetails(pokemon.url);
  }
}

async function getPokemonDetails(url) {
  const response = await fetch(url);
  const pokemon = await response.json();
  displayPokemon(pokemon);
}
function displayPokemon(pokemon) {

    // Get the stats
    const hp = pokemon.stats.find(
        stat => stat.stat.name === "hp"
    ).base_stat;

    const attack = pokemon.stats.find(
        stat => stat.stat.name === "attack"
    ).base_stat;

    const defense = pokemon.stats.find(
        stat => stat.stat.name === "defense"
    ).base_stat;

    const speed = pokemon.stats.find(
        stat => stat.stat.name === "speed"
    ).base_stat;

    // Create card
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4";

    // Create image
    const image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;
    image.className = "mx-auto";

    // Create name
    const name = document.createElement("h2");
    name.textContent = pokemon.name;
    name.className = "text-xl font-bold text-center mt-3 capitalize";

    // Create HP
    const hpText = document.createElement("p");
    hpText.textContent = `HP: ${hp}`;
    hpText.className = "mt-2";

    // Create Attack
    const attackText = document.createElement("p");
    attackText.textContent = `Attack: ${attack}`;
    attackText.className = "mt-1";

    // Create Defense
    const defenseText = document.createElement("p");
    defenseText.textContent = `Defense: ${defense}`;
    defenseText.className = "mt-1";

    // Create Speed
    const speedText = document.createElement("p");
    speedText.textContent = `Speed: ${speed}`;
    speedText.className = "mt-1";

    // Create Catch button
const catchButton = document.createElement("button");
catchButton.textContent = "Catch";
catchButton.className =
    "bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600";

catchButton.addEventListener("click", function () {
    console.log(`${pokemon.name} caught!`);
});

    // Add elements to the card
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(hpText);
    card.appendChild(attackText);
    card.appendChild(defenseText);
    card.appendChild(speedText);
    card.appendChild(catchButton);


    

    // Add card to the page
    pokemonContainer.appendChild(card);
  }

// Event Listeners

// Start App
loadPokemon();
