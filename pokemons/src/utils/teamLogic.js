import { store } from "../main";

function addToTeam(id) {
    const { team } = store.getState();
    const pokemonId = parseInt(id);
    console.log("Adding to team:", pokemonId, "Current team:", team);
    if (team.includes(pokemonId)) {
        alert("This pokemon is already in your team.");
        return;
    }
    if (team.length === 6) {
        alert("Team is full! You can only have 6 pokemons.");
        return;
    }
    const newTeam = [...team, pokemonId];
    store.setState({ team: newTeam });
    localStorage.setItem("team-pokemons", JSON.stringify(newTeam));
    console.log("New team saved:", newTeam);
}

function removeFromTeam(id) {
    const { team } = store.getState();
    const newTeam = team.filter((pokemonId) => pokemonId !== parseInt(id));
    store.setState({ team: newTeam });
    localStorage.setItem("team-pokemons", JSON.stringify(newTeam));
}

export { addToTeam, removeFromTeam };
