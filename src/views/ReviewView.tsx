import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';

export const ReviewView: React.FC = () => {
  const { reviews, addReview, products } = useKoperasi();
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [favoriteItem, setFavoriteItem] = useState('Caffè Latte');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const approvedReviews = reviews.filter((r) => r.approved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addReview(authorName, rating, comment, favoriteItem);
      setSubmittedSuccess(true);
      setAuthorName('');
      setComment('');
      setTimeout(() => setSubmittedSuccess(false), 4000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Ulasan gagal dikirim. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-24 pb-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#D8D3C8]/70">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#6B4B3E]">
            TESTIMONI & CERITA
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#20211F] tracking-tight mt-1">
            Cerita dari Mereka
          </h1>
          <p className="text-xs sm:text-sm text-[#20211F]/70 mt-2 leading-relaxed">
            Kesan jujur dari kawan-kawan yang telah singgah menikmati kopi santai dan toast hangat di Koperasi.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Asymmetric Review Cards Wall */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {approvedReviews.map((rev, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={rev.id}
                    className={`p-6 rounded-xl border border-[#D8D3C8] shadow-2xs flex flex-col justify-between transition-all duration-300 hover:border-[#6B4B3E]/50 ${
                      isEven ? 'bg-white' : 'bg-[#FAF8F3] sm:translate-y-2'
                    }`}
                  >
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-[#A8D83E] text-[#A8D83E]'
                                : 'fill-transparent text-[#D8D3C8]'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-[#20211F]/80 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#D8D3C8]/50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#20211F] block">— {rev.author}</span>
                        <span className="text-[10px] text-[#20211F]/50 font-mono">{rev.date}</span>
                      </div>
                      {rev.favoriteItem && (
                        <span className="text-[10px] font-mono font-medium text-[#6B4B3E] bg-[#F5F1E8] px-2 py-0.5 rounded">
                          {rev.favoriteItem}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Write a Review Form */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white border border-[#D8D3C8] rounded-xl p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-[#6B4B3E]" />
                <h3 className="font-display font-extrabold text-xl text-[#20211F]">
                  Bagikan Ceritamu
                </h3>
              </div>
              <p className="text-xs text-[#20211F]/70 leading-relaxed">
                Punya pengalaman berkesan saat ngopi di Koperasi? Tulis ulasanmu di sini.
              </p>

              {submittedSuccess && (
                <div className="p-3.5 bg-[#A8D83E]/20 border border-[#A8D83E] rounded-md text-xs text-[#20211F] flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#20211F] shrink-0" />
                  <span>Ulasanmu telah dikirim dan menunggu persetujuan admin. Terima kasih!</span>
                </div>
              )}
              {submitError && (
                <p role="alert" className="text-xs text-rose-700">{submitError}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1">
                    Nama Kamu <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Raka, Sarah, atau panggilan akrab"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#D8D3C8] rounded-md focus:outline-none focus:border-[#6B4B3E] text-[#20211F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1.5">
                    Rating Bintang
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-[#A8D83E] text-[#A8D83E]'
                              : 'fill-transparent text-[#D8D3C8]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-[#6B4B3E] ml-2">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1">
                    Menu Favorit
                  </label>
                  <select
                    value={favoriteItem}
                    onChange={(e) => setFavoriteItem(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#D8D3C8] rounded-md focus:outline-none focus:border-[#6B4B3E] text-[#20211F] cursor-pointer"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.seriesName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#20211F] mb-1">
                    Ulasan & Pengalaman <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ceritakan rasanya kopi, kehangatan roti bakar, atau suasananya..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#D8D3C8] rounded-md focus:outline-none focus:border-[#6B4B3E] text-[#20211F]"
                    maxLength={300}
                  />
                  <div className="text-right text-[10px] text-[#20211F]/40 font-mono mt-0.5">
                    {comment.length}/300
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-[#20211F] hover:bg-[#2A2C29] active:scale-[0.99] text-[#A8D83E] font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Mengirimkan Ulasan...</span>
                  ) : (
                    <>
                      <span>Kirim Ulasan</span>
                      <Sparkles className="w-4 h-4 text-[#A8D83E]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
