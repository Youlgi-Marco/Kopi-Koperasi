import React, { useState } from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { useKoperasi } from '../context/KoperasiContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  featured = false
}) => {
  const { addToCart } = useKoperasi();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isSoldOut = product.stock <= 0 || !product.available;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;

    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  // Format Indonesian Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(product.price).replace('Rp', 'Rp ');

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(product)}
      className={`group relative flex flex-col justify-between bg-white border border-[#D8D3C8]/80 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#6B4B3E]/40 hover:shadow-md cursor-pointer ${
        featured ? 'ring-1 ring-[#A8D83E]/50' : ''
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F3]">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F5F1E8]">
            <span className="font-display font-bold text-lg text-[#6B4B3E]">
              {product.name}
            </span>
            <span className="text-xs text-[#20211F]/60 mt-1">{product.seriesName}</span>
          </div>
        )}

        {/* Floating Best Seller Badge or Sold Out status */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.bestSeller && !isSoldOut && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#20211F] text-[#A8D83E] rounded shadow-xs">
              Pilihan Favorit
            </span>
          )}
          {isSoldOut && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-rose-600 text-white rounded shadow-xs">
              Sold Out
            </span>
          )}
        </div>

        {/* Hover Quick Preview Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            className="p-1.5 bg-white/90 backdrop-blur-xs rounded-full text-[#20211F] hover:bg-white shadow-xs cursor-pointer"
            title="Lihat Detail Produk"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Meta */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-[11px] text-[#6B4B3E] font-medium uppercase tracking-wider mb-1">
            <span>{product.seriesName}</span>
            {product.portionNote && (
              <>
                <span aria-hidden="true" className="text-[#D8D3C8]">·</span>
                <span className="text-[#20211F]/60 normal-case">{product.portionNote}</span>
              </>
            )}
          </div>

          <h3 className="font-display font-bold text-base text-[#20211F] group-hover:text-[#6B4B3E] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#20211F]/70 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#F5F1E8] flex items-center justify-between gap-2">
          <div>
            <span className="font-mono text-sm sm:text-base font-bold text-[#20211F] tabular-nums">
              {formattedPrice}
            </span>
            <div className="text-[10px] text-[#20211F]/50 font-mono">
              {isSoldOut ? (
                <span className="text-rose-600 font-semibold">Stok Habis</span>
              ) : (
                <span>Stok: {product.stock}</span>
              )}
            </div>
          </div>

          {/* Interactive Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isSoldOut}
            className={`group/btn relative inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded transition-all duration-200 cursor-pointer ${
              isSoldOut
                ? 'bg-[#E8E2D3] text-[#20211F]/40 cursor-not-allowed'
                : isAdding
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-[#A8D83E] hover:bg-[#96C432] active:scale-95 text-[#20211F] shadow-xs'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 animate-in zoom-in-50" />
                <span>Masuk</span>
              </>
            ) : isSoldOut ? (
              <span>Habis</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:rotate-90" />
                <span>Tambah</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
