
import React, { useState, useCallback, useEffect } from 'react';
import { User, Image, View, Orientation, ImageSize, CreditPackage } from './types';
import Header from './components/Header';
import Generator from './components/Generator';
import Library from './components/Library';
import Pricing from './components/Pricing';
import { generateImage as generateImageAPI } from './services/geminiService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentView, setCurrentView] = useState<View>('generator');
  const [user, setUser] = useState<User>({
    id: '1',
    email: 'user@example.com',
    credits: 25,
    role: 'USER',
  });
  const [images, setImages] = useState<Image[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getCreditCost = (size: ImageSize): number => {
    switch(size) {
      case 'HD': return 1;
      case '2K': return 3;
      case '4K': return 5;
      default: return 1;
    }
  };

  const handleGenerateImage = useCallback(async (prompt: string, orientation: Orientation, size: ImageSize) => {
    const cost = getCreditCost(size);
    if (user.credits < cost) {
      setError('Not enough credits to generate image.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const fullPrompt = `${prompt}, ${size} resolution, high detail`;
      const imageUrl = await generateImageAPI(fullPrompt, orientation);

      const newImage: Image = {
        id: new Date().toISOString(),
        userId: user.id,
        prompt,
        orientation,
        size,
        imageUrl,
        createdAt: new Date(),
      };

      setImages(prev => [newImage, ...prev]);
      setUser(prev => ({ ...prev, credits: prev.credits - cost }));

    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [user.credits, user.id]);

  const handleBuyCredits = (pkg: CreditPackage) => {
    // This would typically redirect to Stripe Checkout
    console.log(`Simulating purchase of ${pkg.name}`);
    alert(`Thank you for your purchase! ${pkg.credits} credits have been added.`);
    setUser(prev => ({ ...prev, credits: prev.credits + pkg.credits }));
    setCurrentView('generator');
  };

  const renderView = () => {
    switch (currentView) {
      case 'generator':
        return <Generator onGenerate={handleGenerateImage} isGenerating={isGenerating} userCredits={user.credits} lastImage={images[0]} error={error}/>;
      case 'library':
        return <Library images={images} />;
      case 'pricing':
        return <Pricing onPackageSelect={handleBuyCredits}/>;
      default:
        return <Generator onGenerate={handleGenerateImage} isGenerating={isGenerating} userCredits={user.credits} lastImage={images[0]} error={error}/>;
    }
  };

  return (
    <div className="min-h-screen text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-900 transition-colors duration-300">
      <Header
        user={user}
        currentView={currentView}
        onNavigate={setCurrentView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
   