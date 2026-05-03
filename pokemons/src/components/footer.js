function createFooter() {
    const year = new Date().getFullYear();
    return `<footer>
            <p>Mon Pokedex project(Learning only) &copy;ZHUKOV Oleksandr ${year} — Build with Vite.js</p>
        </footer>`;
}
export { createFooter };
