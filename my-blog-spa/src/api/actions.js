import { store, rerender } from '../main'
import { fetchArticles } from './api'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function loadArticlesAction(force = false) {
    const { articles, loading } = store.getState()

    if (loading || (!force && articles.length > 0)) return

    store.setState({ loading: true, error: null })

    try {
        const data = await fetchArticles()
        await delay(2000)
        store.setState({ articles: data, loading: false })
        console.log(store.getState())
    } catch (err) {
        store.setState({ error: err.message, loading: false })
    } finally {
        rerender()
    }
}
export { loadArticlesAction }
