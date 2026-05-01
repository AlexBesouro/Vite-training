const API_URL =
    import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'

async function fetchPosts(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`)
    if (!response.ok) {
        throw newError(`HTTP Error: ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}
async function fetchArticles() {
    const posts = await fetchPosts('/posts?_limit=5')
    return posts.map((post) => {
        return {
            id: post.id,
            title: post.title,
            text: post.body,
            date: new Date().toLocaleDateString(),
        }
    })
}

export { fetchArticles }
