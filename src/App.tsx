import React, { useState } from 'react';
import { KoperasiProvider, useKoperasi } from './context/KoperasiContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReceiptModal } from './components/ReceiptModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { AboutView } from './views/AboutView';
import { OutletView } from './views/OutletView';
import { ReviewView } from './views/ReviewView';
import { AdminView } from './views/AdminView';
import { Product } from './types';

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    activeModalProduct,
    setActiveModalProduct,
    activeReceiptOrder,
    setActiveReceiptOrder,
    isCustomerAuthModalOpen,
    setIsCustomerAuthModalOpen,
    isAdminAuthModalOpen,
    setIsAdminAuthModalOpen,
    toastMessage
  } = useKoperasi();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenProductDetail = (product: Product) => {
    setActiveModalProduct(product);
  };

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
  };

  const handleOrderAgain = () => {
    setActiveReceiptOrder(null);
    setCurrentView('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#20211F]">
      {/* Sticky Main Navigation */}
      <Navbar />

      {/* Main View Container */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView onOpenProductDetail={handleOpenProductDetail} />
        )}
        {currentView === 'menu' && (
          <MenuView onOpenProductDetail={handleOpenProductDetail} />
        )}
        {currentView === 'about' && <AboutView />}
        {currentView === 'outlet' && <OutletView />}
        {currentView === 'review' && <ReviewView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Global Brand Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer onProceedToCheckout={handleProceedToCheckout} />

      {/* Customer Authentication Modal (Mandatory before ordering/checkout) */}
      <CustomerAuthModal
        isOpen={isCustomerAuthModalOpen}
        onClose={() => setIsCustomerAuthModalOpen(false)}
        onSuccess={() => {
          // If customer was opening checkout, resume to checkout
          if (isCheckoutOpen) {
            setIsCheckoutOpen(true);
          }
        }}
      />

      {/* Dedicated Admin / Staff Login Gate Modal */}
      <AdminLoginModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
      />

      {/* QRIS Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Digital Receipt / Nota Modal */}
      <ReceiptModal
        order={activeReceiptOrder}
        onClose={() => setActiveReceiptOrder(null)}
        onOrderAgain={handleOrderAgain}
      />

      {/* Floating Micro-Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
          <div className="px-5 py-2.5 bg-[#20211F] text-[#A8D83E] text-xs font-mono font-bold tracking-wider rounded-full shadow-xl border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A8D83E] animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <KoperasiProvider>
      <AppContent />
    </KoperasiProvider>
  );
}
