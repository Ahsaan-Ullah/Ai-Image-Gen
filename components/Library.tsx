
import React, { useState, useMemo } from 'react';
import { Image } from '../types';
import ImageCard from './ImageCard';
import Modal from './Modal';
import { SearchIcon, PhotoIcon } from './Icons';

interface LibraryProps {
  images: Image[];
}

const IMAGES_PER_PAGE = 12;

const Library: React.FC<LibraryProps> = ({ images }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const filteredImages = useMemo(() =>
    images.filter(img => img.prompt.toLowerCase().includes(searchTerm.toLowerCase())),
    [images, searchTerm]
  );

  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  
  const paginatedImages = useMemo(() => {
    const start = (currentPage - 1) * IMAGES_PER_PAGE;
    const end = start + IMAGES_PER_PAGE;
    return filteredImages.slice(start, end);
  }, [filteredImages, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleRegenerate = () => {
      alert("Regenerate functionality would be implemented here.");
      setSelectedImage(null);
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      
      <div className="mb-6 relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by prompt..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full p-3 pl-12 rounded-lg bg-white dark:bg-gray-800 border-2 border-transparent focus:border-primary-500 focus:ring-0 transition"
        />
      </div>

      {filteredImages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedImages.map(image => (
              <ImageCard key={image.id} image={image} onPreview={() => setSelectedImage(image)} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
            <PhotoIcon className="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-500"/>
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">No Images Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                {searchTerm ? "Try a different search term." : "Generate some images to see them here!"}
            </p>
        </div>
      )}

      {selectedImage && (
        <Modal onClose={() => setSelectedImage(null)}>
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row gap-4">
            <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.prompt}
                className="md:w-2/3 object-contain rounded-lg"
            />
            <div className="md:w-1/3 flex flex-col space-y-4">
                <h3 className="text-lg font-bold">Details</h3>
                <p className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-y-auto max-h-32">
                    <strong>Prompt:</strong> {selectedImage.prompt}
                </p>
                <div className="text-sm">
                    <p><strong>Size:</strong> {selectedImage.size}</p>
                    <p><strong>Orientation:</strong> {selectedImage.orientation}</p>
                    <p><strong>Created:</strong> {selectedImage.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="flex-grow"></div>
                <button
                    onClick={handleRegenerate}
                    className="w-full p-3 rounded-lg bg-primary-500 text-white font-bold hover:bg-primary-600 transition"
                >
                    Regenerate
                </button>
                 <a
                    href={selectedImage.imageUrl}
                    download={`imagina-${selectedImage.id}.jpg`}
                    className="w-full text-center p-3 rounded-lg bg-gray-200 dark:bg-gray-700 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    Download
                </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Library;
   