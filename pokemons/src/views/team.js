import { store } from "../main";
import { fetchPokemonDetails } from "../api/api";

async function renderTeam() {
    const { team } = store.getState();

    if (team.length === 0) {
        return `
            <section class="team">
                <h2>My Team</h2>
                <div class="empty-state">
                    <p>Your team is empty. Add some pokemons!</p>
                </div>
            </section>`;
    }

    try {
        const pokemonPromises = team.map((id) => fetchPokemonDetails(`pokemon/${id}`));
        const pokemons = await Promise.all(pokemonPromises);

        const pokemonHTML = pokemons
            .map((pokemon) => {
                const heightMeters = pokemon.height / 10;
                const weightKg = pokemon.weight / 10;

                return `
                <div class="pokemon-team-card" data-id="${pokemon.id}">
                    <div class="team-card-content">
                        <div class="team-image-box">
                            <img src="${pokemon.img}" alt="${pokemon.name}" />
                        </div>
                        <div class="team-info-box">
                            <span class="pokemon-id">#${String(pokemon.id).padStart(3, "0")}</span>
                            <h3 class="pokemon-name">${pokemon.name}</h3>
                            
                            <div class="team-physique">
                                <span>${heightMeters}m</span> | <span>${weightKg}kg</span>
                            </div>

                            <div class="team-types">
                                ${pokemon.type.map((t) => `<span class="type-badge ${t}">${t}</span>`).join("")}
                            </div>

                            <button class="remove-team-btn" data-id="${pokemon.id}">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>`;
            })
            .join("");

        return `
            <section class="team-view">
                <h2>My Team</h2>
                <div class="team-grid">
                    ${pokemonHTML}
                </div>
            </section>`;
    } catch (error) {
        return `
            <section class="team">
                <h2>My Team</h2>
                <p class="error">Error loading team: ${error.message}</p>
            </section>`;
    }
}
export { renderTeam };
