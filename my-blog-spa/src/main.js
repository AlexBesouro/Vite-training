import './styles/global.css'
import { formatDate } from './utils/'
import {createHeader} from './components/header.js'
import {createFooter} from './components/footer.js'
import {renderAbout, renderArticles,renderHome,renderNotFound, renderArticle } from './views/index.js'

const app = document.querySelector('#app');

const routes = [
    {path: /^\/home$/, render: renderHome},
    {path: /^\/articles$/, render: renderArticles},
    {path: /^\/about$/, render: renderAbout},
    {path: /^\/article\/(\d+)$/, render: renderArticle},
    {path: /^.*$/, render: renderNotFound }

]
function getMatchedRoute(path){
    for (const route of routes){
        const result = path.match(route.path)
        if (result){
            return {activeRoute: route, params: result.slice(1)}
        }
    }
    return null
}

function renderInit(route){
    app.innerHTML =`
    <main>
        <header>${createHeader()}</header>
        <section id="center"></section>
        <footer>${createFooter()}</footer>
    </main>`
    navigateTo(route)
    
}

function renderAppContent(func){
    const sectionContent = document.querySelector("#center")
    sectionContent.innerHTML = func()
}
function navigateTo(route){
    const matchData = getMatchedRoute(route)
    if(matchData){
        const {activeRoute, params} = matchData
        renderAppContent(()=> activeRoute.render(...params))
    }
    if (window.location.pathname !== route){
        window.history.pushState({},"", route)
    }
}
document.addEventListener("clicl", (e)=> {
    const link = e.target.closest("[data-route]")
    if(link){
        e.preventDefault()
        const route = link.getAttribute("href")
        navigateTo(route)
    }
})

window.addEventListener("popstate", ()=>{
    navigateTo.window.location.pathname
})

const start = window.location.pathname === "/" ? renderInit("/home") : renderInit(window.location.pathname);


console.log("My Mini-Blog SPA - Powered by Vite!")
console.log("Mode:", import.meta.env.MODE)