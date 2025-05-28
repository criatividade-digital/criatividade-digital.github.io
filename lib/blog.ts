import fs from 'fs/promises'; // Change to async filesystem
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'blog');

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    thumbnail: string;
    publishDate: string;
    updateDate?: string;
    tags: string[];
  };
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.readdir(BLOG_PATH);

    const postsPromises = files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.(md|mdx)$/, '');
        const fullPath = path.join(BLOG_PATH, file);
        const fileContent = await fs.readFile(fullPath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);

        return {
          slug,
          frontmatter: {
            title: frontmatter.title || 'Untitled',
            thumbnail: frontmatter.thumbnail || '/images/blog/default.jpg',
            publishDate: frontmatter.publishDate,
            updateDate: frontmatter.updateDate,
            tags: frontmatter.tags || [],
          },
          content,
        };
      });

    const posts = await Promise.all(postsPromises);
    return posts.sort(
      (a, b) =>
        new Date(b.frontmatter.publishDate).getTime() -
        new Date(a.frontmatter.publishDate).getTime()
    );
  } catch (error) {
    // If blog directory doesn't exist or there's an error
    // eslint-disable-next-line no-console
    console.error('Error getting posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
