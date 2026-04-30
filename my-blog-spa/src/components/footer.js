function createFooter() {
    const year = new Date().getFullYear();
    return `
        <footer class="site-footer">
            <p>Mon Mini-Blog &copy; ${year} — Construit avec Vite.js</p>
        </footer>
    `;
}

export {createFooter}