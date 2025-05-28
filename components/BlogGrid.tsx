import BlogCard from './BlogCard';
import { BlogPost } from '../lib/blog';

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="blog-empty">
        <p>No blog posts found. Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="blog-section-title">Latest Blog Posts</h2>
        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
