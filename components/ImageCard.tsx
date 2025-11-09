
import React from 'react';
import { Image } from '../types';
import { SparklesIcon } from './Icons';

interface ImageCardProps {
  image: Image;
  onPreview: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onPreview }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // The link is handled by the browser's download attribute
  };

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer" onClick={onPreview}>
      <img
        src={image.imageUrl}
        alt={image.prompt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
        <p className="text-white text-sm line-clamp-2 mb-2">
          {image.prompt}
        </p>
        <div className="flex justify-end space-x-2">
          <button onClick={onPreview} className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors">
            <SparklesIcon className="w-4 h-4" />
          </button>
          <a
            href={image.imageUrl}
            download={`imagina-${image.id}.jpg`}
            onClick={handleDownload}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
   