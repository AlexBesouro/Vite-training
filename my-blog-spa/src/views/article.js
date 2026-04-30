import { formatDate } from '../utils'
import { ARTICLES } from '../mock_db/DB'
import { renderNotFound } from './notFound';
const funcNotFound = renderNotFound

function renderArticles() {
    const articlesHTML = ARTICLES.map(article => `
        <article class="article-card">
            <h3>${article.title}</h3>
            <p>${article.text}</p>
            <a href="/article/${article.id}" class="btn-read" data-route>
                Read more
            </a>
        </article>
    `).join("");

    return `
        <section class="page-articles">
            <h2>Articles</h2>
            ${articlesHTML}
        </section>
    `;
}

function renderArticle(id){
    const article = ARTICLES.find(a=> a.id === parseInt(id))
    if (!article) return funcNotFound()
    return `<h2>${article.title}</h2><p>${article.text}</p>`
}

export {renderArticles, renderArticle}