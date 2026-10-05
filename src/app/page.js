import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialMedia from '@/components/SocialMedia';
import TabsSection from '@/components/TabsSection';
import SubListSection from '@/components/SubListSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Initial Page Load Screen */}
      <Preloader />

      {/* Website Sections */}
      <Navbar />
      <Hero />
      <SocialMedia />
      <TabsSection />
      <SubListSection />
    </main>
  );
}
