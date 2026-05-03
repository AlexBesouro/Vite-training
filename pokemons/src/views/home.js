function renderHome() {
    return `
        <section class="home-page">
            <div class="home-content">
                <h2>Welcome to the Ultimate Pokedex</h2>
                <p>
                    Explore the vast world of Pokemon! This application allows you to 
                    browse through species, check their stats, and build your own dream team.
                </p>
                <div class="home-features">
                    <div class="feature-card">
                        <h3>Search</h3>
                        <p>Find any Pokemon by name or ID.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Analyze</h3>
                        <p>Detailed stats, types, and abilities at your fingertips.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Collect</h3>
                        <p>Manage your personal team of six Pokemon.</p>
                    </div>
                </div>
                <button class="cta-button" onclick="location.hash='#/pokelist'">Get Started</button>
            </div>
        </section>
    `;
}

export { renderHome };
