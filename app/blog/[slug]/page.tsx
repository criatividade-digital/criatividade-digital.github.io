import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  const { content: renderedContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  });

  return (
    <div className="blog-post-container">
      <article className="blog-post">
        <div className="blog-post-header">
          <h1>{frontmatter.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={frontmatter.publishDate}>
              Published:{' '}
              {new Date(frontmatter.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            {frontmatter.updateDate && (
              <time dateTime={frontmatter.updateDate}>
                Updated:{' '}
                {new Date(frontmatter.updateDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>

          <div className="blog-post-tags">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="blog-post-feature-image">
          <Image
            src={frontmatter.thumbnail}
            alt={frontmatter.title}
            width={1200}
            height={600}
            className="blog-post-image"
          />
        </div>

        <div className="blog-post-content">{renderedContent}</div>
      </article>
    </div>
  );
}
