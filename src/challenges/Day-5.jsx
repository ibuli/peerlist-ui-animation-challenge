import { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../Footer';

const CollectiblesView = () => {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState('list');
  const [isAnimating, setIsAnimating] = useState(false);

  const collectibles = [
    {
      id: 1,
      name: 'Skilled Fingers Series',
      price: '0.855 ETH',
      number: '#209',
      color: 'bg-purple-100',
    },
    {
      id: 2,
      name: 'Vibrant Vibes Series',
      price: '0.209 ETH',
      number: '#808',
      color: 'bg-blue-100',
    },
  ];

  const handleViewChange = (view) => {
    if (activeView !== view && !isAnimating) {
      setIsAnimating(true);

      // Faster transition timing
      setTimeout(() => {
        setActiveView(view);
        // Shorter delay for showing content
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 150);
    }
  };

  const handleGoBack = () => {
    return navigate('/');
  };

  return (
    <main className="relative min-h-screen">
      {/* Main Content */}
      <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-gray-800 to-blue-600 px-4">
        <section className="text-center">
          <h1
            className="text-5xl font-bold text-white mb-4 tracking-wide"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
          >
            UI Animation{' '}
            <span className="relative inline-block">
              Challenge{' '}
              <span class="absolute top-0 -right-10 md:-right-8 text-sm text-white tracking-tight font-bold">
                Day 5
              </span>
            </span>
          </h1>
          <div className="w-full max-w-2xl h-0.5 bg-white/50 mx-auto"></div>

          <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8">Collectibles</h1>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-6 py-3 rounded-full flex items-center transition-all duration-300 text-black cursor-pointer ${
                  activeView === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => handleViewChange('list')}
                disabled={isAnimating}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                List view
              </button>
              <button
                className={`px-6 py-3 rounded-full flex items-center transition-all duration-300 text-black cursor-pointer ${
                  activeView === 'card'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => handleViewChange('card')}
                disabled={isAnimating}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Card view
              </button>
              <button
                className={`px-6 py-3 rounded-full flex items-center transition-all duration-300 text-black cursor-pointer ${
                  activeView === 'pack'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => handleViewChange('pack')}
                disabled={isAnimating}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 12L10 15L17 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Pack view
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 min-h-[400px] relative overflow-hidden">
              {/* List View */}
              {activeView === 'list' && (
                <div
                  className={`transition-opacity duration-150 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  {collectibles.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center mb-4 transition-all duration-300"
                      style={{
                        transitionDelay: `${index * 0.06}s`,
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating
                          ? 'translateY(20px)'
                          : 'translateY(0)',
                      }}
                    >
                      <div
                        className={`w-16 h-16 ${item.color} rounded-lg mr-4 flex items-center justify-center overflow-hidden`}
                      >
                        {item.id === 1 ? (
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 100 100"
                            className="text-orange-500"
                          >
                            <path
                              d="M30,30 C20,40 15,60 25,75 C35,90 45,85 45,85 L50,80 L55,85 C55,85 65,90 75,75 C85,60 80,40 70,30 C60,20 40,25 50,40 C60,25 40,20 30,30"
                              fill="currentColor"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 100 100"
                            className="text-pink-500"
                          >
                            <rect
                              x="20"
                              y="30"
                              width="60"
                              height="40"
                              rx="5"
                              fill="currentColor"
                            />
                            <circle cx="35" cy="50" r="8" fill="#fff" />
                            <circle cx="65" cy="50" r="8" fill="#fff" />
                            <rect
                              x="25"
                              y="25"
                              width="50"
                              height="10"
                              rx="2"
                              fill="#ffeb3b"
                            />
                            <path
                              d="M80,45 C90,20 100,30 100,50"
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <span className="text-yellow-500">{item.number}</span>
                        </div>
                        <p className="text-white text-left">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Card View */}
              {activeView === 'card' && (
                <div
                  className={`grid grid-cols-2 gap-6 transition-opacity duration-150 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  {collectibles.map((item, index) => (
                    <div
                      key={item.id}
                      className="transition-all duration-300"
                      style={{
                        transitionDelay: `${index * 0.06}s`,
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating
                          ? 'translateY(20px)'
                          : 'translateY(0)',
                      }}
                    >
                      <div
                        className={`w-full aspect-square ${item.color} rounded-lg mb-2 flex items-center justify-center`}
                      >
                        {item.id === 1 ? (
                          <svg
                            width="120"
                            height="120"
                            viewBox="0 0 100 100"
                            className="text-orange-500"
                          >
                            <path
                              d="M30,30 C20,40 15,60 25,75 C35,90 45,85 45,85 L50,80 L55,85 C55,85 65,90 75,75 C85,60 80,40 70,30 C60,20 40,25 50,40 C60,25 40,20 30,30"
                              fill="currentColor"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="120"
                            height="120"
                            viewBox="0 0 100 100"
                            className="text-pink-500"
                          >
                            <rect
                              x="20"
                              y="30"
                              width="60"
                              height="40"
                              rx="5"
                              fill="currentColor"
                            />
                            <circle cx="35" cy="50" r="8" fill="#fff" />
                            <circle cx="65" cy="50" r="8" fill="#fff" />
                            <rect
                              x="25"
                              y="25"
                              width="50"
                              height="10"
                              rx="2"
                              fill="#ffeb3b"
                            />
                            <path
                              d="M80,45 C90,20 100,30 100,50"
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-left">
                        {item.name}
                      </h3>
                      <div className="flex justify-between">
                        <p className="text-white">{item.price}</p>
                        <span className="text-yellow-500">{item.number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pack View */}
              {activeView === 'pack' && (
                <div
                  className={`flex flex-col items-center justify-center transition-opacity duration-150 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="relative w-64 h-64 mb-6">
                    {collectibles.map((item, index) => (
                      <div
                        key={item.id}
                        className={`absolute ${item.color} w-48 h-48 rounded-lg flex items-center justify-center transition-all duration-300`}
                        style={{
                          zIndex: collectibles.length - index,
                          left: `${index * 12}px`,
                          top: `${index * 12}px`,
                          transform: isAnimating
                            ? `rotate(${
                                index % 2 === 0 ? -10 : 10
                              }deg) scale(0.8) translateY(10px)`
                            : `rotate(${
                                index % 2 === 0 ? -5 : 5
                              }deg) scale(1) translateY(0)`,
                          opacity: isAnimating ? 0 : 1,
                          transitionDelay: `${index * 0.08}s`,
                        }}
                      >
                        {item.id === 1 ? (
                          <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            className="text-orange-500"
                          >
                            <path
                              d="M30,30 C20,40 15,60 25,75 C35,90 45,85 45,85 L50,80 L55,85 C55,85 65,90 75,75 C85,60 80,40 70,30 C60,20 40,25 50,40 C60,25 40,20 30,30"
                              fill="currentColor"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            className="text-pink-500"
                          >
                            <rect
                              x="20"
                              y="30"
                              width="60"
                              height="40"
                              rx="5"
                              fill="currentColor"
                            />
                            <circle cx="35" cy="50" r="8" fill="#fff" />
                            <circle cx="65" cy="50" r="8" fill="#fff" />
                            <rect
                              x="25"
                              y="25"
                              width="50"
                              height="10"
                              rx="2"
                              fill="#ffeb3b"
                            />
                            <path
                              d="M80,45 C90,20 100,30 100,50"
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold">
                    {collectibles.length} Collectibles
                  </h3>
                  <p className="text-white">
                    {collectibles
                      .reduce((sum, item) => sum + parseFloat(item.price), 0)
                      .toFixed(3)}{' '}
                    ETH
                  </p>
                </div>
              )}
            </div>
          </div>

          <Footer handleGoBack={handleGoBack} />
        </section>
      </section>
    </main>
  );
};

export default CollectiblesView;
