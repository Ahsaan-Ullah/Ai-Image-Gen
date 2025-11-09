import React, { useState } from 'react';
import { Orientation, ImageSize, Image } from '../types';
// FIX: Added PhotoIcon to imports to resolve reference error.
import { SparklesIcon, LandscapeIcon, PortraitIcon, SquareIcon, PhotoIcon } from './Icons';
import Spinner from './Spinner';

interface GeneratorProps {
  onGenerate: (prompt: string, orientation: Orientation, size: ImageSize) => void;
  isGenerating: boolean;
  userCredits: number;
  lastImage: Image | null;
  error: string | null;
}

const Generator: React.FC<GeneratorProps> = ({ onGenerate, isGenerating, userCredits, lastImage, error }) => {
  const [prompt, setPrompt] = useState('');
  const [orientation, setOrientation] = useState<Orientation>('Square');
  const [size, setSize] = useState<ImageSize>('HD');

  const getCreditCost = (s: ImageSize): number => {
    return { HD: 1, '2K': 3, '4K': 5 }[s];
  };

  const cost = getCreditCost(size);
  const canGenerate = userCredits >= cost && !isGenerating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && canGenerate) {
      onGenerate(prompt, orientation, size);
    }
  };

  // FIX: Changed OptionButton to a function declaration to fix generic type inference issues with TSX.
  function OptionButton<T>({
    value,
    selectedValue,
    setSelectedValue,
    children,
  }: {
    value: T;
    selectedValue: T;
    setSelectedValue: (v: T) => void;
    children: React.ReactNode;
  }) {
    return (
      <button
        type="button"
        onClick={() => setSelectedValue(value)}
        className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${
          selectedValue === value
            ? 'bg-primary-500/20 border-primary-500 text-primary-500'
            : 'bg-gray-200 dark:bg-gray-800 border-transparent hover:border-gray-400 dark:hover:border-gray-600'
        }`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Generation Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Create your masterpiece</h1>
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
          <div className="flex-grow">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic cityscape at sunset, cinematic lighting, hyperrealistic..."
              className="w-full h-32 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-transparent focus:border-primary-500 focus:ring-0 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Orientation</label>
            <div className="flex space-x-2">
              <OptionButton value="Portrait" selectedValue={orientation} setSelectedValue={setOrientation}>
                <div className="flex items-center justify-center space-x-2"><PortraitIcon className="w-5 h-5"/><span>Portrait</span></div>
              </OptionButton>
              <OptionButton value="Landscape" selectedValue={orientation} setSelectedValue={setOrientation}>
                <div className="flex items-center justify-center space-x-2"><LandscapeIcon className="w-5 h-5"/><span>Landscape</span></div>
              </OptionButton>
              <OptionButton value="Square" selectedValue={orientation} setSelectedValue={setOrientation}>
                <div className="flex items-center justify-center space-x-2"><SquareIcon className="w-5 h-5"/><span>Square</span></div>
              </OptionButton>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <div className="flex space-x-2">
              <OptionButton value="HD" selectedValue={size} setSelectedValue={setSize}>
                <div className="text-center">HD <span className="text-xs opacity-75">(1 Credit)</span></div>
              </OptionButton>
              <OptionButton value="2K" selectedValue={size} setSelectedValue={setSize}>
                <div className="text-center">2K <span className="text-xs opacity-75">(3 Credits)</span></div>
              </OptionButton>
              <OptionButton value="4K" selectedValue={size} setSelectedValue={setSize}>
                <div className="text-center">4K <span className="text-xs opacity-75">(5 Credits)</span></div>
              </OptionButton>
            </div>
          </div>
          
          {error && <div className="text-red-500 text-sm text-center p-2 bg-red-500/10 rounded-md">{error}</div>}

          <button
            type="submit"
            disabled={!canGenerate || !prompt.trim()}
            className="w-full flex items-center justify-center p-4 rounded-lg bg-primary-500 text-white font-bold text-lg hover:bg-primary-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-6 h-6 mr-2" />
                <span>Generate ({cost} {cost > 1 ? 'Credits' : 'Credit'})</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Image Display */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center justify-center aspect-square">
        {isGenerating ? (
          <div className="flex flex-col items-center text-center">
            <Spinner className="w-16 h-16 mb-4"/>
            <p className="text-lg font-semibold">Conjuring your vision...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">This might take a moment.</p>
          </div>
        ) : lastImage ? (
          <img src={lastImage.imageUrl} alt={lastImage.prompt} className="max-w-full max-h-full rounded-lg object-contain"/>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <PhotoIcon className="w-24 h-24 mx-auto mb-4 opacity-50"/>
            <h2 className="text-xl font-semibold">Your generated image will appear here</h2>
            <p>Let's create something amazing!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
