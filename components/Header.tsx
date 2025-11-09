
import React from 'react';
import { User, View } from '../types';
import { SunIcon, MoonIcon, SparklesIcon, PhotoIcon, CreditCardIcon } from './Icons';

interface HeaderProps {
  user: User;
  currentView: View;
  onNavigate: (view: View) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary-500/20 text-primary-500'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ user, currentView, onNavigate, theme, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center space-x-2 text-xl font-bold text-primary-500">
              <SparklesIcon className="w-6 h-6" />
              <span>Imagina</span>
            </div>
            <nav className="hidden md:flex md:space-x-2">
              <NavItem
                label="Generator"
                icon={<SparklesIcon className="w-5 h-5" />}
                isActive={currentView === 'generator'}
                onClick={() => onNavigate('generator')}
              />
              <NavItem
                label="Library"
                icon={<PhotoIcon className="w-5 h-5" />}
                isActive={currentView === 'library'}
                onClick={() => onNavigate('library')}
              />
               <NavItem
                label="Buy Credits"
                icon={<CreditCardIcon className="w-5 h-5" />}
                isActive={currentView === 'pricing'}
                onClick={() => onNavigate('pricing')}
              />
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-semibold">
              <CreditCardIcon className="w-5 h-5 text-primary-500" />
              <span>{user.credits} Credits</span>
            </div>
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
              {user.email.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
         {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center space-x-2 py-2 border-t border-gray-200 dark:border-gray-700">
            <NavItem
            label="Generator"
            icon={<SparklesIcon className="w-5 h-5" />}
            isActive={currentView === 'generator'}
            onClick={() => onNavigate('generator')}
            />
            <NavItem
            label="Library"
            icon={<PhotoIcon className="w-5 h-5" />}
            isActive={currentView === 'library'}
            onClick={() => onNavigate('library')}
            />
            <NavItem
            label="Buy Credits"
            icon={<CreditCardIcon className="w-5 h-5" />}
            isActive={currentView === 'pricing'}
            onClick={() => onNavigate('pricing')}
            />
        </div>
      </div>
    </header>
  );
};

export default Header;
   