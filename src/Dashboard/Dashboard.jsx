import React from 'react';
import Footer from '../Footer';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const navigate = useNavigate();
  const handleNavigate = (index) => {
    // Navigate to the corresponding challenge
    // For example, if index is 0, navigate to day-1
    if (index === 0) return navigate(`day-${index + 1}`);
    else return;
  };
  return (
    <main className="w-full h-screen bg-gradient-to-br from-orange-500 via-gray-800 to-blue-600">
      <section className="text-center py-12">
        <h1
          className="text-4xl font-bold text-white mb-4 tracking-wide"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
        >
          Peerlist UI Animation Challenge
        </h1>
        <div className="w-full max-w-md h-0.5 bg-white/50 mx-auto"></div>
      </section>
      {/* Create a list of days's challenges */}
      <section className="flex flex-col items-center justify-center gap-4 py-12">
        <h2 className="text-2xl font-bold text-white">Challenges</h2>
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-full max-w-xs mx-auto">
              {/* Add a challenge card here */}
              <button
                onClick={() => handleNavigate(index)}
                className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-gray-200/10 text-white rounded-full shadow-lg hover:bg-blue-200/20 transition-all duration-300 transform hover:scale-105 focus:outline-none cursor-pointer data-[disabled='true']:cursor-not-allowed data-[disabled='true']:opacity-50"
                data-disabled={index !== 0}
              >
                Challenge {index + 1}
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
