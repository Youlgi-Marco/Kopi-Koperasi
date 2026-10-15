import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, AlertCircle, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { KoperasiLogo } from './KoperasiLogo';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}


export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { customerLogin, showToast } = useKoperasi();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      setErrorMessage('Alamat email wajib diisi.');
      return;
    }

    if (!cleanPass) {
      setErrorMessage('Kata sandi wajib diisi.');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage('Login belum tersedia karena Supabase belum dikonfigurasi. Salin .env.example menjadi .env.local, lalu isi URL dan anon key Supabase.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPass,
    });

    if (error || !data.user) {
      setErrorMessage(error?.message === 'Invalid login credentials'
        ? 'Email atau kata sandi salah, atau akun belum terdaftar.'
        : (error?.message || 'Gagal masuk. Silakan coba lagi.'));
      return;
    }

    const metadata = data.user.user_metadata ?? {};
    const displayName = String(metadata.full_name || cleanEmail.split('@')[0]);
    const displayPhone = String(metadata.phone || '');
    customerLogin(displayName, displayPhone, data.user.email || cleanEmail);
    showToast(`Selamat datang, ${displayName}!`);
    if (onSuccess) onSuccess();
    onClose();

  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    const cleanPass = password.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanPass) {
      setErrorMessage('Semua bidang (Nama, Email, WhatsApp, dan Kata Sandi) wajib diisi.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Format email tidak valid. Contoh: nama@gmail.com');
      return;
    }

    if (cleanPhone.length < 8) {
      setErrorMessage('Nomor WhatsApp harus valid untuk keperluan kirim nota otomatis.');
      return;
    }

    if (cleanPass.length < 8) {
      setErrorMessage('Kata sandi minimal 8 karakter.');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage('Pendaftaran belum tersedia karena Supabase belum dikonfigurasi. Salin .env.example menjadi .env.local, lalu isi URL dan anon key Supabase.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPass,
      options: {
        data: { full_name: cleanName, phone: cleanPhone },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (!data.session || !data.user) {
      setErrorMessage('Akun berhasil didaftarkan. Periksa email untuk verifikasi, lalu masuk kembali.');
      setMode('signin');
      return;
    }

    customerLogin(cleanName, cleanPhone, cleanEmail);
    showToast(`Akun berhasil dibuat untuk ${cleanName}.`);
    if (onSuccess) onSuccess();
    onClose();

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-[#FAF8F3] border border-[#D8D3C8] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#20211F] text-[#F5F1E8] flex items-center justify-between">
          <KoperasiLogo variant="light" size="sm" showTagline={false} />
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Simple Tab Switcher: Masuk (Email & Password) vs Daftar (Lengkap dengan WhatsApp) */}
          <div className="flex bg-[#E8E2D3] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white text-[#20211F] shadow-xs'
                  : 'text-[#20211F]/60 hover:text-[#20211F]'
              }`}
            >
              Masuk (Email)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#20211F] shadow-xs'
                  : 'text-[#20211F]/60 hover:text-[#20211F]'
              }`}
            >
              Daftar
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="font-display font-extrabold text-2xl text-[#20211F]">
              {mode === 'signin' ? 'Masuk Akun' : 'Daftar Akun Baru'}
            </h2>
            <p className="text-xs text-[#20211F]/65 leading-relaxed">
              {mode === 'signin'
                ? 'Gunakan alamat email dan kata sandi Anda untuk masuk.'
                : 'Daftarkan nama, email, dan WhatsApp Anda untuk verifikasi & nota otomatis.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Masuk: Email & Kata Sandi */}
          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#20211F] mb-1.5">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#20211F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-white border border-[#D8D3C8] rounded-xl focus:outline-none focus:border-[#20211F] text-[#20211F] shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#20211F] mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#20211F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-white border border-[#D8D3C8] rounded-xl focus:outline-none focus:border-[#20211F] text-[#20211F] shadow-2xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#A8D83E] hover:bg-[#96C432] active:scale-[0.98] text-[#20211F] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-mono mt-2"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Form Daftar: Nama, Email, WhatsApp (untuk verifikasi & nota), Password */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#20211F] mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#20211F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-xl focus:outline-none focus:border-[#20211F] text-[#20211F] shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#20211F] mb-1">
                  Alamat Email (Untuk Login)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#20211F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-xl focus:outline-none focus:border-[#20211F] text-[#20211F] shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#20211F]">
                    Nomor WhatsApp
                  </label>
                  <span className="text-[10px] text-emerald-700 font-mono font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verifikasi & Nota
                  </span>
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#20211F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-xl focus:outline-none focus:border-[#20211F] text-[#20211F] font-mono shadow-2xs"
                  />
                </div>
                <p className="text-[10px] text-[#20211F]/60 mt-1">
                  Nomor ini hanya digunakan untuk verifikasi pesanan dan mengirimkan nota otomatis.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#20211F] mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#20211F]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Buat kata sandi baru"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-xl focus:outline-none focus:border-[#20211F] text-[#20211F] shadow-2xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#20211F] hover:bg-[#2A2C29] active:scale-[0.98] text-[#A8D83E] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-mono mt-2"
              >
                <span>Daftar & Masuk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="text-center pt-1">
            <span className="text-[11px] text-[#20211F]/50">
              {mode === 'signin' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            </span>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setErrorMessage(null);
              }}
              className="text-[11px] font-bold text-[#20211F] underline cursor-pointer"
            >
              {mode === 'signin' ? 'Daftar di sini' : 'Masuk sekarang'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
