import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, UserCheck } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { KoperasiLogo } from './KoperasiLogo';
import { QRIS_IMAGE } from '../data/initialData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { cart, cartTotal, placeOrder, customerUser } = useKoperasi();
  const [customerName, setCustomerName] = useState(customerUser?.name || '');
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [tableNumber, setTableNumber] = useState(customerUser?.defaultTable || '04');
  const [customerPhone, setCustomerPhone] = useState(customerUser?.phone || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (customerUser) {
      setCustomerName(customerUser.name);
      setCustomerPhone(customerUser.phone);
      if (customerUser.defaultTable) setTableNumber(customerUser.defaultTable);
    }
  }, [customerUser]);

  if (!isOpen || cart.length === 0) return null;

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(cartTotal).replace('Rp', 'Rp ');

  const handlePlaceOrder = async () => {
    if (!customerName.trim()) {
      setErrorMsg('Mohon isi nama pemesan terlebih dahulu.');
      return;
    }
    setErrorMsg(null);
    setIsProcessing(true);
    try {
      await placeOrder({
        customerName: customerName.trim(),
        orderType,
        tableNumber: orderType === 'dine_in' ? (tableNumber.trim() || '04') : undefined,
        customerPhone: customerPhone.trim() || customerUser?.phone || undefined
      });
      onSuccess();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Pesanan gagal disimpan. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF8F3] border border-[#D8D3C8] rounded-xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#20211F] text-[#F5F1E8] flex items-center justify-between">
          <KoperasiLogo variant="light" size="sm" showTagline={false} />
          <button
            onClick={onClose}
            className="p-1.5 text-[#F5F1E8]/70 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Headline */}
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#6B4B3E] font-bold">
              PEMBAYARAN DIGITAL QRIS
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#20211F]">
              Almost there.
            </h2>
            <p className="text-xs text-[#20211F]/70 max-w-sm mx-auto">
              Pindai QRIS untuk membayar. Setelah membayar, kirim rincian pesanan ke WhatsApp barista untuk verifikasi.
            </p>
          </div>

          {/* Logged in Customer info verification */}
          {customerUser && (
            <div className="p-3 bg-[#A8D83E]/20 border border-[#A8D83E]/50 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <UserCheck className="w-4 h-4 text-[#20211F]" />
                <span>Akun Terverifikasi: <strong>{customerUser.name}</strong></span>
              </div>
              <span className="text-[10px] text-[#6B4B3E] font-mono">{customerUser.phone}</span>
            </div>
          )}

          {/* Customer Details Form */}
          <div className="space-y-3.5 bg-white p-4 rounded-lg border border-[#D8D3C8]/80 shadow-2xs">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1">
                Nama Pemesan <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Misal: Raka Pratama"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#D8D3C8] rounded focus:outline-none focus:border-[#6B4B3E] text-[#20211F]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1">
                  Jenis Pesanan
                </label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine_in')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded border cursor-pointer ${
                      orderType === 'dine_in'
                        ? 'bg-[#20211F] text-[#A8D83E] border-[#20211F]'
                        : 'bg-[#FAF8F3] text-[#20211F] border-[#D8D3C8]'
                    }`}
                  >
                    Dine In
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded border cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-[#20211F] text-[#A8D83E] border-[#20211F]'
                        : 'bg-[#FAF8F3] text-[#20211F] border-[#D8D3C8]'
                    }`}
                  >
                    Takeaway
                  </button>
                </div>
              </div>

              {orderType === 'dine_in' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1">
                    Nomor Meja
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 04"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF8F3] border border-[#D8D3C8] rounded focus:outline-none focus:border-[#20211F] text-[#20211F] font-mono"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#20211F]">
                  Nomor WhatsApp <span className="text-rose-600">*</span>
                </label>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                  {customerUser?.phone ? '✓ Terverifikasi dari Akun' : 'Kontak pemesan'}
                </span>
              </div>
              <input
                type="tel"
                placeholder="0812xxxxxxxx"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#D8D3C8] rounded focus:outline-none focus:border-[#20211F] text-[#20211F] font-mono"
              />
              <p className="text-[10px] text-[#20211F]/60 mt-1">
                Nomor ini dicantumkan pada rincian pesanan agar barista dapat menghubungi Anda.
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 p-2 rounded">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* QRIS Code Presentation Box */}
          <div className="bg-white p-5 rounded-lg border-2 border-dashed border-[#6B4B3E]/30 flex flex-col items-center text-center shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-extrabold text-sm tracking-wider text-rose-600">
                QRIS
              </span>
              <span className="text-[10px] text-[#20211F]/60 font-mono">
                Pindai untuk membayar ke KOPIKOPERASI
              </span>
            </div>

            <div className="relative p-2 bg-white border border-[#20211F]/20 rounded-md shadow-xs">
              <img
                src={QRIS_IMAGE}
                alt="QRIS KOPIKOPERASI untuk pembayaran"
                className="w-48 h-auto sm:w-56"
              />
            </div>

            <div className="mt-3 text-center">
              <span className="text-[11px] text-[#20211F]/60 block font-mono">
                Total Pembayaran
              </span>
              <span className="font-mono text-2xl font-extrabold text-[#20211F] tabular-nums">
                {formattedTotal}
              </span>
            </div>

            <p className="text-[11px] text-[#6B4B3E] font-medium mt-3 bg-[#F5F1E8] px-3 py-1.5 rounded">
              Masukkan nominal tepat {formattedTotal} pada aplikasi pembayaran Anda. Pembayaran belum terverifikasi otomatis; kirim pesanan ke barista setelah membayar.
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-white border-t border-[#D8D3C8] flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#20211F]/70 hover:text-[#20211F] rounded transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="flex-1 py-3 px-6 bg-[#A8D83E] hover:bg-[#96C432] active:scale-[0.99] text-[#20211F] font-bold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer font-mono"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#20211F] border-t-transparent rounded-full animate-spin" />
                <span>Memproses Nota...</span>
              </span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#20211F]" />
                <span>Buat Pesanan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
