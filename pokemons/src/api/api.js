// const API_BASE = import.meta.env.VITE_API_URL;
const API_BASE = "https://pokeapi.co/api/v2/";

async function fetchPokemonsList(endpoint = "pokemon?limit=10") {
    const cleanEndpoint = endpoint.replace(/^\/+/g, "");
    const response = await fetch(`${API_BASE}${cleanEndpoint}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}

async function fetchPokemonDetails(endpoint = "pokemon?limit=10") {
    const cleanEndpoint = endpoint.replace(/^\/+/g, "");
    const data = await fetchPokemonsList(cleanEndpoint);

    if (cleanEndpoint.startsWith("pokemon/") && !cleanEndpoint.includes("?")) {
        const details = data;
        const stats = details.stats.reduce((acc, s) => {
            acc[s.stat.name] = s.base_stat;
            return acc;
        }, {});
        return {
            id: details.id,
            name: details.name,
            img: details.sprites.front_default,
            url: `${API_BASE}pokemon/${details.id}`,
            stats,
            weight: details.weight,
            height: details.height,
            type: details.types.map((t) => t.type.name),
        };
    }

    const detailsList = data.results.map(async (pokemon) => {
        const result = await fetch(pokemon.url);
        const details = await result.json();
        return {
            id: details.id,
            name: details.name,
            img: details.sprites.front_default,
        };
    });
    const results = await Promise.all(detailsList);
    return results;
}

export { fetchPokemonDetails };
