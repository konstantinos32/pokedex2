console.log("Pokédex page loaded");

// DOM Elements
const savedPokemonContainer = document.querySelector(
    "#savedPokemonContainer"
);

// Variables
const caughtPokemon =
    JSON.parse(localStorage.getItem("caughtPokemon")) || [];

// Functions

function displayPokemon() {
    if (caughtPokemon.length === 0) {
        savedPokemonContainer.textContent =
            "You have not caught any Pokémon yet.";
        return;
    }

    caughtPokemon.forEach((pokemon) => {
        const card = document.createElement("article");
        card.className = "bg-white rounded-lg shadow-md p-4 text-center";

        const image = document.createElement("img");
        image.className = "w-32 h-32 mx-auto";
        image.src = pokemon.image;
        image.alt = pokemon.name;

        const name = document.createElement("h2");
        name.className = "text-xl font-bold capitalize mt-2";
        name.textContent = pokemon.name;

        const hp = document.createElement("p");
        hp.textContent = `HP: ${pokemon.hp}`;

        const attack = document.createElement("p");
        attack.textContent = `Attack: ${pokemon.attack}`;

        const defense = document.createElement("p");
        defense.textContent = `Defense: ${pokemon.defense}`;

        const speed = document.createElement("p");
        speed.textContent = `Speed: ${pokemon.speed}`;

        const releaseButton = document.createElement("button");
        releaseButton.className = "mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600";
        releaseButton.textContent = "Release";

        releaseButton.addEventListener("click", () => {
            releasePokemon(pokemon.id);
        });

        function releasePokemon(pokemonId) {
    const updatedPokemon = caughtPokemon.filter(
        (pokemon) => pokemon.id !== pokemonId
    );

    localStorage.setItem(
        "caughtPokemon",
        JSON.stringify(updatedPokemon)
    );

    location.reload();
}

        card.append(
            image,
            name,
            hp,
            attack,
            defense,
            speed,
            releaseButton
        );

        savedPokemonContainer.appendChild(card);
    });
}



// Start App
displayPokemon();