import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { getAllPosts } from '../lib/blog';
import BlogGrid from '../components/BlogGrid';

export default async function HomePage() {
  const posts = await getAllPosts(); // Add await here

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <div>
        <main>
          <section className="hero">
            <div className="container">
              <h1>Welcome to Creativity Digital</h1>
              <p>Your creative digital journey starts here</p>
            </div>
          </section>
          
          <BlogGrid posts={posts} />
        </main>
      </div>
    </>
  );
}
