import { createLoader } from "../components";
import { store } from "../main";
import { fetchPokemonDetails } from "../api/api";
import { renderNotFound } from "./notFound";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function loadPokemons(func, force = false) {
    const { pokemons, loading } = store.getState();
    if (loading || (!force && pokemons.length > 0)) return;
    store.setState({ loading: true, error: null });
    try {
        const data = await fetchPokemonDetails();
        await delay(2000);
        store.setState({ pokemons: data, loading: false });
    } catch (error) {
        store.setState({ error: error.message, loading: false });
    } finally {
        func();
    }
}

async function renderPokemons() {
    const { pokemons, loading, error } = store.getState();
    if (loading) return createLoader();
    if (error) return `<p class="error">Error: ${error}</p>`;
    if (pokemons.length === 0) return `<p>No pokemons found(</p>`;

    const pokemonHTML = pokemons
        .map(
            (pokemon) =>
                `<div class="pokemon-card" data-id="${pokemon.id}">
                    <p>${pokemon.id}</p>
                    <img src="${pokemon.img}" alt="Img of ${pokemon.name}" />
                    <h3>${pokemon.name}</h3>
                </div>`,
        )
        .join("");
    return `<section class="pokemons">
                <h2>Pokemons</h2>
                ${pokemonHTML}
            </section>`;
}

async function renderPokemon(id) {
    try {
        const pokemon = await fetchPokemonDetails(`pokemon/${id}`);
        const heightMeters = pokemon.height / 10;
        const weightKg = pokemon.weight / 10;
        return `
        <div class="pokemon-detail-container">
            <!-- Back Navigation -->
            <a href="/pokemons" class="back-link">← Back to Pokédex</a>
            
            <div class="pokemon-detail-card">
                <!-- Left Column: Image Box -->
                <div class="pokemon-image-section">
                    <img src="${pokemon.img}" alt="${pokemon.name}" class="detail-img" />
                </div>

                <!-- Right Column: Information Section -->
                <div class="pokemon-info-section">
                    <span class="pokemon-id">#${String(pokemon.id).padStart(3, "0")}</span>
                    <h1 class="pokemon-name">${pokemon.name}</h1>

                    <div class="info-group">
                        <span class="label">Type:</span>
                        <div class="type-tags">
                            ${pokemon.type.map((t) => `<span class="type-badge ${t}">${t}</span>`).join("")}
                        </div>
                    </div>

                    <div class="info-group physique">
                        <span class="label">Height:</span> <span>${heightMeters} m</span>
                        <span class="label">Weight:</span> <span>${weightKg} kg</span>
                    </div>

                    <div class="stats-container">
                        <h3>Statistics</h3>
                        ${Object.entries(pokemon.stats)
                            .map(
                                ([statName, value]) => `
                            <div class="stat-row">
                                <span class="stat-label">${statName.toUpperCase()}</span>
                                <div class="stat-bar-bg">
                                    <div class="stat-bar-fill" style="width: ${Math.min(value, 100)}%"></div>
                                </div>
                                <span class="stat-value">${value}</span>
                            </div>
                        `,
                            )
                            .join("")}
                    </div>

                    <button class="add-team-btn" data-id="${pokemon.id}">
                        + Add to my team
                    </button>
                </div>
            </div>
        </div>
    `;
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return renderNotFound();
    }
}

export { renderPokemons, loadPokemons, renderPokemon };
