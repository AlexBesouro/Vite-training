function createHeader() {
    return `
        <header class="site-header">
            <h1 class="site-title">Mon Mini-Blog</h1>
            <nav class="site-nav">
                <a href="/home" data-route>Home</a>
                <a href="/articles" data-route>Articles</a>
                <a href="/about" data-route>About</a>
            </nav>
        </header>
    `;
}

export { createHeader }