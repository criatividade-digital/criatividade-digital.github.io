import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, thumbnail, publishDate, tags } = frontmatter;

  return (
    <article className="blog-card">
      <Link href={`/blog/${slug}`} className="blog-card-link">
        <div className="blog-card-image">
          <Image src={thumbnail} alt={title} width={400} height={200} className="card-thumbnail" />
        </div>
        <div className="blog-card-content">
          <h3 className="blog-card-title">{title}</h3>
          <time className="blog-card-date" dateTime={publishDate}>
            {new Date(publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {tags.length > 0 && (
            <div className="blog-card-tags">
              {tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
