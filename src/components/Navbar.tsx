import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  User,
  LogOut,
  ChevronDown,
  Lock
} from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { KoperasiLogo } from './KoperasiLogo';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    customerUser,
    adminUser,
    customerLogout,
    setIsCustomerAuthModalOpen,
    setIsAdminAuthModalOpen
  } = useKoperasi();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'outlet', label: 'Outlet' },
    { id: 'menu', label: 'Menu' },
    { id: 'review', label: 'Reviews' },
  ] as const;

  const handleNavClick = (viewId: 'home' | 'about' | 'outlet' | 'menu' | 'review') => {
    setCurrentView(viewId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
    if (adminUser) {
      setCurrentView(currentView === 'admin' ? 'home' : 'admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F1E8]/95 backdrop-blur-md shadow-xs border-b border-[#D8D3C8]/70 py-3.5'
          : 'bg-[#F5F1E8] py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 lg:gap-8">
          {/* Brand Logo matching reference */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left cursor-pointer focus:outline-none"
            aria-label="Koperasi Home"
          >
            <KoperasiLogo size="sm" variant="dark" showTagline={false} className="sm:hidden" />
            <KoperasiLogo size="md" variant="dark" className="hidden sm:flex" />
          </button>

          {/* Center Navigation Links matching reference screenshot: Beranda, Tentang Kami, Outlet, Menu, Reviews */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#20211F]">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#20211F] font-bold'
                      : 'text-[#20211F]/75 hover:text-[#20211F]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#A8D83E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Profile (👤), Cart (🛍️), and Rounded Pill Button (Order Now ↗) */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-3 lg:gap-4">
            {/* Customer Profile Icon */}
            {customerUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-1.5 sm:p-2 text-[#20211F] hover:text-[#6B4B3E] hover:bg-[#E8E2D3]/60 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                  title={`Akun: ${customerUser.name}`}
                  aria-label="Akun pelanggan"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden xl:inline text-xs font-semibold max-w-[80px] truncate">
                    {customerUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#20211F]/50 hidden xl:inline" />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D8D3C8] rounded-xl shadow-xl py-2 z-50 text-xs animate-in fade-in-50">
                      <div className="px-3.5 py-2 border-b border-[#F5F1E8]">
                        <span className="text-[10px] text-[#20211F]/50 block font-mono">Pelanggan</span>
                        <span className="font-bold text-[#20211F] truncate block">{customerUser.name}</span>
                        <span className="text-[10px] text-[#6B4B3E] font-mono">{customerUser.phone}</span>
                      </div>
                      <button
                        onClick={() => {
                          customerLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar Akun</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsCustomerAuthModalOpen(true)}
                className="p-1.5 sm:p-2 text-[#20211F] hover:text-[#6B4B3E] hover:bg-[#E8E2D3]/60 rounded-full transition-colors cursor-pointer"
                title="Masuk Akun Pelanggan"
                aria-label="Masuk Akun"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Admin access sits beside the customer account control. */}
            <button
              onClick={handleAdminAccess}
              className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-[#20211F] text-[#A8D83E]'
                  : 'text-[#20211F] hover:text-[#6B4B3E] hover:bg-[#E8E2D3]/60'
              }`}
              title={adminUser ? (currentView === 'admin' ? 'Kembali ke Beranda' : 'Buka Panel Admin') : 'Masuk Admin'}
              aria-label={adminUser ? 'Panel admin' : 'Masuk admin'}
            >
              <Lock className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2 text-[#20211F] hover:text-[#6B4B3E] hover:bg-[#E8E2D3]/60 rounded-full transition-transform duration-200 hover:scale-105 cursor-pointer"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 bg-[#A8D83E] text-[#20211F] text-[10px] font-bold font-mono rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Pill "Order Now ↗" Button matching user's reference screenshot */}
            <button
              onClick={() => {
                if (currentView !== 'menu') {
                  setCurrentView('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#A8D83E] hover:bg-[#96C432] active:scale-95 text-[#20211F] font-bold text-xs sm:text-sm tracking-wide rounded-full shadow-xs transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span>Order Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-[#20211F] hover:bg-[#E8E2D3] rounded-md transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F5F1E8] border-b border-[#D8D3C8] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-[#20211F] text-[#F5F1E8]'
                    : 'text-[#20211F] hover:bg-[#E8E2D3]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#D8D3C8]/60 space-y-2">
              {!customerUser ? (
                <button
                  onClick={() => {
                    setIsCustomerAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-[#20211F] bg-white rounded-lg border border-[#D8D3C8]"
                >
                  Masuk Akun Pelanggan
                </button>
              ) : (
                <div className="px-3 py-2 bg-white rounded-lg border border-[#D8D3C8] flex justify-between items-center text-xs">
                  <span className="font-bold">{customerUser.name}</span>
                  <button onClick={customerLogout} className="text-rose-600 font-medium">
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
