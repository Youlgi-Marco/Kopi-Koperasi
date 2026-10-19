import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Coffee } from 'lucide-react';
import { Product } from '../types';
import { useKoperasi } from '../context/KoperasiContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useKoperasi();
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'iced' | 'hot'>('iced');
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setTemperature('iced');
      setNotes('');
      setIsAdded(false);
    }
  }, [product?.id]);

  if (!product) return null;

  const isSoldOut = product.stock <= 0 || !product.available;
  const maxAvailable = product.stock;

  const handleAdd = () => {
    if (isSoldOut) return;
    const success = addToCart(
      product,
      quantity,
      notes.trim() || undefined,
      product.category === 'coffee' || product.category === 'macchiato' ? temperature : undefined
    );
    if (success) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        onClose();
      }, 700);
    }
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(product.price).replace('Rp', 'Rp ');

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(product.price * quantity).replace('Rp', 'Rp ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF8F3] border border-[#D8D3C8] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#20211F] rounded-full shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-[#E8E2D3] shrink-0">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-4">
            <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-wider uppercase bg-[#20211F] text-[#A8D83E] rounded">
              {product.seriesName}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display font-extrabold text-2xl text-[#20211F]">
                {product.name}
              </h2>
              <span className="font-mono text-xl font-bold text-[#6B4B3E] tabular-nums shrink-0">
                {formattedPrice}
              </span>
            </div>
            <p className="text-sm text-[#20211F]/70 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Temperature Options for Coffee */}
          {(product.category === 'coffee' || product.category === 'macchiato') && (
            <div className="pt-3 border-t border-[#D8D3C8]/60">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-2">
                Pilihan Suhu
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTemperature('iced')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                    temperature === 'iced'
                      ? 'bg-[#20211F] text-[#A8D83E] border-[#20211F]'
                      : 'bg-white text-[#20211F] border-[#D8D3C8] hover:border-[#6B4B3E]'
                  }`}
                >
                  Dingin (Es Kristal Segar)
                </button>
                {product.category === 'coffee' && (
                  <button
                    type="button"
                    onClick={() => setTemperature('hot')}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                      temperature === 'hot'
                        ? 'bg-[#20211F] text-[#A8D83E] border-[#20211F]'
                        : 'bg-white text-[#20211F] border-[#D8D3C8] hover:border-[#6B4B3E]'
                    }`}
                  >
                    Panas (Hangat Mantap)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Special Request / Notes */}
          <div className="pt-3 border-t border-[#D8D3C8]/60">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1.5">
              Catatan Khusus (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Less ice, gula sedikit, pisah saus..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#D8D3C8] rounded focus:outline-none focus:border-[#6B4B3E] text-[#20211F] placeholder:text-[#20211F]/40"
              maxLength={120}
            />
          </div>

          {/* Quantity and Subtotal */}
          <div className="pt-3 border-t border-[#D8D3C8]/60 flex items-center justify-between">
            <div>
              <span className="block text-xs text-[#20211F]/60">Jumlah Pesanan</span>
              <span className="text-[11px] font-mono text-[#6B4B3E]">
                {isSoldOut ? 'Stok habis' : `Tersedia: ${maxAvailable}`}
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#D8D3C8] rounded-md px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1 || isSoldOut}
                className="p-1 text-[#20211F] hover:text-[#6B4B3E] disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono font-bold text-sm min-w-[20px] text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxAvailable, q + 1))}
                disabled={quantity >= maxAvailable || isSoldOut}
                className="p-1 text-[#20211F] hover:text-[#6B4B3E] disabled:opacity-30 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add CTA */}
        <div className="p-4 bg-white border-t border-[#D8D3C8] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#20211F]/60 block font-mono">Total Pesanan</span>
            <span className="font-mono text-lg font-bold text-[#20211F] tabular-nums">
              {formattedTotal}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isSoldOut}
            className={`flex-1 py-3 px-5 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSoldOut
                ? 'bg-[#E8E2D3] text-[#20211F]/40 cursor-not-allowed'
                : isAdded
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-[#A8D83E] hover:bg-[#96C432] active:scale-[0.98] text-[#20211F] shadow-sm'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Dimasukkan ke Pesanan</span>
              </>
            ) : isSoldOut ? (
              <span>Produk Sedang Habis</span>
            ) : (
              <>
                <Coffee className="w-4 h-4" />
                <span>Tambah ke Pesanan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
