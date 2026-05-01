import { formatDate } from '../utils'
import { store } from '../main'
import { renderNotFound } from './notFound'
const funcNotFound = renderNotFound

function renderArticles() {
    const { articles } = store.getState()
    const articlesHTML = articles
        .map(
            (article) => `
        <article class="article-card">
            <h3>${article.title}</h3>
            <p>${article.text}</p>
            <a href="/article/${article.id}" class="btn-read" data-route>
                Read more
            </a>
        </article>=`,
        )
        .join('')

    return `
        <section class="page-articles">
            <h2>Articles</h2>
            ${articlesHTML}
        </section>
    `
}

function renderArticle(id) {
    const { articles } = store.getState()
    const article = articles.find((a) => a.id === parseInt(id))
    if (!article) return funcNotFound()
    store.setState({ currentArticle: article.id })
    return `<h2>${article.title}</h2><p>${article.text}</p>`
}

export { renderArticles, renderArticle }
