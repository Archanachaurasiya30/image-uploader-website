import { useEffect, useState } from 'react'

const samplePost = {
    _id: 'sample-post',
    username: 'yudh',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85',
    caption: 'A beautiful sunset over the mountains.',
}

const Feed = () => {
    const [posts, setPosts] = useState([samplePost])

    useEffect(() => {
        let isCancelled = false

        const loadPosts = async () => {
            try {
                const response = await fetch('/api/posts')
                const result = await response.json().catch(() => ({}))
                if (!response.ok || isCancelled) {
                    return
                }
                setPosts([samplePost, ...(result.posts || [])])
            } catch {
                return
            }
        }

        loadPosts()
        return () => {
            isCancelled = true
        }
    }, [])

  return (
        <main className='feed-section'>
            <div className='gallery-heading'>
                <div>
                    <p className='eyebrow'>Collected moments</p>
                    <h1>Your gallery<span className='heading-period'>.</span></h1>
                </div>
                <p className='gallery-count'>{posts.length} {posts.length === 1 ? 'photo' : 'photos'}</p>
            </div>

            {posts.length ? (
                <div className='gallery-grid'>
                    {posts.map((post) => (
                        <article key={post._id || post.id} className='post-card'>
                            <div className='post-image-wrap'>
                                <img src={post.image} alt={post.caption || 'Uploaded photograph'} loading='lazy' />
                            </div>
                            <div className='post-copy'>
                                {post.username && <span className='post-username'>@{post.username}</span>}
                                <p>{post.caption}</p>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className='gallery-empty'>
                    <span className='preview-empty-mark' aria-hidden='true'>✳</span>
                    <h2>Your collection starts here</h2>
                    <p>Share an image and it will find a home in your gallery.</p>
                </div>
            )}
        </main>
  )
}

export default Feed
