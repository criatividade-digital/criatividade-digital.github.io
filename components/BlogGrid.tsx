import { BlogPost } from '../lib/blog';
import BlogCard from './BlogCard';

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
        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
