import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Download,
  Printer,
  RotateCcw,
  Coffee,
  Check,
  Sparkles,
  Share2,
  MessageCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Order } from '../types';
import { useKoperasi } from '../context/KoperasiContext';
import { KoperasiLogo } from './KoperasiLogo';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
  onOrderAgain: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  order,
  onClose,
  onOrderAgain
}) => {
  const { outlet, showToast, updateOrderStatus } = useKoperasi();
  const [isPrinting, setIsPrinting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!order) return null;

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(order.total).replace('Rp', 'Rp ');

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      window.print();
    }, 400);
  };

  const handleDownloadImage = () => {
    // Generate text receipt blob for download
    const receiptText = `========================================
         KOPERASI COFFEE SHOP
     "Kopi Pertemanan dan Relasi"
   ${outlet.address}
========================================
No. Bukti   : ${order.id}
Waktu       : ${order.createdAt}
Pelanggan   : ${order.customerName}
${order.customerPhone ? `No. WA      : ${order.customerPhone}\n` : ''}Tipe        : ${order.orderType === 'dine_in' ? `Dine-in (Meja ${order.tableNumber || '04'})` : 'Bungkus / Takeaway'}
Status      : LUNAS (QRIS ONLINE)
----------------------------------------
ITEM PESANAN:
${order.items.map(it => `* ${it.product.name} x${it.quantity} (${it.temperatureChoice || 'standard'}) = Rp ${(it.product.price * it.quantity).toLocaleString('id-ID')}${it.notes ? `\n  Catatan: ${it.notes}` : ''}`).join('\n')}
----------------------------------------
TOTAL DIBAYAR: ${formattedTotal}
========================================
Terima kasih telah singgah di Koperasi!
Semoga harimu menyenangkan & obrolanmu berkesan!
========================================`;

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nota-koperasi-${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Nota pesanan berhasil diunduh ke perangkat.');
  };

  const generateShareText = () => {
    const itemsSummary = order.items
      .map(it => `• ${it.product.name} (${it.quantity}x)`)
      .join('\n');

    return `🧾 *NOTA PESANAN KOPERASI*
_Kopi Pertemanan dan Relasi_

*No. Pesanan:* ${order.id}
*Pelanggan:* ${order.customerName}
*Layanan:* ${order.orderType === 'dine_in' ? `Dine-In (Meja ${order.tableNumber || '04'})` : 'Takeaway'}

*Pesanan:*
${itemsSummary}

*Total:* ${formattedTotal}
*Status:* LUNAS (QRIS)

📍 _${outlet.address}_
Terima kasih sudah memesan di Koperasi! ☕✨`;
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    const waNumber = order.customerPhone ? order.customerPhone.replace(/[^0-9]/g, '') : '';
    const formattedWa = waNumber.startsWith('0')
      ? '62' + waNumber.slice(1)
      : waNumber.startsWith('62')
      ? waNumber
      : '62' + waNumber;
    const waUrl = waNumber
      ? `https://wa.me/${formattedWa}?text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Membuka WhatsApp untuk mengirimkan nota...');
  };

  const handleShare = () => {
    const text = generateShareText();
    if (navigator.share) {
      navigator.share({
        title: `Nota KOPERASI ${order.id}`,
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      showToast('Rincian nota berhasil disalin ke clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const getStatusStep = () => {
    switch (order.orderStatus) {
      case 'paid':
        return 1;
      case 'preparing':
        return 2;
      case 'ready':
      case 'completed':
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md my-6 flex flex-col items-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Float */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-2 sm:-right-4 z-20 p-2 bg-[#20211F] text-white hover:bg-black rounded-full shadow-lg border border-white/20 transition-colors cursor-pointer"
          title="Tutup Nota"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Live Brewing Progress Stepper Card */}
        <div className="w-full bg-[#20211F] text-white p-4 rounded-2xl mb-3 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono text-[#A8D83E] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A8D83E] animate-ping" />
              <span>STATUS LIVE PESANAN</span>
            </span>
            <span className="font-mono text-white/70 text-[11px] bg-white/10 px-2 py-0.5 rounded">
              {order.id}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div
              className={`p-2 rounded-xl border transition-all ${
                currentStep >= 1
                  ? 'bg-white/10 border-[#A8D83E] text-white'
                  : 'border-white/10 text-white/40'
              }`}
            >
              <CheckCircle
                className={`w-4 h-4 mx-auto mb-1 ${
                  currentStep >= 1 ? 'text-[#A8D83E]' : 'text-white/30'
                }`}
              />
              <span className="font-bold">1. Diterima</span>
            </div>

            <div
              className={`p-2 rounded-xl border transition-all ${
                currentStep >= 2
                  ? 'bg-[#A8D83E]/20 border-[#A8D83E] text-white'
                  : 'border-white/10 text-white/40'
              }`}
            >
              <Coffee
                className={`w-4 h-4 mx-auto mb-1 ${
                  currentStep >= 2 ? 'text-[#A8D83E] animate-bounce' : 'text-white/30'
                }`}
              />
              <span className="font-bold">2. Diracik</span>
            </div>

            <div
              className={`p-2 rounded-xl border transition-all ${
                currentStep >= 3
                  ? 'bg-emerald-950/80 border-emerald-400 text-white'
                  : 'border-white/10 text-white/40'
              }`}
            >
              <Sparkles
                className={`w-4 h-4 mx-auto mb-1 ${
                  currentStep >= 3 ? 'text-emerald-400' : 'text-white/30'
                }`}
              />
              <span className="font-bold">3. Siap Diambil</span>
            </div>
          </div>

          {/* Quick Barista Simulation Trigger */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D8D3C8]">
            <span className="font-mono text-white/50 text-[10px]">Simulasi Antrean Bar:</span>
            <button
              onClick={() => {
                const nextStatus = currentStep === 1 ? 'preparing' : currentStep === 2 ? 'ready' : 'completed';
                updateOrderStatus(order.id, nextStatus);
                showToast(`Status diperbarui ke: ${nextStatus === 'preparing' ? 'Sedang Diracik' : nextStatus === 'ready' ? 'Siap Diambil' : 'Selesai'}`);
              }}
              className="text-[10px] font-mono text-[#A8D83E] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>{currentStep === 1 ? 'Mulai Racik ☕' : currentStep === 2 ? 'Tandai Siap ✨' : 'Pesanan Selesai ✓'}</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Verification & Auto-receipt notice banner */}
        {order.customerPhone && (
          <div className="w-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#128C7E] px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              <span>Nota Otomatis Terhubung: <strong>{order.customerPhone}</strong></span>
            </div>
            <button
              onClick={handleSendToWhatsApp}
              className="text-[11px] underline font-bold hover:text-emerald-900 cursor-pointer"
            >
              Buka Salinan
            </button>
          </div>
        )}

        {/* ============================================================
            AUTHENTIC SERRATED THERMAL RECEIPT CONTAINER
           ============================================================ */}
        <div className="w-full bg-[#FFFDF9] text-[#20211F] shadow-2xl relative border-x border-[#D8D3C8] select-none rounded-sm">
          {/* Top Zigzag Serrated Tear Edge SVG */}
          <div className="w-full overflow-hidden leading-none -mt-[7px]">
            <svg
              className="w-full h-2 text-[#FFFDF9] fill-current"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
            >
              <polygon points="0,8 5,0 10,8 15,0 20,8 25,0 30,8 35,0 40,8 45,0 50,8 55,0 60,8 65,0 70,8 75,0 80,8 85,0 90,8 95,0 100,8" />
            </svg>
          </div>

          <div className="p-6 sm:p-7 space-y-4 font-mono">
            {/* Header Lockup */}
            <div className="text-center pb-4 border-b-2 border-dashed border-[#20211F]/20 space-y-1">
              <h3 className="font-display font-black text-2xl tracking-tight text-[#20211F]">
                KOPERASI
              </h3>
              <p className="text-[11px] font-bold text-[#6B4B3E] tracking-wider uppercase">
                KOPI PERTEMANAN DAN RELASI
              </p>
              <p className="text-[10px] text-[#20211F]/70">
                {outlet.address}
              </p>
              <p className="text-[10px] text-[#20211F]/70">
                WA: 0812-3456-7890 • IG: @koperasi.coffee
              </p>
            </div>

            {/* Receipt Meta */}
            <div className="space-y-1.5 text-xs border-b border-dashed border-[#20211F]/20 pb-3.5">
              <div className="flex justify-between">
                <span className="text-[#20211F]/60">No. Bukti:</span>
                <span className="font-bold text-[#20211F]">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#20211F]/60">Waktu:</span>
                <span>{order.createdAt === 'Baru saja' ? 'Hari ini, Baru saja' : order.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#20211F]/60">Pelanggan:</span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              {order.customerPhone && (
                <div className="flex justify-between">
                  <span className="text-[#20211F]/60">No. WhatsApp:</span>
                  <span className="font-mono">{order.customerPhone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#20211F]/60">Layanan:</span>
                <span className="font-bold text-[#6B4B3E]">
                  {order.orderType === 'dine_in'
                    ? `Dine-In (Meja ${order.tableNumber || '04'})`
                    : 'Bungkus / Takeaway'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#20211F]/60">Barista Jaga:</span>
                <span>Dimas & Tim Bar</span>
              </div>
            </div>

            {/* Itemized Lines */}
            <div className="space-y-3 text-xs py-1">
              <div className="flex justify-between text-[11px] font-bold text-[#20211F]/60 border-b border-[#20211F]/10 pb-1 uppercase tracking-wider">
                <span>ITEM / MENU</span>
                <span>SUBTOTAL</span>
              </div>

              {order.items.map((item, idx) => {
                const sub = new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0
                }).format(item.product.price * item.quantity).replace('Rp', 'Rp ');

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[#20211F]">
                        {item.product.name} <span className="text-[#6B4B3E]">x{item.quantity}</span>
                      </span>
                      <span className="font-bold tabular-nums">{sub}</span>
                    </div>

                    {/* Temperature or custom request */}
                    <div className="text-[10px] text-[#6B4B3E] pl-2 font-sans">
                      {item.temperatureChoice === 'iced' && '• Disajikan Dingin (Es Kristal Segar)'}
                      {item.temperatureChoice === 'hot' && '• Disajikan Panas Hangat'}
                      {item.notes && ` • Catatan: "${item.notes}"`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations & QRIS Paid Seal */}
            <div className="border-t-2 border-dashed border-[#20211F]/30 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#20211F]/70">
                <span>Subtotal Pesanan:</span>
                <span className="tabular-nums">{formattedTotal}</span>
              </div>
              <div className="flex justify-between text-[#20211F]/70">
                <span>Pajak Resto (PB1):</span>
                <span>Rp 0 (Termasuk)</span>
              </div>
              <div className="flex justify-between text-[#20211F]/70">
                <span>Metode Pembayaran:</span>
                <span className="font-bold text-[#20211F]">QRIS ONLINE</span>
              </div>

              <div className="pt-2 border-t-2 border-[#20211F] flex justify-between items-baseline text-sm font-black">
                <span>TOTAL DIBAYAR:</span>
                <span className="text-base text-[#6B4B3E] tabular-nums font-bold">{formattedTotal}</span>
              </div>

              {/* Status Stamp */}
              <div className="mt-3 py-2 px-3 bg-[#A8D83E]/30 border-2 border-[#A8D83E] text-[#20211F] text-center font-bold text-xs rounded-lg flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>PEMBAYARAN LUNAS (PAID)</span>
              </div>
            </div>

            {/* Barcode Strip Graphic */}
            <div className="pt-4 text-center space-y-1 border-t border-dashed border-[#20211F]/20">
              <div className="h-9 flex items-center justify-center gap-[2px] opacity-80 overflow-hidden">
                {[2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 2, 4, 1, 3, 1, 2, 1, 3, 2, 1, 4, 1, 2].map((w, i) => (
                  <div
                    key={i}
                    className="bg-[#20211F] h-full"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[#20211F]/60 tracking-widest block font-mono">
                *{order.id}*
              </span>
            </div>

            {/* Heartfelt Note */}
            <div className="pt-2 text-center text-[11px] text-[#20211F]/70 italic font-sans leading-relaxed">
              "Kopi dingin, hati hangat. Terima kasih telah singgah di Koperasi!"
            </div>
          </div>

          {/* Bottom Zigzag Serrated Tear Edge SVG */}
          <div className="w-full overflow-hidden leading-none -mb-[7px]">
            <svg
              className="w-full h-2 text-[#FFFDF9] fill-current rotate-180"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
            >
              <polygon points="0,8 5,0 10,8 15,0 20,8 25,0 30,8 35,0 40,8 45,0 50,8 55,0 60,8 65,0 70,8 75,0 80,8 85,0 90,8 95,0 100,8" />
            </svg>
          </div>
        </div>

        {/* Action Buttons Below Receipt */}
        <div className="w-full mt-4 space-y-2 text-xs font-mono font-bold">
          {/* Send to WhatsApp & Share Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSendToWhatsApp}
              className="py-3 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim ke WhatsApp</span>
            </button>

            <button
              onClick={handleShare}
              className="py-3 px-3 bg-white border border-[#D8D3C8] hover:bg-[#FAF8F3] text-[#20211F] rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#6B4B3E]" />}
              <span>{isCopied ? 'Tersalin!' : 'Bagikan Nota'}</span>
            </button>
          </div>

          {/* Print & Download Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 bg-white border border-[#D8D3C8] hover:bg-[#FAF8F3] text-[#20211F] rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#6B4B3E]" />
              <span>{isPrinting ? 'Mencetak...' : 'Cetak Nota'}</span>
            </button>

            <button
              onClick={handleDownloadImage}
              className="py-2.5 px-3 bg-white border border-[#D8D3C8] hover:bg-[#FAF8F3] text-[#20211F] rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#6B4B3E]" />
              <span>Unduh File</span>
            </button>
          </div>

          {/* Order Again Primary Action */}
          <button
            onClick={onOrderAgain}
            className="w-full py-3.5 px-4 bg-[#A8D83E] hover:bg-[#96C432] active:scale-[0.98] text-[#20211F] rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer font-display font-bold uppercase tracking-wider text-sm mt-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Pesan Lagi (Buka Menu)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
