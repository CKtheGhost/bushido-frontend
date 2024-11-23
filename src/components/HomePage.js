import React from 'react';

const Icons = {
  ChevronRight: () => (
    <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  Wallet: () => (
    <svg className="w-6 h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
    </svg>
  ),
};

const features = [
  {
    title: "Samurai Legacy",
    description: "Immerse yourself in the rich tradition of the Bushido code through unique 3D NFTs",
    route: '/samurai-legacy'
  },
  {
    title: "Community Driven",
    description: "Shape the narrative through voting and collaborative storytelling",
    route: '/community'
  },
  {
    title: "Customizable 3D Art",
    description: "Create and customize your own unique Samurai warrior",
    route: '/animator'
  },
  {
    title: "Animated Series",
    description: "Experience your NFTs come to life in our upcoming animated series",
    route: '/animated-series'
  }
];

const HomePage = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExploreCollection = () => {
    window.location.href = '/collection';
  };

  const handleNavigate = (route) => {
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white relative overflow-hidden">
      {/* Video Background with Audio */}
      <video 
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
        src="/videos/Bushido_Story_004.mp4" 
        type="video/mp4" 
        autoPlay 
        loop 
        muted={false}
        controls={false} 
        playsInline
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />

      {/* Fixed Background Pattern */}
      <div 
        className="fixed inset-0 bg-repeat opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 20L20 0L40 20L20 20L20 40L20 20Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Header with Logo and Wallet Button */}
      <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-sm border-b border-red-900/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-wider text-red-500">BUSHIDO</h1>
          <button 
            className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-xl group border border-red-700/50 flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-red-900"
            onClick={handleExploreCollection}
          >
            Connect Wallet 
            <Icons.Wallet />
          </button>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="h-screen flex flex-col items-center justify-center text-white px-4 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-96 h-96 bg-red-800 rounded-full blur-3xl" />
        </div>

        <div 
          className={`relative text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-8xl font-extrabold mb-6 tracking-widest drop-shadow-lg">
            BUSHIDO
          </h1>
          <div className="w-32 h-1 bg-red-500 mx-auto mb-8" />
          <p className="text-2xl mb-12 max-w-2xl mx-auto text-gray-300 font-light">
            Join us in shaping the future of interactive storytelling through unique 3D NFTs 
            and community-driven narratives.
          </p>
          <button 
            className="bg-red-700 hover:bg-red-600 text-white text-xl px-10 py-5 group border border-red-700/50 rounded-xl flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-red-900 mx-auto"
            onClick={handleExploreCollection}
          >
            Explore Collection 
            <span className="ml-2">
              <Icons.ChevronRight />
            </span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-gradient-to-b from-black to-neutral-800">
        <div className="container mx-auto px-4 relative">
          <h2 className="text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">Features</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                onClick={() => handleNavigate(feature.route)}
                className={`bg-neutral-900 border border-red-900 group hover:border-red-500 transition-all duration-300 p-8 rounded-2xl shadow-lg hover:shadow-red-900 ${
                  feature.route ? 'cursor-pointer' : ''
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <div className="w-12 h-1 bg-red-500 mb-6 transition-all group-hover:w-16" />
                <p className="text-gray-400 text-lg">{feature.description}</p>
                {feature.route && (
                  <div className="mt-4 flex items-center text-red-500">
                    <span className="mr-2">Learn more</span>
                    <Icons.ChevronRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-red-500">BUSHIDO</h3>
              <div className="w-10 h-1 bg-red-500 mb-6" />
              <p className="text-gray-400 text-lg">Where Art, Community, and Innovation Collide.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-red-900/20 text-center text-gray-400">
            <p>&copy; 2024 Bushido. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;