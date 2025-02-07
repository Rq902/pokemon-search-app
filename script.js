const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");
const output = document.querySelector(".output");

const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const getPokemon = async () => {
  const pokemonNameOrId = searchInput.value.trim().toLowerCase();
  if (!pokemonNameOrId) return;

  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const data = await response.json();

    updateUI(data);
  } catch (error) {
    resetDisplay();
    alert("Pokemon not found. Try another name or ID!");
  }
};

const updateUI = (data) => {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonID.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  spriteContainer.innerHTML = `
    <img src="${data.sprites.front_default}" alt="${data.name} sprite" width="120">
  `;

  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;

  types.innerHTML = data.types
    .map((t) => `<span class="type ${t.type.name}">${t.type.name}</span>`)
    .join("");

  output.style.display = "flex";
};

const resetDisplay = () => {
  spriteContainer.innerHTML = "";
  types.innerHTML = ""; 

  pokemonName.textContent = "";
  pokemonID.textContent = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";

  output.style.display = "none";
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getPokemon();
});