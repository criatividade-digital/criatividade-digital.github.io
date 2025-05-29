import { Metadata } from 'next';
import { Box, Container, Stack, Text, Title } from '@mantine/core';
import BlogGrid from '../components/BlogGrid';
import { getAllPosts } from '../lib/blog';

export const metadata: Metadata = {
  title: 'CREATIVITY.digital',
  description:
    'The CRIATIVIDADE.digital project encourages everyone to become creators—not just consumers—of technology. "Digital creatives" use technological tools to think critically, solve problems creatively, explore new ideas, collaborate, and communicate effectively',
  keywords: ['creativity', 'digital', 'technology', 'education'],
  openGraph: {
    title: 'CREATIVITY.digital',
    description:
      'The CRIATIVIDADE.digital project encourages everyone to become creators—not just consumers—of technology. "Digital creatives" use technological tools to think critically, solve problems creatively, explore new ideas, collaborate, and communicate effectively',
    type: 'website',
  },
};

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <Stack gap={0}>
      <Box className="hero">
        <Container size="lg">
          <Stack gap="md" ta="center" py={{ base: 'xl', sm: 'xxl' }}>
            <Title order={1} size="h1" fw={700} c="white">
              Welcome to CREATIVITY.digital
            </Title>
            <Text size="lg" c="white" opacity={0.9} maw={600} mx="auto">
              Your creative digital journey starts here!
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="lg" py="xl">
        <BlogGrid posts={posts} />
      </Container>
    </Stack>
  );
}
