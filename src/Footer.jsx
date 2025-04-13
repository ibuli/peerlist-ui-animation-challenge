import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Footer({ handleGoBack }) {
  return (
    <>
      <footer className="fixed bottom-0.5 left-1/2 transform -translate-x-1/2 text-center w-full">
        Created with ❤️ by{' '}
        <a href="https://burhanbharmal.com">Burhan Bharmal</a>
      </footer>
      {/* Go Back Button - Bottom Right */}
      {handleGoBack && (
        <div className="fixed bottom-8 right-4 md:bottom-6 md:right-6 z-40">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-full shadow-lg hover:bg-blue-200/20 transition-all duration-300 transform hover:scale-105 focus:outline-none cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      )}
    </>
  );
}
