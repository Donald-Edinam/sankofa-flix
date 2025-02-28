import MovieShowcase from '@/components/features-02/features-02'
import Footer05Page from '@/components/footer-05/footer-05'
import GenreTabs from '@/components/home/GenreTabs'
import Navbar05Page from '@/components/navbar-05/navbar-05'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className="container-lg">
        <Navbar05Page />
        <MovieShowcase />
        <GenreTabs />
        <Footer05Page />
      </div>
    </>
  )
}

export default Home