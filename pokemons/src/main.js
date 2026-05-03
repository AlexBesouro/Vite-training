import "./styles/style.css";
import { createHeader, createFooter, createLoader } from "./components";
import { renderHome, renderNotFound, renderPokemons, loadPokemons, renderPokemon, renderTeam } from "./views";
import { createStore } from "../store";
import { addToTeam, removeFromTeam } from "./utils/teamLogic";

const store = createStore({
    pokemons: [],
    loading: false,
    error: null,
    theme: localStorage.getItem("site-theme") || "light",
    team: JSON.parse(localStorage.getItem("team-pokemons")) || [],
});

const routes = [
    { path: /^\/home$/, render: renderHome },
    { path: /^\/pokemons$/, render: renderPokemons },
    { path: /^\/team$/, render: renderTeam },
    { path: /^\/pokemon\/(\d+)$/, render: renderPokemon },
    { path: /^.*$/, render: renderNotFound },
];

const appContent = document.querySelector("#app");

async function renderInit(route) {
    appContent.innerHTML = `${createHeader()}
                            <main>
                                <section id="center"></section>
                            </main>
                            ${createFooter()}`;
    await navigateTo(route);
}
async function renderMainContent(func) {
    const sectionContent = document.querySelector("#center");
    sectionContent.innerHTML = await func();
}

function getMatchedRoute(route) {
    for (const r of routes) {
        const result = route.match(r.path);
        if (result) {
            return { activeRoute: r, params: result.slice(1) };
        }
    }
    return null;
}

async function navigateTo(route) {
    const matchRoute = getMatchedRoute(route);
    if (matchRoute) {
        const { activeRoute, params } = matchRoute;
        if (route === "/pokemons" || route.startsWith("/pokemons/")) {
            loadPokemons(rerender);
        }
        await renderMainContent(() => activeRoute.render(...params));
    }
    if (window.location.pathname !== route) {
        window.history.pushState({}, "", route);
    }
}
window.addEventListener("popstate", () => {
    navigateTo(window.location.pathname);
});

async function rerender() {
    const currentPath = window.location.pathname;
    await navigateTo(currentPath);
}

const start = window.location.pathname === "/" ? await renderInit("/home") : await renderInit(window.location.pathname);

document.addEventListener("click", async (e) => {
    const routeLink = e.target.closest("a[data-route]");
    if (routeLink) {
        e.preventDefault();
        await navigateTo(routeLink.getAttribute("href"));
        return;
    }

    const pokemonCard = e.target.closest(".pokemon-card");
    if (pokemonCard) {
        const id = pokemonCard.dataset.id;
        await navigateTo(`/pokemon/${id}`);
        return;
    }

    const btn = e.target.closest(".add-team-btn");
    if (btn) {
        addToTeam(btn.dataset.id);
        return;
    }

    const removeBtn = e.target.closest(".remove-team-btn");
    if (removeBtn) {
        removeFromTeam(removeBtn.dataset.id);
        if (window.location.pathname === "/team") {
            navigateTo("/team");
        }
    }
});

export { store };
