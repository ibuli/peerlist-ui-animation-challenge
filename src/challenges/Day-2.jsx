import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  X,
  Check,
  Clock,
  Loader2,
  RefreshCw,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import Footer from '../Footer';

// Status definitions with custom animations
const statuses = {
  idle: {
    text: 'Ready for Transaction',
    color: 'bg-gray-200',
    textColor: 'text-gray-700',
    icon: <Clock className="w-5 h-5" />,
  },
  analyzing: {
    text: 'Analyzing Transaction',
    color: 'bg-blue-100',
    textColor: 'text-blue-700',
    icon: <Loader2 className="w-5 h-5 animate-spin" />,
  },
  processing: {
    text: 'Processing Payment',
    color: 'bg-purple-100',
    textColor: 'text-purple-700',
    icon: (
      <div className="relative">
        <RefreshCw
          className="w-5 h-5 animate-spin"
          style={{ animationDuration: '2s' }}
        />
        <div
          className="absolute inset-0 animate-pulse opacity-50"
          style={{ animationDuration: '1.5s' }}
        >
          <RefreshCw className="w-5 h-5" />
        </div>
      </div>
    ),
  },
  warning: {
    text: 'Verification Required',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    icon: (
      <AlertTriangle
        className="w-5 h-5 animate-pulse"
        style={{ animationDuration: '2s' }}
      />
    ),
  },
  success: {
    text: 'Transaction Successful',
    color: 'bg-green-100',
    textColor: 'text-green-700',
    icon: (
      <div className="relative">
        <Check className="w-5 h-5" />
        <span className="absolute inset-0 animate-ping opacity-75">
          <Check className="w-5 h-5" />
        </span>
      </div>
    ),
  },
  failed: {
    text: 'Transaction Failed',
    color: 'bg-red-100',
    textColor: 'text-red-700',
    icon: (
      <div className="relative">
        <X className="w-5 h-5" />
        <div
          className="absolute inset-0 animate-bounce opacity-0"
          style={{ animationDuration: '1s', animationDelay: '0.5s' }}
        >
          <X className="w-5 h-5" />
        </div>
      </div>
    ),
  },
};

// Component for revealing text character by character
const TextReveal = ({ text, isVisible }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    const textLength = text.length;

    // Clear any existing timeout
    const timeoutId = setInterval(() => {
      if (currentIndex <= textLength) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timeoutId);
      }
    }, 30); // Speed of character reveal

    return () => clearInterval(timeoutId);
  }, [text, isVisible]);

  return (
    <div className="flex items-center h-6">
      <span>{displayedText}</span>
      {displayedText.length < text.length && isVisible && (
        <span className="ml-0.5 animate-pulse">|</span>
      )}
    </div>
  );
};

const StatusIndicator = () => {
  const navigate = useNavigate();
  const textRef = useRef(null);
  const indicatorRef = useRef(null);

  const [currentStatus, setCurrentStatus] = useState('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [textTransition, setTextTransition] = useState('none'); // 'none', 'exiting', 'entering'

  // Function to create the transaction flow
  const processTransaction = () => {
    if (isProcessing) return;

    setIsProcessing(true);

    // Define the transaction flow with timings
    const statusFlow = [
      { status: 'analyzing', duration: 2000 },
      { status: 'processing', duration: 3000 },
      {
        status: Math.random() > 0.3 ? 'warning' : 'processing',
        duration: 2000,
      }, // 30% chance of warning
      { status: Math.random() > 0.2 ? 'success' : 'failed', duration: 3000 }, // 80% chance of success
    ];

    // Execute the flow with transition animations
    let totalDelay = 0;
    statusFlow.forEach((step) => {
      setTimeout(() => {
        changeStatus(step.status);
      }, totalDelay);

      totalDelay += step.duration;
    });

    // Reset after completion
    setTimeout(() => {
      setTimeout(() => {
        changeStatus('idle');
        setIsProcessing(false);
      }, 1000);
    }, totalDelay + 2000);
  };

  // Function to handle status changes with animations
  const changeStatus = (newStatus) => {
    // Text animation out
    setTextTransition('exiting');

    // Wait for exit animation, then change status
    setTimeout(() => {
      setCurrentStatus(newStatus);

      // Container animation (wave)
      animateWave();

      // Text animation in
      setTextTransition('entering');

      // Allow enough time for the text to be fully revealed
      const textRevealTime = statuses[newStatus].text.length * 30 + 300;
      setTimeout(() => {
        setTextTransition('none');
      }, textRevealTime);
    }, 300);
  };

  // Wave animation effect
  const animateWave = () => {
    if (indicatorRef.current) {
      const startTime = Date.now();
      const duration = 500; // animation duration in ms
      const amplitude = 5; // max movement in pixels
      const frequency = 4; // number of oscillations

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
          // Calculate sine wave movement
          const factor =
            Math.sin(progress * Math.PI * frequency) * (1 - progress);
          const offset = factor * amplitude;

          // Apply transformation
          indicatorRef.current.style.transform = `translateX(${offset}px)`;
          requestAnimationFrame(animate);
        } else {
          // Reset transformation when animation completes
          indicatorRef.current.style.transform = '';
        }
      };

      requestAnimationFrame(animate);
    }
  };

  const currentStatusDetails = statuses[currentStatus];

  // Get dynamic classes for the text transition
  const getTextTransitionClasses = () => {
    switch (textTransition) {
      case 'entering':
        return 'translate-x-0 opacity-100';
      case 'exiting':
        return '-translate-x-8 opacity-0';
      default:
        return 'translate-x-0 opacity-100';
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
                Day 2
              </span>
            </span>
          </h1>
          <div className="w-full max-w-2xl h-0.5 bg-white/50 mx-auto"></div>
          <div className="flex flex-col items-center justify-center space-y-8 p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white">
              Transaction Status
            </h1>

            {/* Always visible status indicator with dynamic content */}
            <div
              ref={indicatorRef}
              className={`flex items-center p-4 rounded-lg shadow-md w-full transition-colors duration-500 ${currentStatusDetails.color}`}
            >
              <div
                className={`mr-3 ${currentStatusDetails.textColor} transition-colors duration-500`}
              >
                {currentStatusDetails.icon}
              </div>
              <div
                ref={textRef}
                className={`text-sm font-medium ${
                  currentStatusDetails.textColor
                } flex-grow overflow-hidden transition-all duration-300 transform ${getTextTransitionClasses()}`}
              >
                <TextReveal
                  text={currentStatusDetails.text}
                  isVisible={
                    textTransition === 'entering' || textTransition === 'none'
                  }
                />
              </div>
              <div
                className={`${currentStatusDetails.textColor} opacity-70 transition-colors duration-500`}
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Transaction Card */}
            <div className="from-bg-slate-100 to-bg-slate-200 p-6 rounded-lg shadow-lg w-full">
              <div className="mb-4 flex justify-between items-center">
                <span className="text-sm font-semibold text-white">
                  Amount:
                </span>
                <span className="text-sm font-bold">$250.00</span>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <span className="text-sm font-semibold text-white">
                  Recipient:
                </span>
                <span className="text-sm">John Doe</span>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Date:</span>
                <span className="text-sm">April 13, 2025</span>
              </div>
              <button
                className={`w-full py-2 px-4 font-semibold rounded-lg transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed text-gray-100'
                    : 'bg-blue-600/50 hover:bg-blue-700/80 text-white cursor-pointer'
                }`}
                onClick={processTransaction}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Process Transaction'}
              </button>
            </div>

            {/* CSS Keyframes for animations */}
            <style jsx>{`
              @keyframes indeterminateProgress {
                0% {
                  transform: translateX(-100%);
                }
                50% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(100%);
                }
              }

              @keyframes typewriter {
                from {
                  width: 0;
                }
                to {
                  width: 100%;
                }
              }

              @keyframes blink {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
          </div>
          <Footer handleGoBack={handleGoBack} />
        </section>
      </section>
    </main>
  );
};

export default StatusIndicator;
