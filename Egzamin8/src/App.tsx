import { useState, useEffect, useCallback } from 'react';
import { mathContent } from './data/mathContent';
import { polishContent } from './data/polishContent';
import { englishContent } from './data/englishContent';

type View = 'home' | 'subject' | 'content' | 'thank-you';

interface SubjectContent {
  id: string;
  name: string;
  icon: string;
  color: string;
  price: number;
  stripeLink: string;
  sections: {
    id: string;
    title: string;
    topics: {
      title: string;
      content: string;
    }[];
  }[];
}

// Stripe payment links
const STRIPE_LINKS = {
  polski: 'https://buy.stripe.com/fZubJ0eCE9BCc575BrdnW03?locale=pl',
  matematyka: 'https://buy.stripe.com/6oUcN47accNO6KN1lbdnW02?locale=pl',
  angielski: 'https://buy.stripe.com/5kQ00i2TWaFGb137JzdnW04?locale=pl',
  pakiet: 'https://buy.stripe.com/bJe7sKgKMg002ux1lbdnW01?locale=pl'
};

const subjects: SubjectContent[] = [
  { ...mathContent, stripeLink: STRIPE_LINKS.matematyka },
  { ...polishContent, stripeLink: STRIPE_LINKS.polski },
  { ...englishContent, stripeLink: STRIPE_LINKS.angielski }
];

const BUNDLE_PRICE = 99.99;
const ORIGINAL_BUNDLE_PRICE = 149.97;
const SAVINGS = 50;

// Random names for purchase notifications
const randomNames = [
  'Kasia z Warszawy', 'Tomek z Krakowa', 'Maja z Gdańska', 'Piotr z Wrocławia',
  'Ania z Poznania', 'Michał z Łodzi', 'Zosia z Katowic', 'Bartek z Szczecina',
  'Ola z Bydgoszczy', 'Kamil z Lublina', 'Julia z Białegostoku', 'Dawid z Rzeszowa',
  'Natalia z Opola', 'Jakub z Olsztyna', 'Weronika z Torunia', 'Filip z Kielc'
];

const purchaseTypes = [
  'Pakiet wszystkich przedmiotów',
  'Matematyka',
  'Język Polski',
  'Język Angielski'
];

// Purchased subjects storage
const getStoredPurchases = (): string[] => {
  try {
    const stored = localStorage.getItem('egzamin8_purchases');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const savePurchase = (subjectId: string) => {
  const purchases = getStoredPurchases();
  if (!purchases.includes(subjectId)) {
    purchases.push(subjectId);
    localStorage.setItem('egzamin8_purchases', JSON.stringify(purchases));
  }
};

// Promo Banner Component
function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 37, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-2 px-4 text-center text-sm font-medium relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      <div className="relative flex items-center justify-center gap-2 flex-wrap">
        <span className="animate-pulse">🔥</span>
        <span className="font-bold">MEGA PROMOCJA!</span>
        <span>Pakiet wszystkich przedmiotów za</span>
        <span className="font-bold text-yellow-200 line-through">{ORIGINAL_BUNDLE_PRICE} zł</span>
        <span className="font-extrabold text-white bg-red-600 px-2 py-0.5 rounded">{BUNDLE_PRICE} zł</span>
        <span>• Kończy się za:</span>
        <span className="font-mono bg-black/30 px-2 py-0.5 rounded">
          {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="animate-pulse">🔥</span>
      </div>
    </div>
  );
}

// Purchase Notification Component
function PurchaseNotification({ onClose }: { onClose: () => void }) {
  const [name] = useState(() => randomNames[Math.floor(Math.random() * randomNames.length)]);
  const [product] = useState(() => purchaseTypes[Math.floor(Math.random() * purchaseTypes.length)]);
  const [minutes] = useState(() => Math.floor(Math.random() * 10) + 1);

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-2xl shadow-2xl p-4 max-w-xs animate-slide-in-left z-50 border border-gray-100">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-gray-800 text-sm font-medium">{name}</p>
          <p className="text-gray-600 text-xs">właśnie kupił(a)</p>
          <p className="text-purple-600 font-bold text-sm">{product}</p>
          <p className="text-gray-400 text-xs mt-1">{minutes} min temu</p>
        </div>
      </div>
    </div>
  );
}

// Thank You Page Component
function ThankYouPage({ 
  purchasedSubject, 
  onGoToContent,
  onGoHome 
}: { 
  purchasedSubject: string | null;
  onGoToContent: (subject: SubjectContent) => void;
  onGoHome: () => void;
}) {
  const subject = purchasedSubject && purchasedSubject !== 'pakiet' ? subjects.find(s => s.id === purchasedSubject) : null;
  const isPakiet = purchasedSubject === 'pakiet';

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
        Dziękujemy za zakup! 🎉
      </h1>
      
      <p className="text-xl text-slate-300 mb-8">
        Twoja płatność została pomyślnie zrealizowana. 
        {isPakiet 
          ? ' Masz teraz pełny dostęp do wszystkich przedmiotów: Matematyka, Język Polski i Język Angielski!'
          : subject 
            ? ` Masz teraz pełny dostęp do materiałów z przedmiotu ${subject.name}.` 
            : ' Masz teraz pełny dostęp do zakupionych materiałów.'}
      </p>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Co teraz?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-3xl mb-2">📚</div>
            <h4 className="text-white font-bold mb-1">Ucz się</h4>
            <p className="text-slate-400 text-sm">Przeglądaj materiały i ucz się w swoim tempie</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-3xl mb-2">🔄</div>
            <h4 className="text-white font-bold mb-1">Wracaj</h4>
            <p className="text-slate-400 text-sm">Dostęp jest bezterminowy - wracaj kiedy chcesz</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="text-white font-bold mb-1">Zdaj egzamin</h4>
            <p className="text-slate-400 text-sm">Przygotuj się i zdobądź świetny wynik!</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
        {isPakiet ? (
          <>
            {subjects.map(s => (
              <button
                key={s.id}
                onClick={() => onGoToContent(s)}
                className={`bg-gradient-to-r ${s.color} text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-all shadow-lg flex items-center gap-2`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </>
        ) : subject ? (
          <button
            onClick={() => onGoToContent(subject)}
            className={`bg-gradient-to-r ${subject.color} text-white font-bold py-4 px-8 rounded-2xl hover:opacity-90 transition-all shadow-lg text-lg`}
          >
            Przejdź do materiałów →
          </button>
        ) : null}
        <button
          onClick={onGoHome}
          className="bg-white/10 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all border border-white/20"
        >
          Strona główna
        </button>
      </div>
      
      <p className="text-slate-500 text-sm mt-8">
        Masz pytania? Napisz do nas: <a href="mailto:kontakt@egzamin8.com.pl" className="text-purple-400 hover:text-purple-300">kontakt@egzamin8.com.pl</a>
      </p>
    </div>
  );
}

export function App() {
  const [view, setView] = useState<View>('home');
  const [selectedSubject, setSelectedSubject] = useState<SubjectContent | null>(null);
  const [purchases, setPurchases] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationKey, setNotificationKey] = useState(0);
  const [purchasedSubjectFromStripe, setPurchasedSubjectFromStripe] = useState<string | null>(null);

  // Check URL for Stripe success callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const subjectId = urlParams.get('subject');
    
    if (success === 'true' && subjectId) {
      // Save purchase
      if (subjectId === 'pakiet') {
        // Pakiet = unlock all subjects
        savePurchase('matematyka');
        savePurchase('polski');
        savePurchase('angielski');
        setPurchases(['matematyka', 'polski', 'angielski']);
      } else {
        savePurchase(subjectId);
        setPurchases(prev => [...prev, subjectId]);
      }
      setPurchasedSubjectFromStripe(subjectId);
      setView('thank-you');
      
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    setPurchases(getStoredPurchases());
  }, []);

  // Show random purchase notifications
  useEffect(() => {
    const showRandomNotification = () => {
      setShowNotification(true);
      setNotificationKey(prev => prev + 1);
    };

    const firstTimer = setTimeout(showRandomNotification, 5000);
    
    const interval = setInterval(() => {
      const delay = Math.random() * 15000 + 15000;
      setTimeout(showRandomNotification, delay);
    }, 30000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  const handleSubjectClick = (subject: SubjectContent) => {
    setSelectedSubject(subject);
    if (purchases.includes(subject.id)) {
      setView('content');
      setExpandedSection(subject.sections[0]?.id || null);
    } else {
      setView('subject');
    }
  };

  const handlePurchase = (subject: SubjectContent) => {
    // Redirect to Stripe with success URL containing subject ID
    const successUrl = `${window.location.origin}${window.location.pathname}?success=true&subject=${subject.id}`;
    const stripeUrl = `${subject.stripeLink}&success_url=${encodeURIComponent(successUrl)}`;
    window.location.href = stripeUrl;
  };

  const goHome = () => {
    setView('home');
    setSelectedSubject(null);
    setExpandedSection(null);
    setExpandedTopic(null);
    setPurchasedSubjectFromStripe(null);
  };

  const goToContent = (subject: SubjectContent) => {
    setSelectedSubject(subject);
    setView('content');
    setExpandedSection(subject.sections[0]?.id || null);
  };

  const isPurchased = (subjectId: string) => purchases.includes(subjectId);
  const allPurchased = purchases.includes('matematyka') && purchases.includes('polski') && purchases.includes('angielski');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Promo Banner */}
      {!allPurchased && view !== 'thank-you' && <PromoBanner />}

      {/* Purchase Notification */}
      {showNotification && <PurchaseNotification key={notificationKey} onClose={hideNotification} />}

      {/* Header */}
      <header className="bg-slate-800/60 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={goHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Egzamin<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">8</span></h1>
                <p className="text-xs text-slate-400">Przygotowanie do egzaminu ósmoklasisty</p>
              </div>
            </button>
            
            <div className="flex items-center gap-4">
              {!allPurchased && view !== 'thank-you' && (
                <a
                  href="#pakiet"
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-2 px-4 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all text-sm shadow-lg shadow-orange-500/30 animate-pulse-slow"
                >
                  <span>🔥</span>
                  <span>Pakiet -{Math.round((1 - BUNDLE_PRICE / ORIGINAL_BUNDLE_PRICE) * 100)}%</span>
                </a>
              )}
              
              {view !== 'home' && (
                <button
                  onClick={goHome}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="hidden sm:inline">Strona główna</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-180px)]">
        {view === 'home' && (
          <HomePage 
            subjects={subjects} 
            onSubjectClick={handleSubjectClick} 
            isPurchased={isPurchased} 
            allPurchased={allPurchased}
          />
        )}
        {view === 'subject' && selectedSubject && (
          <SubjectPreview subject={selectedSubject} onPurchase={handlePurchase} onBack={goHome} />
        )}
        {view === 'content' && selectedSubject && (
          <ContentPage
            subject={selectedSubject}
            expandedSection={expandedSection}
            setExpandedSection={setExpandedSection}
            expandedTopic={expandedTopic}
            setExpandedTopic={setExpandedTopic}
          />
        )}
        {view === 'thank-you' && (
          <ThankYouPage 
            purchasedSubject={purchasedSubjectFromStripe}
            onGoToContent={goToContent}
            onGoHome={goHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/30 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎓</span>
                </div>
                <span className="text-white font-bold">Egzamin8</span>
              </div>
              <p className="text-slate-400 text-sm">
                Kompleksowa platforma przygotowująca do egzaminu ósmoklasisty 2026. 
                Materiały tworzone przez doświadczonych nauczycieli.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Przedmioty</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">📐 Matematyka</li>
                <li className="hover:text-white cursor-pointer transition-colors">📚 Język Polski</li>
                <li className="hover:text-white cursor-pointer transition-colors">🇬🇧 Język Angielski</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Informacje</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">O nas</li>
                <li className="hover:text-white cursor-pointer transition-colors">Regulamin</li>
                <li className="hover:text-white cursor-pointer transition-colors">Polityka prywatności</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Kontakt</h3>
              <p className="text-slate-400 text-sm">
                <a href="mailto:kontakt@egzamin8.com.pl" className="hover:text-purple-400 transition-colors">
                  kontakt@egzamin8.com.pl
                </a>
              </p>
              <div className="flex gap-3 mt-4">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <span>📘</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <span>📸</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <span>🎵</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Egzamin8 - Wszystkie prawa zastrzeżone
            </p>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/120px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-6 opacity-50" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-50" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50" />
              <div className="text-slate-500 text-xs flex items-center gap-1">
                <span>🔒</span> Bezpieczne płatności
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes slide-in-left {
          0% { transform: translateX(-120%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Home Page
function HomePage({ 
  subjects, 
  onSubjectClick, 
  isPurchased,
  allPurchased
}: { 
  subjects: SubjectContent[];
  onSubjectClick: (s: SubjectContent) => void;
  isPurchased: (id: string) => boolean;
  allPurchased: boolean;
}) {
  const [activeUsers] = useState(() => Math.floor(Math.random() * 50) + 120);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center py-12 md:py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {activeUsers} osób teraz przegląda
          </div>
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm">
            <span>🎯</span>
            Egzamin 2026 - Zostało mało czasu!
          </div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Zdaj egzamin ósmoklasisty<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            z najlepszym wynikiem!
          </span>
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
          Kompletne materiały do nauki z matematyki, języka polskiego i angielskiego. 
          Wszystko w pigułce - zwięźle, konkretnie, skutecznie.
        </p>
        
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Gwarancja zwrotu 30 dni
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Dostęp na zawsze
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Aktualizacje gratis
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {!allPurchased && (
            <a 
              href="#pakiet"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-yellow-400 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 flex items-center gap-2"
            >
              <span>🔥</span>
              Kup pakiet za {BUNDLE_PRICE} zł
              <span className="text-xs bg-white/20 px-2 py-1 rounded-lg">-{Math.round((1 - BUNDLE_PRICE / ORIGINAL_BUNDLE_PRICE) * 100)}%</span>
            </a>
          )}
          <a href="#przedmioty" className="bg-white/10 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all border border-white/20">
            Zobacz przedmioty
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '3', label: 'Przedmioty', icon: '📚' },
          { value: '150+', label: 'Tematów', icon: '📝' },
          { value: '5000+', label: 'Uczniów', icon: '👨‍🎓' },
          { value: '98%', label: 'Zdawalność', icon: '🏆' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bundle Offer - Main CTA */}
      {!allPurchased && (
        <div id="pakiet" className="relative overflow-hidden bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-orange-600/30 rounded-3xl p-8 md:p-12 border border-purple-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 animate-pulse">
                🔥 NAJLEPSZA OFERTA - OSZCZĘDŹ {SAVINGS} ZŁ
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pakiet <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Wszystkich Przedmiotów</span>
              </h3>
              <p className="text-slate-300 mb-6">
                Kompletne przygotowanie do egzaminu z matematyki, języka polskiego i angielskiego. 
                Kup wszystkie 3 przedmioty w najlepszej cenie!
              </p>
              
              <ul className="space-y-3 mb-6">
                {[
                  'Matematyka - 7 rozdziałów, 35+ tematów',
                  'Język Polski - 6 rozdziałów, 30+ tematów + lektury',
                  'Język Angielski - 6 rozdziałów, gramatyka + słownictwo',
                  'Dostęp na zawsze + darmowe aktualizacje',
                  'Wsparcie i odpowiedzi na pytania'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-slate-400 mb-2">Osobno kosztuje</div>
                <div className="text-3xl text-slate-400 line-through mb-2">{ORIGINAL_BUNDLE_PRICE} zł</div>
                <div className="text-slate-400 mb-4">W pakiecie tylko</div>
                <div className="text-6xl font-extrabold text-white mb-2">
                  {BUNDLE_PRICE} <span className="text-2xl">zł</span>
                </div>
                <div className="inline-block bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">
                  Oszczędzasz {SAVINGS} zł ({Math.round((1 - BUNDLE_PRICE / ORIGINAL_BUNDLE_PRICE) * 100)}%)
                </div>
                
                <a
                  href={`${STRIPE_LINKS.pakiet}&success_url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}?success=true&subject=pakiet`)}`}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-extrabold py-5 px-8 rounded-2xl hover:from-yellow-400 hover:to-orange-400 transition-all shadow-xl shadow-orange-500/40 text-xl hover:scale-105"
                >
                  <span>🔥</span>
                  <span>Kup pakiet za {BUNDLE_PRICE} zł</span>
                </a>
                
                <div className="mt-4 text-slate-400 text-sm">
                  <p>W pakiecie otrzymujesz:</p>
                  <div className="flex justify-center gap-4 mt-2">
                    {subjects.map(subject => (
                      <span key={subject.id} className="flex items-center gap-1">
                        <span>{subject.icon}</span>
                        <span>{subject.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm flex items-center justify-center gap-2 mt-6">
                  <span>🔒</span> Bezpieczna płatność Stripe • 30 dni gwarancji zwrotu
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subjects */}
      <div id="przedmioty">
        <h3 className="text-3xl font-bold text-white mb-2 text-center">Wybierz przedmiot</h3>
        <p className="text-slate-400 text-center mb-8">Kliknij aby zobaczyć szczegóły lub kupić dostęp</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
              onClick={() => onSubjectClick(subject)}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {subject.icon}
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">{subject.name}</h4>
              <p className="text-slate-400 mb-4">
                {subject.sections.length} rozdziałów • {subject.sections.reduce((acc, s) => acc + s.topics.length, 0)} tematów
              </p>
              
              <div className="space-y-2 mb-6">
                {subject.sections.slice(0, 4).map((section) => (
                  <div key={section.id} className="flex items-center gap-2 text-slate-500 text-sm">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {section.title.replace(/^\d+\.\s*/, '')}
                  </div>
                ))}
                {subject.sections.length > 4 && (
                  <div className="text-slate-500 text-sm pl-6">+ {subject.sections.length - 4} więcej...</div>
                )}
              </div>

              {isPurchased(subject.id) ? (
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-bold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Odblokowane
                  </span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-400 transition-colors">
                    Otwórz →
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-white">{subject.price}</span>
                    <span className="text-slate-400 ml-1">zł</span>
                  </div>
                  <button className={`bg-gradient-to-r ${subject.color} text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg`}>
                    Kup dostęp
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div id="jak-to-dziala" className="py-8">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Jak to działa?</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Wybierz przedmiot', desc: 'Wybierz materiały z matematyki, polskiego lub angielskiego', icon: '📚' },
            { step: '2', title: 'Zapłać przez Stripe', desc: 'Bezpieczna płatność online - jednorazowy dostęp na zawsze', icon: '💳' },
            { step: '3', title: 'Ucz się w swoim tempie', desc: 'Materiały dostępne 24/7, ucz się kiedy chcesz i gdzie chcesz', icon: '⏰' },
            { step: '4', title: 'Zdaj egzamin!', desc: 'Przygotowany w 100%, podejdź pewnie do egzaminu', icon: '🎉' }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-purple-500/30">
                {item.icon}
              </div>
              <div className="text-purple-400 font-bold text-sm mb-2">KROK {item.step}</div>
              <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: '📖', title: 'Wszystko w pigułce', desc: 'Zwięzłe, konkretne materiały bez zbędnego lania wody. Tylko to, co trzeba wiedzieć na egzaminie.' },
          { icon: '✅', title: 'Zgodne z CKE 2026', desc: 'Materiały przygotowane zgodnie z aktualną podstawą programową i wymaganiami egzaminacyjnymi.' },
          { icon: '📱', title: 'Dostęp na każdym urządzeniu', desc: 'Ucz się na komputerze, tablecie lub telefonie. Materiały dostępne w przeglądarce.' },
          { icon: '🎯', title: 'Praktyczne wskazówki', desc: 'Strategie rozwiązywania zadań, typowe pułapki i porady jak zdobyć maksimum punktów.' },
          { icon: '🔄', title: 'Dostęp bez limitu', desc: 'Raz kupione materiały są Twoje na zawsze. Wracaj do nich ile razy chcesz.' },
          { icon: '💡', title: 'Przykłady i wyjaśnienia', desc: 'Każdy temat zawiera przykłady, wzory i wyjaśnienia krok po kroku.' }
        ].map((feature) => (
          <div key={feature.title} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
            <p className="text-slate-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8 text-center">Co mówią uczniowie?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Kasia M.', school: 'SP nr 5, Warszawa', text: 'Dzięki tym materiałom matematyka w końcu stała się zrozumiała! Wzory w pigułce to strzał w dziesiątkę. Zdałam z wynikiem 89%!', rating: 5, avatar: '👧' },
            { name: 'Tomek K.', school: 'SP nr 12, Kraków', text: 'Lektury w pigułce uratowały mnie przed egzaminem z polskiego. Wszystko jasne i konkretne. Polecam każdemu!', rating: 5, avatar: '👦' },
            { name: 'Maja W.', school: 'SP nr 3, Gdańsk', text: 'Angielskie czasy nareszcie rozumiem! Tabele i przykłady są mega pomocne. Kupiłam pakiet i nie żałuję ani złotówki.', rating: 5, avatar: '👧' }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-slate-300 italic mb-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.school}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8 text-center">Najczęściej zadawane pytania</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'Jak długo mam dostęp do materiałów?', a: 'Dostęp jest bezterminowy. Po zakupie możesz wracać do materiałów kiedy chcesz, bez żadnych ograniczeń czasowych.' },
            { q: 'Czy materiały są aktualne na egzamin 2026?', a: 'Tak! Wszystkie materiały są zgodne z aktualną podstawą programową i wymaganiami CKE na rok 2026.' },
            { q: 'Czy mogę dostać zwrot pieniędzy?', a: 'Tak, oferujemy 30-dniową gwarancję zwrotu. Jeśli materiały Ci nie odpowiadają, zwrócimy 100% kwoty.' },
            { q: 'Jak wygląda płatność?', a: 'Płatność odbywa się przez bezpieczny system Stripe. Możesz zapłacić kartą Visa, Mastercard lub BLIK.' },
            { q: 'Na jakich urządzeniach mogę się uczyć?', a: 'Materiały działają na każdym urządzeniu z przeglądarką - komputerze, tablecie i telefonie. Nie musisz niczego instalować.' }
          ].map((faq, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-bold mb-2">{faq.q}</h4>
              <p className="text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      {!allPurchased && (
        <div className="text-center py-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl border border-purple-500/30">
          <h3 className="text-3xl font-bold text-white mb-4">Nie czekaj do ostatniej chwili!</h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Egzamin zbliża się wielkimi krokami. Zacznij przygotowania już dziś i dołącz do tysięcy uczniów, 
            którzy zdali dzięki naszym materiałom!
          </p>
          <a
            href="#przedmioty"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-12 rounded-2xl hover:from-yellow-400 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/30 text-lg"
          >
            Wybierz przedmiot i zacznij się uczyć!
          </a>
        </div>
      )}
    </div>
  );
}

// Subject Preview
function SubjectPreview({ 
  subject, 
  onPurchase, 
  onBack 
}: { 
  subject: SubjectContent;
  onPurchase: (s: SubjectContent) => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Wróć do listy przedmiotów
      </button>

      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className={`w-24 h-24 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center justify-center text-5xl shadow-lg flex-shrink-0`}>
            {subject.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-4">{subject.name}</h2>
            <p className="text-slate-400 mb-6">
              Kompletne materiały do egzaminu ósmoklasisty z przedmiotu {subject.name.toLowerCase()}. 
              Wszystko, co musisz wiedzieć, zebrane w jednym miejscu.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white">
                📚 {subject.sections.length} rozdziałów
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white">
                📝 {subject.sections.reduce((acc, s) => acc + s.topics.length, 0)} tematów
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white">
                ⏱️ Dostęp bez limitu
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-4">Co zawiera kurs:</h3>
      <div className="space-y-3 mb-8">
        {subject.sections.map((section) => (
          <div key={section.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">{section.title}</div>
                  <div className="text-slate-500 text-sm">{section.topics.length} tematów</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-purple-500/30 text-center">
        <div className="text-slate-400 mb-2">Jednorazowa płatność</div>
        <div className="text-5xl font-bold text-white mb-4">
          {subject.price} <span className="text-xl text-slate-400">zł</span>
        </div>
        <ul className="text-slate-300 text-sm space-y-2 mb-6">
          <li>✓ Dostęp do wszystkich materiałów</li>
          <li>✓ Bez limitu czasowego</li>
          <li>✓ Aktualizacje gratis</li>
          <li>✓ Dostęp na każdym urządzeniu</li>
          <li>✓ 30 dni gwarancji zwrotu</li>
        </ul>
        <button
          onClick={() => onPurchase(subject)}
          className={`bg-gradient-to-r ${subject.color} text-white font-bold py-4 px-12 rounded-2xl hover:opacity-90 transition-all shadow-lg text-lg`}
        >
          Kup teraz za {subject.price} zł →
        </button>
        <p className="text-slate-500 text-sm mt-4 flex items-center justify-center gap-2">
          <span>🔒</span> Bezpieczna płatność przez Stripe
        </p>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-slate-400 text-sm">
            💡 <strong className="text-white">Wskazówka:</strong> Kup wszystkie przedmioty i oszczędź {SAVINGS} zł!
          </p>
        </div>
      </div>
    </div>
  );
}

// Content Page
function ContentPage({
  subject,
  expandedSection,
  setExpandedSection,
  expandedTopic,
  setExpandedTopic
}: {
  subject: SubjectContent;
  expandedSection: string | null;
  setExpandedSection: (id: string | null) => void;
  expandedTopic: string | null;
  setExpandedTopic: (id: string | null) => void;
}) {
  const currentSection = subject.sections.find(s => s.id === expandedSection);

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 sticky top-24">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
            <div className={`w-10 h-10 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center text-xl`}>
              {subject.icon}
            </div>
            <div>
              <div className="text-white font-bold">{subject.name}</div>
              <div className="text-slate-500 text-xs">
                {subject.sections.reduce((acc, s) => acc + s.topics.length, 0)} tematów
              </div>
            </div>
          </div>
          
          <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
            {subject.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setExpandedSection(section.id);
                  setExpandedTopic(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  expandedSection === section.id
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-3">
        {currentSection ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{currentSection.title}</h2>
            
            <div className="space-y-4">
              {currentSection.topics.map((topic, index) => {
                const topicId = `${currentSection.id}-${index}`;
                const isExpanded = expandedTopic === topicId;
                
                return (
                  <div
                    key={topicId}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedTopic(isExpanded ? null : topicId)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                          {index + 1}
                        </div>
                        <span className="text-white font-medium">{topic.title}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4">
                        <div className="bg-slate-800/50 rounded-xl p-6 prose prose-invert prose-sm max-w-none">
                          <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {topic.content.split('\n').map((line, i) => {
                              // Handle headers
                              if (line.startsWith('**') && line.endsWith('**')) {
                                return <h4 key={i} className="text-purple-300 font-bold mt-4 mb-2 text-base">{line.replace(/\*\*/g, '')}</h4>;
                              }
                              // Handle bold text within lines
                              if (line.includes('**')) {
                                const parts = line.split('**');
                                return (
                                  <p key={i} className="my-1">
                                    {parts.map((part, j) => 
                                      j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part
                                    )}
                                  </p>
                                );
                              }
                              // Handle list items
                              if (line.trim().startsWith('- ')) {
                                return <li key={i} className="ml-4 my-0.5">{line.trim().substring(2)}</li>;
                              }
                              // Handle tables (simplified)
                              if (line.includes('|')) {
                                const cells = line.split('|').filter(c => c.trim());
                                if (cells.length > 0 && !line.includes('---')) {
                                  return (
                                    <div key={i} className="flex gap-4 py-1 border-b border-white/10 text-xs">
                                      {cells.map((cell, j) => (
                                        <span key={j} className="flex-1">{cell.trim()}</span>
                                      ))}
                                    </div>
                                  );
                                }
                                return null;
                              }
                              // Regular text
                              if (line.trim()) {
                                return <p key={i} className="my-1">{line}</p>;
                              }
                              return <br key={i} />;
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              {(() => {
                const currentIndex = subject.sections.findIndex(s => s.id === expandedSection);
                const prevSection = currentIndex > 0 ? subject.sections[currentIndex - 1] : null;
                const nextSection = currentIndex < subject.sections.length - 1 ? subject.sections[currentIndex + 1] : null;

                return (
                  <>
                    {prevSection ? (
                      <button
                        onClick={() => {
                          setExpandedSection(prevSection.id);
                          setExpandedTopic(null);
                        }}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {prevSection.title}
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {nextSection && (
                      <button
                        onClick={() => {
                          setExpandedSection(nextSection.id);
                          setExpandedTopic(null);
                        }}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {nextSection.title}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">Wybierz rozdział</h3>
            <p className="text-slate-400">Kliknij na rozdział w menu po lewej stronie, aby wyświetlić materiały.</p>
          </div>
        )}
      </div>
    </div>
  );
}
