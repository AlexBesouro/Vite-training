const articles = [
    {id: 1, title: "Article 1", text: "ABCdsigjfpisdjgfipdsjpigfjsdpifgps'dgjps"},
    {id: 2, title: "Article 2", text: "dvfnsdxcglfdxsl"}
]

function viewHome(){
    return `<h2>Accueil</h2><p>Bienvenue !</p>`
} 

function viewArticle(id){
    const article = articles.find(a => a.id === parseInt(id))
    if (!article) return renderNotFound()
    return `<h2>${article.title}</h2><p>${article.text}</p>`
} 

function viewContact(){
    return `<h2>Contact</h2><p>Ecrivez-moi !</p>`
}

function renderNotFound(){
    return `<h2>Page not found</h2>`
}

const routes = [
    {path: /^\/home$/, view: viewHome},
    {path: /^\/article\/(\d+)$/, view: viewArticle},
    {path: /^\/contact$/, view: viewContact},
    {path: /^.*$/, view: renderNotFound }
]

const app = document.querySelector("#app")

function getMatchedRoute(route) {
    for (const r of routes) {
        const result = route.match(r.path)
        if (result) {
            console.log(r)
            console.log(result)
            console.log(result.slice(1))
            return { activeRoute: r, params: result.slice(1) }
        }
    }
    return null
}

function renderPage(func){
    app.innerHTML = `
    <section id="center">
        <main id="content">${func()}</main>
    </section>
    `;
}




function navigateTo(route){
    const matchData = getMatchedRoute(route)
    
    if (matchData) {
        const { activeRoute, params } = matchData
        console.log(activeRoute)
        console.log(activeRoute.view(...params))
        renderPage(() => activeRoute.view(...params))
    }

    if (window.location.pathname !== route) {
        window.history.pushState({}, "", route);
    }
}

document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-route]")
    if (link) {
        e.preventDefault()
        const route = link.getAttribute("href")
        navigateTo(route)
    }
})

window.addEventListener("popstate", () => {

    navigateTo(window.location.pathname)
})

const renderInit = window.location.pathname === "/" ? "/home" : window.location.pathname;
navigateTo(renderInit)