import { formatDate } from '../utils'
import { store } from '../main'
import { createLoader } from '../components/loader'

async function renderArticles() {
    const { articles, loading, error } = store.getState()

    if (loading) return createLoader()
    if (error) return `<p class="error">Error: ${error}</p>`
    if (articles.length === 0) return '<p>No articles found.</p>'

    const articlesHTML = articles
        .map(
            (article) => `
        <article class="article-card">
            <h3>${article.title}</h3>
            <p>${article.text}</p>
            <a href="/article/${article.id}" class="btn-read" data-route>
                Read more
            </a>
        </article>`,
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
    if (!article) return '<h2>Article not found</h2>'
    store.setState({ currentArticle: article.id })
    return `
        <article class="single-article">
            <h2>${article.title}</h2>
            <p>${article.text}</p>
            <a href="/articles" data-route>← Back to articles</a>
        </article>`
}

export { renderArticles, renderArticle }
