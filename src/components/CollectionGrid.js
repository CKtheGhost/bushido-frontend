import React from 'react';

const images = [
  { id: 1, src: "/images/collection/685.jpg", alt: "Image 685" },
  { id: 2, src: "/images/collection/78.jpg", alt: "Image 78" },
  { id: 3, src: "/images/collection/188.jpg", alt: "Image 188" },
  { id: 4, src: "/images/collection/439.jpg", alt: "Image 439" },
  { id: 5, src: "/images/collection/92.jpg", alt: "Image 92" },
  { id: 6, src: "/images/collection/139.jpg", alt: "Image 139" },
  { id: 7, src: "/images/collection/111.jpg", alt: "Image 111" },
];

const CollectionGrid = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 p-8">
      <h1 className="text-4xl text-center text-white font-bold mb-12">
        Explore the Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-72 object-contain bg-black"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-red-500 mb-2">{image.alt}</h2>
              <p className="text-gray-400">
                A unique piece of the Bushido collection, embodying the spirit of the Samurai.
              </p>
              <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionGrid;