function createHeader() {
    return `<header class="site-header">
                <div class="header-hero">
                    <div class="header-logo">
                        <img src="/src/assets/Pokemon-Logo.png" alt="Pokemon logo" />
                    </div>
                    <h1>Pokedex</h1>
                </div>
                <nav class="site-navigation">
                    <a href="/home" data-route>Home</a>
                    <a href="/pokemons" data-route>Pokemons</a>
                    <a href="/team" data-route>Team</a>
                </nav>
                <button class="theme-toggle" data-theme-toggle title="Toggle site theme">
                    <span style="font-size: 30px;">&#127761;</span>
                </button>
            </header>`;
}
//☀️
export { createHeader };
