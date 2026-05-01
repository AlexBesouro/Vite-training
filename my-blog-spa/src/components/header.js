function createHeader() {
    return `
        <header class="site-header">
            <div class="header-top">
                <h1 class="site-title">Mon Mini-Blog</h1>
                <button class="theme-toggle" data-toggle-theme title="Toggle dark mode">🌙</button>
            </div>
            <nav class="site-nav">
                <a href="/home" data-route>Home</a>
                <a href="/articles" data-route>Articles</a>
                <a href="/about" data-route>About</a>
            </nav>
        </header>
    `;
}

export { createHeader }