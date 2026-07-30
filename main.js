console.log("Main page loaded");

// DOM Elements
const searchDialog = document.querySelector("#searchDialog");
const dialogMessage = document.querySelector("#dialogMessage");
const closeDialog = document.querySelector("#closeDialog");
const pokemonContainer = document.querySelector("#pokemonContainer");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

// Variables
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=30";

// Functions
async function loadPokemon() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    for (const pokemon of data.results) {
      await getPokemonDetails(pokemon.url);
    }
  } catch (error) {
    console.error("Error loading Pokémon:", error);
  }
}

async function getPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();

    displayPokemon(pokemon);
  } catch (error) {
    console.error("Error loading Pokémon details:", error);
  }
}

function displayPokemon(pokemon) {
  // Get the stats
  const hp = pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat;

  const attack = pokemon.stats.find(
    (stat) => stat.stat.name === "attack",
  ).base_stat;

  const defense = pokemon.stats.find(
    (stat) => stat.stat.name === "defense",
  ).base_stat;

  const speed = pokemon.stats.find(
    (stat) => stat.stat.name === "speed",
  ).base_stat;

  // Create card
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg shadow-md p-4";



  // Store the Pokémon name in a data attribute
  card.dataset.name = pokemon.name;
  card.dataset.id = pokemon.id;

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
    let caughtPokemon = JSON.parse(localStorage.getItem("caughtPokemon")) || [];

    const existingPokemon = caughtPokemon.find(
      (item) => item.id === pokemon.id,
    );

    if (existingPokemon) {
      alert(`${pokemon.name} is already in your Pokédex!`);
      return;
    }

    const caught = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      note: "",
    };

    caughtPokemon.push(caught);

    localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));

    alert(`${pokemon.name} was added to your Pokédex!`);
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

function searchPokemon(showDialog = true) {
    const searchValue = searchInput.value.trim().toLowerCase();

    const cards = pokemonContainer.children;

    let found = false;

    for (const card of cards) {
        const pokemonName = card.dataset.name;
        const pokemonId = card.dataset.id;

        if (
            pokemonName.includes(searchValue) ||
            pokemonId.includes(searchValue)
        ) {
            card.style.display = "";
            found = true;
        } else {
            card.style.display = "none";
        }
    }

    if (showDialog) {
        if (found) {
            dialogMessage.textContent =
                `Found Pokémon matching "${searchInput.value}".`;
        } else {
            dialogMessage.textContent =
                `No Pokémon found for "${searchInput.value}".`;
        }

        searchDialog.showModal();
    }
}


// Event Listeners

closeDialog.addEventListener("click", function () {
    searchDialog.close();
});

searchBtn.addEventListener("click", function () {
    searchPokemon(true);
});

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchPokemon(true);
    }
});

searchInput.addEventListener("input", function () {
    searchPokemon(false);
});

// Start App
loadPokemon();