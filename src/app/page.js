import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialMedia from '@/components/SocialMedia';
import TabsSection from '@/components/TabsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SocialMedia />
      <TabsSection />
    </main>
  );
}
