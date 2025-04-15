import { useState } from 'react';
import { Award, ArrowLeft, CreditCard, CalendarDays } from 'lucide-react';

const TabsSwitcher = () => {
  // Single state to track which tab is active
  const [activeTab, setActiveTab] = useState('free');

  // Check if we're in the expanded premium view
  const isPremiumExpanded = activeTab === 'monthly' || activeTab === 'annual';

  // Handle Free tab click
  const handleFreeClick = () => {
    setActiveTab('free');
  };

  // Handle Premium tab click
  const handlePremiumClick = () => {
    // If already in premium view, do nothing
    if (isPremiumExpanded) return;
    // Otherwise, expand to premium view and select monthly by default
    setActiveTab('monthly');
  };

  // Handle Monthly tab click
  const handleMonthlyClick = () => {
    setActiveTab('monthly');
  };

  // Handle Annual tab click
  const handleAnnualClick = () => {
    setActiveTab('annual');
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
                Day 4
              </span>
            </span>
          </h1>
          <div className="w-full max-w-2xl h-0.5 bg-white/50 mx-auto"></div>

          <section className="max-w-md w-full mx-auto my-8 min-h-96">
            <div className="w-full px-4">
              <div className="relative h-12 bg-gray-100 overflow-hidden shadow-md p-1 border-2 border-gray-100 rounded-4xl">
                {/* Free Tab - Always Visible */}
                <button
                  onClick={handleFreeClick}
                  className="absolute top-0 bottom-0 left-0 flex items-center justify-center font-medium z-10 tab-transition"
                  style={{
                    width: isPremiumExpanded ? '33.333%' : '50%',
                    color: activeTab === 'free' ? 'white' : 'black',
                  }}
                >
                  <span className="icon-container">
                    <Award size={16} />
                  </span>
                  Free
                </button>

                {/* Premium Tab - Only visible in initial state */}
                <button
                  onClick={handlePremiumClick}
                  className="absolute top-0 bottom-0 flex flex-col items-center justify-center font-medium z-10 tab-transition"
                  style={{
                    left: '50%',
                    width: '50%',
                    opacity: isPremiumExpanded ? 0 : 1,
                    visibility: isPremiumExpanded ? 'hidden' : 'visible',
                    color: activeTab === 'premium' ? 'white' : 'black',
                  }}
                >
                  <div className="flex items-center">
                    <span className="icon-container">
                      <Award size={16} />
                    </span>
                    Premium
                  </div>
                  <span className="text-xs opacity-70">Monthly • Annual</span>
                </button>

                {/* Monthly Tab - Only visible in expanded state */}
                <button
                  onClick={handleMonthlyClick}
                  className="absolute top-0 bottom-0 flex items-center justify-center font-medium z-10 tab-transition"
                  style={{
                    left: '33.333%',
                    width: '33.333%',
                    opacity: isPremiumExpanded ? 1 : 0,
                    visibility: isPremiumExpanded ? 'visible' : 'hidden',
                    color: activeTab === 'monthly' ? 'white' : 'black',
                  }}
                >
                  <span className="icon-container">
                    <CreditCard size={16} />
                  </span>
                  Monthly
                </button>

                {/* Annual Tab - Only visible in expanded state */}
                <button
                  onClick={handleAnnualClick}
                  className="absolute top-0 bottom-0 flex items-center justify-center font-medium z-10 tab-transition"
                  style={{
                    left: '66.666%',
                    width: '33.333%',
                    opacity: isPremiumExpanded ? 1 : 0,
                    visibility: isPremiumExpanded ? 'visible' : 'hidden',
                    color: activeTab === 'annual' ? 'white' : 'black',
                  }}
                >
                  <span className="icon-container">
                    <CalendarDays size={16} />
                  </span>
                  Annual
                </button>

                {/* Active Tab Indicator - Slides and resizes smoothly */}
                <div
                  className="absolute top-0 bottom-0 bg-black rounded-full indicator-transition"
                  style={{
                    width: isPremiumExpanded ? '33.333%' : '50%',
                    left:
                      activeTab === 'free'
                        ? '0'
                        : activeTab === 'premium'
                        ? '50%'
                        : activeTab === 'monthly'
                        ? '33.333%'
                        : '66.666%',
                  }}
                />
              </div>

              {/* Content Area */}
              <div className="mt-8 p-6 bg-white rounded-lg">
                {activeTab === 'free' && (
                  <div className="content-fade-in text-left">
                    <h3 className="text-gray-600 text-lg font-medium flex items-center">
                      <Award className="mr-2" size={20} />
                      Free Plan
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Access to basic features
                    </p>
                  </div>
                )}

                {activeTab === 'premium' && (
                  <div className="content-fade-in text-left">
                    <h3 className="text-gray-600 text-lg font-medium flex items-center">
                      <Award className="mr-2" size={20} />
                      Premium Plan
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Choose between monthly or annual billing
                    </p>
                  </div>
                )}

                {activeTab === 'monthly' && (
                  <div className="content-fade-in text-left">
                    <h3 className="text-gray-600 text-lg font-medium flex items-center">
                      <CreditCard className="mr-2" size={20} />
                      Premium Monthly
                    </h3>
                    <p className="text-gray-600 mt-2">$9.99 per month</p>
                    <p className="text-gray-500 mt-1">
                      Full access to all premium features
                    </p>
                  </div>
                )}

                {activeTab === 'annual' && (
                  <div className="content-fade-in text-left">
                    <h3 className="text-gray-600 text-lg font-medium flex items-center">
                      <CalendarDays className="mr-2" size={20} />
                      Premium Annual
                    </h3>
                    <p className="text-gray-600 mt-2">
                      $99.99 per year (save 17%)
                    </p>
                    <p className="text-gray-500 mt-1">
                      Full access to all premium features
                    </p>
                  </div>
                )}
              </div>

              {/* Back Button - Only visible in Premium expanded state */}
              {isPremiumExpanded && (
                <button
                  onClick={() => setActiveTab('free')}
                  className="mt-4 text-sm text-orange-600 hover:text-orange-800 transition-colors duration-200 flex items-center cursor-pointer"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to main tabs
                </button>
              )}
            </div>

            <style jsx>{`
              .tab-transition {
                transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
              }

              .indicator-transition {
                transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(8px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .content-fade-in {
                animation: fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }

              .icon-container {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin-right: 6px;
              }
            `}</style>
          </section>
        </section>
      </section>
    </main>
  );
};

export default TabsSwitcher;
