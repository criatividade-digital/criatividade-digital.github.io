import { Container, Title, Text, Stack, Box } from '@mantine/core';
import BlogGrid from '../components/BlogGrid';
import { getAllPosts } from '../lib/blog';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <Stack gap={0}>
      <Box className="hero">
        <Container size="lg">
          <Stack gap="md" ta="center" py={{ base: 'xl', sm: 'xxl' }}>
            <Title 
              order={1} 
              size="h1"
              fw={700}
              c="white"
            >
              Welcome to CREATIVITY.digital
            </Title>
            <Text 
              size="lg"
              c="white" 
              opacity={0.9}
              maw={600}
              mx="auto"
            >
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
