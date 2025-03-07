import React from 'react';
import { Clapperboard, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const footerLinks = [
  {
    title: "Movies",
    links: ["New Releases", "Trending", "Coming Soon", "Top Rated", "Classics"]
  },
  {
    title: "Genres",
    links: ["Action", "Comedy", "Drama", "Documentary", "Horror", "Sci-Fi"]
  },
  {
    title: "About",
    links: ["Our Story", "Careers", "Press", "Blog", "Contact"]
  },
  {
    title: "Support",
    links: ["Help Center", "FAQ", "Terms of Service", "Privacy Policy", "Cookie Policy"]
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 bg-gray-900 text-white">
      {/* Video Showcase Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
        
        <div className="relative h-[40vh] overflow-hidden">
          <video 
            className="absolute w-full h-full object-cover opacity-40"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="https://assets.mixkit.co/active_storage/video_items/100279/1722631093/100279-video-720.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Next Favorite Movie</h2>
            <p className="text-lg text-gray-300 max-w-2xl mb-8">Join millions of movie enthusiasts and explore the world of cinema with MovieFlix.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Start Watching Now
              </button>
              <button className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Browse Collections
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Clapperboard className="h-8 w-8 text-green-500" />
              <h1 className="text-2xl font-bold">SankofaFlix</h1>
            </div>
            <p className="text-gray-400 mb-6">
              Your ultimate destination for discovering and enjoying the best movies from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter */}
        {/* <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Subscribe to our newsletter for the latest movie updates.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500 w-full md:w-64"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SankofaFlix. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-green-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-green-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-green-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;