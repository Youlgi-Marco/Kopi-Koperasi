import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { adminLogin } = useKoperasi();
  const [email, setEmail] = useState('Koperasi@gmail.com');
  const [password, setPassword] = useState('Koperasi998');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanUser = email.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMessage('Username/Email dan kata sandi wajib diisi.');
      return;
    }

    const ok = adminLogin(cleanUser, cleanPass);
    if (!ok) {
      setErrorMessage('Kredensial staff tidak valid. Periksa kembali akun dan kata sandi Anda.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#20211F] text-[#F5F1E8] border border-[#3A3C38] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#333532] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#A8D83E]" />
            <span className="font-mono text-xs font-bold tracking-widest text-[#A8D83E] uppercase">
              PORTAL STAFF KASIR
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D8D3C8] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="font-display font-extrabold text-2xl text-white">
              Masuk Mode Admin
            </h2>
            <p className="text-xs text-[#D8D3C8] max-w-xs mx-auto leading-relaxed">
              Akses khusus barista dan pengelola toko untuk memproses antrean pesanan, mengubah stok, dan mengatur menu.
            </p>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#D8D3C8] mb-1.5">
                Username / Email Staff
              </label>
              <input
                type="text"
                required
                placeholder="admin@koperasi.coffee"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#2A2C29] border border-[#444642] rounded-lg focus:outline-none focus:border-[#A8D83E] text-white font-mono placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#D8D3C8] mb-1.5">
                Kata Sandi Staff / PIN
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Masukkan kata sandi atau PIN"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#2A2C29] border border-[#444642] rounded-lg focus:outline-none focus:border-[#A8D83E] text-white font-mono placeholder:text-white/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-[#A8D83E] hover:bg-[#96C432] active:scale-[0.99] text-[#20211F] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer font-mono mt-2"
            >
              <span>Verifikasi & Masuk Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
