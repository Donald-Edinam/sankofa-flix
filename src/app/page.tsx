import MovieShowcase from '@/components/features-02/features-02'
import HeroBanner from '@/components/home'
import GenreTabs from '@/components/home/GenreTabs'
import React from 'react'

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