
import React from 'react';
import { CreditPackage } from '../types';
import { CheckIcon, SparklesIcon } from './Icons';

interface PricingProps {
  onPackageSelect: (pkg: CreditPackage) => void;
}

const packages: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 50,
    price: 4.99,
    description: 'Perfect for trying out new ideas and getting started.',
  },
  {
    id: 'creator',
    name: 'Creator Pack',
    credits: 250,
    price: 19.99,
    description: 'Ideal for frequent users and small projects.',
    isPopular: true,
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 1000,
    price: 69.99,
    description: 'The best value for power users and large-scale generation.',
  },
];

const PricingCard: React.FC<{ pkg: CreditPackage; onSelect: () => void }> = ({ pkg, onSelect }) => (
  <div className={`relative border-2 rounded-2xl p-8 flex flex-col ${pkg.isPopular ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'}`}>
    {pkg.isPopular && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-bold">{pkg.name}</h3>
    <p className="text-gray-500 dark:text-gray-400 mt-2 flex-grow">{pkg.description}</p>
    <div className="my-8">
        <span className="text-5xl font-extrabold">{pkg.credits}</span>
        <span className="text-xl font-medium text-gray-500 dark:text-gray-400"> credits</span>
    </div>
    <div className="text-3xl font-bold mb-8">
      ${pkg.price}
    </div>
    <button
      onClick={onSelect}
      className={`w-full p-3 rounded-lg font-bold text-lg transition-colors ${
        pkg.isPopular
          ? 'bg-primary-500 text-white hover:bg-primary-600'
          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      Buy Now
    </button>
  </div>
);


const Pricing: React.FC<PricingProps> = ({ onPackageSelect }) => {
  return (
    <div className="container mx-auto max-w-5xl text-center">
      <h1 className="text-4xl font-extrabold mb-4">Choose Your Plan</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
        Top up your credits to continue creating stunning images. More credits, more creativity!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map(pkg => (
          <PricingCard key={pkg.id} pkg={pkg} onSelect={() => onPackageSelect(pkg)} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
   