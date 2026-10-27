import React, { Suspense, lazy, useState } from 'react';
import { KoperasiProvider, useKoperasi } from './context/KoperasiContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Product } from './types';

const ProductModal = lazy(() => import('./components/ProductModal').then(({ ProductModal }) => ({ default: ProductModal })));
const CartDrawer = lazy(() => import('./components/CartDrawer').then(({ CartDrawer }) => ({ default: CartDrawer })));
const CheckoutModal = lazy(() => import('./components/CheckoutModal').then(({ CheckoutModal }) => ({ default: CheckoutModal })));
const ReceiptModal = lazy(() => import('./components/ReceiptModal').then(({ ReceiptModal }) => ({ default: ReceiptModal })));
const CustomerAuthModal = lazy(() => import('./components/CustomerAuthModal').then(({ CustomerAuthModal }) => ({ default: CustomerAuthModal })));
const AdminLoginModal = lazy(() => import('./components/AdminLoginModal').then(({ AdminLoginModal }) => ({ default: AdminLoginModal })));
const HomeView = lazy(() => import('./views/HomeView').then(({ HomeView }) => ({ default: HomeView })));
const MenuView = lazy(() => import('./views/MenuView').then(({ MenuView }) => ({ default: MenuView })));
const AboutView = lazy(() => import('./views/AboutView').then(({ AboutView }) => ({ default: AboutView })));
const OutletView = lazy(() => import('./views/OutletView').then(({ OutletView }) => ({ default: OutletView })));
const ReviewView = lazy(() => import('./views/ReviewView').then(({ ReviewView }) => ({ default: ReviewView })));
const AdminView = lazy(() => import('./views/AdminView').then(({ AdminView }) => ({ default: AdminView })));

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isCartOpen,
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
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center" role="status">
              <span className="sr-only">Memuat halaman...</span>
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-r-transparent" />
            </div>
          }
        >
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
        </Suspense>
      </main>

      {/* Global Brand Footer */}
      <Footer />

      <Suspense fallback={null}>
        {activeModalProduct && (
          <ProductModal
            product={activeModalProduct}
            onClose={() => setActiveModalProduct(null)}
          />
        )}
        {isCartOpen && <CartDrawer onProceedToCheckout={handleProceedToCheckout} />}
        {isCustomerAuthModalOpen && (
          <CustomerAuthModal
            isOpen
            onClose={() => setIsCustomerAuthModalOpen(false)}
            onSuccess={() => {
              if (isCheckoutOpen) {
                setIsCheckoutOpen(true);
              }
            }}
          />
        )}
        {isAdminAuthModalOpen && (
          <AdminLoginModal
            isOpen
            onClose={() => setIsAdminAuthModalOpen(false)}
          />
        )}
        {isCheckoutOpen && (
          <CheckoutModal
            isOpen
            onClose={() => setIsCheckoutOpen(false)}
            onSuccess={handleCheckoutSuccess}
          />
        )}
        {activeReceiptOrder && (
          <ReceiptModal
            order={activeReceiptOrder}
            onClose={() => setActiveReceiptOrder(null)}
            onOrderAgain={handleOrderAgain}
          />
        )}
      </Suspense>

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
