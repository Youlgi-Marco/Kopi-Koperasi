import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, UserCheck } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    setCurrentView,
    customerUser,
    setIsCustomerAuthModalOpen,
    showToast
  } = useKoperasi();

  if (!isCartOpen) return null;

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(cartTotal).replace('Rp', 'Rp ');

  const handleCheckoutClick = () => {
    if (!customerUser) {
      setIsCartOpen(false);
      setIsCustomerAuthModalOpen(true);
      showToast('Silakan masuk atau daftar akun pelanggan terlebih dahulu.');
      return;
    }
    setIsCartOpen(false);
    onProceedToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] border-l border-[#D8D3C8] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#F5F1E8] border-b border-[#D8D3C8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#6B4B3E]" />
              <h2 className="font-display font-extrabold text-lg text-[#20211F]">
                Pesanan Kamu
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#20211F]/70 hover:text-[#20211F] rounded-full hover:bg-[#E8E2D3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Logged In Indicator Banner */}
          {customerUser ? (
            <div className="px-6 py-2.5 bg-[#A8D83E]/20 border-b border-[#A8D83E]/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-mono text-[#20211F]">
                <UserCheck className="w-4 h-4 text-[#20211F]" />
                <span>Memesan sebagai: <strong className="font-bold">{customerUser.name}</strong></span>
              </div>
            </div>
          ) : (
            <div className="px-6 py-2.5 bg-[#E8E2D3] border-b border-[#D8D3C8] flex items-center justify-between text-xs font-mono">
              <span className="text-[#6B4B3E]">Belum masuk akun</span>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCustomerAuthModalOpen(true);
                }}
                className="text-[#20211F] underline font-bold cursor-pointer"
              >
                Masuk di Sini
              </button>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E8E2D3] flex items-center justify-center text-[#6B4B3E] mb-3">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-display font-bold text-base text-[#20211F]">
                  Belum ada pesanan
                </h3>
                <p className="text-xs text-[#20211F]/60 max-w-xs mt-1">
                  Pilih kopi nikmat atau toast hangat favoritmu dari menu Koperasi.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('menu');
                  }}
                  className="mt-5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#20211F] text-[#A8D83E] rounded-md hover:bg-[#2A2C29] transition-colors cursor-pointer"
                >
                  Buka Menu
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0
                }).format(item.product.price * item.quantity).replace('Rp', 'Rp ');

                return (
                  <div
                    key={`${item.product.id}-${item.temperatureChoice || 'default'}`}
                    className="p-3.5 bg-white border border-[#D8D3C8]/80 rounded-lg shadow-2xs flex gap-3.5 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-md bg-[#FAF8F3] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display font-bold text-sm text-[#20211F] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.temperatureChoice)}
                          className="text-[#20211F]/40 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                          title="Hapus item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#6B4B3E] mt-0.5">
                        {item.temperatureChoice === 'iced' && 'Dingin (Es)'}
                        {item.temperatureChoice === 'hot' && 'Panas (Hangat)'}
                        {item.notes && ` • Catatan: ${item.notes}`}
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        <span className="font-mono text-xs font-bold text-[#20211F] tabular-nums">
                          {itemPrice}
                        </span>

                        <div className="flex items-center gap-2 bg-[#F5F1E8] border border-[#D8D3C8] rounded px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1, item.temperatureChoice)}
                            className="p-0.5 text-[#20211F] hover:text-[#6B4B3E] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold min-w-[14px] text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1, item.temperatureChoice)}
                            className="p-0.5 text-[#20211F] hover:text-[#6B4B3E] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#D8D3C8] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#20211F]/70">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-xs text-[#20211F]/70">
                  <span>Pajak Restoran</span>
                  <span className="font-mono text-[#6B4B3E]">Termasuk</span>
                </div>
                <div className="pt-2 border-t border-[#F5F1E8] flex justify-between items-baseline">
                  <span className="font-display font-bold text-base text-[#20211F]">
                    Total Bayar
                  </span>
                  <span className="font-mono text-xl font-bold text-[#20211F] tabular-nums">
                    {formattedTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-6 bg-[#A8D83E] hover:bg-[#96C432] active:scale-[0.99] text-[#20211F] font-bold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>{customerUser ? 'Lanjut ke Pembayaran QRIS' : 'Login Pelanggan & Beli'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
