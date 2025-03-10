import MovieShowcase from '@/components/features/features'
import HeroBanner from '@/components/home'
import GenreTabs from '@/components/home/GenreTabs'
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'African & Diaspora Movie Recommendations',
  description: 'Discover curated African and diaspora films tailored to your preferences on SankofaFlix',
  keywords: ['african movies', 'black cinema', 'movie recommendations', 'diaspora films', 'afrocentric'],
  ogImage: '/images/sankofa-home-og.jpg',
});


const Home = () => {
  return (
    <>
      <div className="container-lg">
        <HeroBanner />
        <MovieShowcase />
        <GenreTabs />
      </div>
    </>
  )
}

export default Home