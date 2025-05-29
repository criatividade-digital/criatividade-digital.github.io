import Image from 'next/image';
import Link from 'next/link';
import { Card, Text, Badge, Group, Stack, Title, Box } from '@mantine/core';
import { BlogPost } from '../lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, thumbnail, publishDate, tags } = frontmatter;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      component={Link}
      href={`/blog/${slug}`}
      style={{ textDecoration: 'none', height: '100%' }}
    >
      <Box pos="relative" style={{ aspectRatio: '1.91' }} mb="md">
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: 'cover', borderRadius: '4px' }}
        />
      </Box>

      <Stack gap="sm">
        <Title order={3} size="h4" lineClamp={2}>
          {title}
        </Title>

        <Text size="sm" c="dimmed">
          {new Date(publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        {tags.length > 0 && (
          <Group gap="xs">
            {tags.map((tag) => (
              <Badge key={tag} variant="light" size="sm">
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>
    </Card>
  );
}
