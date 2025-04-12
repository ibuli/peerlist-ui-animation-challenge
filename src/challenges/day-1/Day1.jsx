import React, { useState } from 'react';
import { Home, Mail, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import Footer from '../../Footer';

const VerticalMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItems, setActiveItems] = useState([]);

  const menuItems = [
    { icon: <Home size={24} />, label: 'Home' },
    { icon: <Mail size={24} />, label: 'Mail' },
    { icon: <User size={24} />, label: 'Profile' },
    { icon: <Settings size={24} />, label: 'Settings' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      // Reset active items when opening
      setActiveItems([]);
      // Stagger the animation for each item
      menuItems.forEach((_, index) => {
        setTimeout(() => {
          setActiveItems((prev) => [...prev, index]);
        }, 75 * index); // 75ms stagger between each item
      });
    } else {
      // When closing, remove items in reverse order
      const reversedItems = [...menuItems].reverse();
      reversedItems.forEach((_, reversedIndex) => {
        const index = menuItems.length - 1 - reversedIndex;
        setTimeout(() => {
          setActiveItems((prev) => prev.filter((i) => i !== index));
        }, 50 * reversedIndex);
      });
    }
  };

  const handleGoBack = () => {
    return navigate('/');
  };

  return (
    <main className="relative min-h-screen">
      <div className="fixed top-5 left-5 z-50 flex flex-col items-start">
        {/* Hamburger Button */}
        <button
          className="flex flex-col justify-center items-center w-10 h-10 bg-gray-100/10 hover:bg-gray-100/20 rounded-full p-2 transition-transform duration-300 hover:scale-110 focus:outline-none shadow-md"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white rounded-sm transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded-sm transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'mb-1'
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded-sm transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>

        {/* Vertical Menu Items - Directly below hamburger with no container */}
        <div className="flex flex-col items-start mt-2 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-300 ease-in-out ${
                activeItems.includes(index)
                  ? 'translate-y-0 opacity-100 visible'
                  : '-translate-y-4 opacity-0 invisible absolute'
              }`}
              style={{
                transitionDelay: activeItems.includes(index)
                  ? `${75 * index}ms`
                  : '0ms',
                zIndex: 50 - index,
              }}
            >
              <button className="flex items-center justify-center w-10 h-10 bg-gray-800/10 rounded-full text-gray-300 hover:bg-gray-100/20 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none shadow-md">
                {item.icon}
              </button>
              <div className="absolute left-12 top-1 px-2 py-1 bg-gray-900/20 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-gray-800 to-blue-600">
        <section className="text-center">
          <h1
            className="text-5xl font-bold text-white mb-4 tracking-wide"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
          >
            UI Animation Challenge
          </h1>
          <div className="w-full max-w-2xl h-0.5 bg-white/50 mx-auto"></div>
          <p className="my-4">
            Click the hamburger icon to see the menu icons appear one by one.
          </p>
          <Footer handleGoBack={handleGoBack} />
        </section>
      </section>
    </main>
  );
};

export default VerticalMenu;
