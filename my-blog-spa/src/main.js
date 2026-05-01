import './styles/global.css'
import { createStore } from './store.js'
import { formatDate } from './utils/'
import { createHeader } from './components/header.js'
import { createFooter } from './components/footer.js'
import {
    renderAbout,
    renderArticles,
    renderHome,
    renderNotFound,
    renderArticle,
} from './views/index.js'
import { ARTICLES } from './mock_db/DB.js'
import { loadArticlesAction } from './api/actions'

const app = document.querySelector('#app')

const routes = [
    { path: /^\/home$/, render: renderHome },
    { path: /^\/articles$/, render: renderArticles },
    { path: /^\/about$/, render: renderAbout },
    { path: /^\/article\/(\d+)$/, render: renderArticle },
    { path: /^.*$/, render: renderNotFound },
]
const store = createStore({
    articles: [], //ARTICLES,
    loading: false,
    currentArticle: null,
    error: null,
    theme: localStorage.getItem('blog-theme') || 'light',
})

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
}

applyTheme(store.getState().theme)

store.subscribe((state) => {
    applyTheme(state.theme)
})

function getMatchedRoute(path) {
    for (const route of routes) {
        const result = path.match(route.path)
        if (result) {
            return { activeRoute: route, params: result.slice(1) }
        }
    }
    return null
}

async function renderInit(route) {
    app.innerHTML = `
    <main>
        <header>${createHeader()}</header>
        <section id="center"></section>
        <footer>${createFooter()}</footer>
    </main>`
    await navigateTo(route)
}

async function renderAppContent(func) {
    const sectionContent = document.querySelector('#center')
    sectionContent.innerHTML = await func()
}
async function navigateTo(route) {
    const matchData = getMatchedRoute(route)
    if (matchData) {
        const { activeRoute, params } = matchData
        if (route === '/articles' || route.startsWith('/article/')) {
            loadArticlesAction()
        }
        await renderAppContent(() => activeRoute.render(...params))
    }
    if (window.location.pathname !== route) {
        window.history.pushState({}, '', route)
    }
}

async function rerender() {
    const currentPath = window.location.pathname
    await navigateTo(currentPath)
}
document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-route]')
    if (link) {
        e.preventDefault()
        const route = link.getAttribute('href')
        navigateTo(route)
    }
})

document.addEventListener('click', (e) => {
    const themeToggle = e.target.closest('[data-toggle-theme]')
    if (themeToggle) {
        const currentTheme = store.getState().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        store.setState({ theme: newTheme })
    }
})

window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname)
})

const start =
    window.location.pathname === '/'
        ? await renderInit('/home')
        : await renderInit(window.location.pathname)

console.log(store.getState())
console.log('My Mini-Blog SPA - Powered by Vite!')
console.log('Mode:', import.meta.env.MODE)

export { store, rerender }
