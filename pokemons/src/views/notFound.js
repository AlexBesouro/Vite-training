function renderNotFound() {
    return `
        <section class="page-not-found">
            <h2>404 — Page not found</h2>
            <p>This page doesn't exist.</p>
            <a href="/home" data-route>Back home</a>
        </section>
    `;
}
export{renderNotFound}