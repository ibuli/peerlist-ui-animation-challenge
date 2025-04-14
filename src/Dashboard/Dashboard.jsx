import React from 'react';
import Footer from '../Footer';
import { useNavigate } from 'react-router';

const challenges = [
  {
    title: 'Challenge 1',
    enabled: true,
  },
  {
    title: 'Challenge 2',
    enabled: true,
  },
  {
    title: 'Challenge 3',
    enabled: true,
  },
  {
    title: 'Challenge 4',
    enabled: false,
  },
  {
    title: 'Challenge 5',
    enabled: false,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const handleNavigate = (index) => {
    // Navigate to the corresponding challenge
    // For example, if index is 0, navigate to day-1
    if (index === 0) return;
    else return navigate(`day-${index}`);
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
          {challenges.map((challenge, index) => (
            <div key={index} className="w-full max-w-xs mx-auto">
              <button
                onClick={() =>
                  handleNavigate(challenge.enabled ? index + 1 : 0)
                }
                className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-gray-200/10 text-white rounded-full shadow-lg hover:bg-blue-200/20 transition-all duration-300 transform hover:scale-105 focus:outline-none cursor-pointer data-[disabled='true']:cursor-not-allowed data-[disabled='true']:opacity-50"
                data-disabled={!challenge.enabled}
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
