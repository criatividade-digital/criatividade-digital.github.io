import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {}; // Or handle 404 metadata if needed
  }
  const { frontmatter } = post;

  return {
    metadataBase: new URL('https://creativity.digital'),
    title: frontmatter.title,
    keywords: frontmatter.tags?.join(', '),
    openGraph: {
      title: frontmatter.title,
      type: 'article',
      publishedTime: frontmatter.publishDate,
      modifiedTime: frontmatter.updateDate,
      tags: frontmatter.tags,
      images: [
        {
          url: frontmatter.thumbnail,
          width: 1200,
          height: 628,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      images: [frontmatter.thumbnail],
    },
  };
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
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Breadcrumbs>
          <Anchor href="/" size="sm">
            Home
          </Anchor>
          Blog
        </Breadcrumbs>

        <Stack gap="md">
          <Title order={1} size="h1">
            {frontmatter.title}
          </Title>

          <Group gap="lg" wrap="wrap">
            <Text size="sm" c="dimmed">
              Published:{' '}
              {new Date(frontmatter.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>

            {frontmatter.updateDate && (
              <Text size="sm" c="dimmed">
                Updated:{' '}
                {new Date(frontmatter.updateDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            )}
          </Group>

          <Group gap="xs">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="light" size="sm">
                {tag}
              </Badge>
            ))}
          </Group>
        </Stack>

        <Box>
          <Image
            src={frontmatter.thumbnail}
            alt={frontmatter.title}
            width={1200}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Box component="article" style={{ fontSize: '16px', lineHeight: 1.6 }}>
          {renderedContent}
        </Box>
      </Stack>
    </Container>
  );
}
