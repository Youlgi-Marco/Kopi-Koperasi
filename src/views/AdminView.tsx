import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ClipboardList,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Search,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { useKoperasi } from '../context/KoperasiContext';
import { Product, OrderStatus } from '../types';

export const AdminView: React.FC = () => {
  const {
    products,
    orders,
    reviews,
    outlet,
    adminUser,
    adminLogout,
    setIsAdminAuthModalOpen,
    updateOrderStatus,
    updateStock,
    updateProduct,
    addProduct,
    deleteProduct,
    toggleReviewApproval,
    deleteReview,
    resetDemoData,
    setCurrentView
  } = useKoperasi();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'stock' | 'reviews' | 'settings'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<'all' | OrderStatus>('all');

  // New product form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'coffee' | 'macchiato' | 'savoury-toast' | 'sweet-toast'>('coffee');
  const [newPrice, setNewPrice] = useState(10000);
  const [newStock, setNewStock] = useState(20);
  const [newDesc, setNewDesc] = useState('');

  // If not authenticated as Admin, show dedicated Staff Gate
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#20211F] text-[#F5F1E8] p-8 rounded-2xl border-2 border-[#20211F] shadow-[6px_6px_0px_0px_#20211F] text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#A8D83E]/20 text-[#A8D83E] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-[#A8D83E]" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#A8D83E] uppercase tracking-widest font-bold">
              AREA KHUSUS OWNER
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase">
              Akses Terkunci
            </h2>
            <p className="text-xs text-[#D8D3C8] leading-relaxed">
              Dashboard ini hanya tersedia untuk akun Supabase dengan role owner. Masuk menggunakan email dan kata sandi akun owner.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsAdminAuthModalOpen(true)}
              className="w-full py-3.5 bg-[#A8D83E] hover:bg-[#96C432] text-[#20211F] font-mono font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Masuk dengan Akun Admin
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-[#D8D3C8] font-mono text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Kembali ke Halaman Toko
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Overview metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus === 'PAID' ? sum + o.total : sum), 0);
  const totalItemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((iSum, it) => iSum + it.quantity, 0),
    0
  );
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const soldOutProducts = products.filter((p) => p.stock <= 0 || !p.available);

  const formattedRevenue = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(totalRevenue).replace('Rp', 'Rp ');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const seriesMap = {
      coffee: 'Coffee Series',
      macchiato: 'Macchiato Series',
      'savoury-toast': 'Savoury Series',
      'sweet-toast': 'Sweet Series'
    };

    const newProd: Product = {
      id: `kpr-custom-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      seriesName: seriesMap[newCategory],
      price: Number(newPrice),
      stock: Number(newStock),
      available: Number(newStock) > 0,
      description: newDesc.trim() || 'Menu racikan segar Koperasi.',
      image: products[0]?.image || ''
    };

    addProduct(newProd);
    setIsAddingProduct(false);
    setNewName('');
    setNewDesc('');
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      available: Number(editingProduct.stock) > 0,
      description: editingProduct.description
    });
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-24 pb-20">
      {/* Admin Subheader Banner */}
      <div className="bg-[#20211F] text-[#F5F1E8] border-b border-[#333532] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A8D83E]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#A8D83E] uppercase">
                OWNER DASHBOARD
              </span>
              <span className="text-[10px] text-white/50 font-mono">
                • {adminUser.name}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl mt-1 text-white">
              Sistem Operasional Koperasi
            </h1>
            <p className="text-xs text-[#D8D3C8] mt-0.5">
              Kelola pesanan kasir, pantau stok realtime, dan atur menu toko.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-[#F5F1E8] text-xs font-mono font-bold rounded transition-colors cursor-pointer"
            >
              ← Ke Toko
            </button>
            <button
              onClick={adminLogout}
              className="px-3.5 py-2 bg-rose-900 hover:bg-rose-800 text-white text-xs font-mono font-bold rounded inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Logout dari Akun Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout Admin</span>
            </button>
            <button
              onClick={resetDemoData}
              className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-[#D8D3C8] text-xs font-mono rounded inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset data produk dan pesanan ke nilai awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#D8D3C8] mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-white text-[#20211F]/70 hover:bg-[#FAF8F3] border border-[#D8D3C8]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ringkasan</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-white text-[#20211F]/70 hover:bg-[#FAF8F3] border border-[#D8D3C8]'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Pesanan Masuk ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stock')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'stock'
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-white text-[#20211F]/70 hover:bg-[#FAF8F3] border border-[#D8D3C8]'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Manajemen Stok</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-white text-[#20211F]/70 hover:bg-[#FAF8F3] border border-[#D8D3C8]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Daftar Produk ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-white text-[#20211F]/70 hover:bg-[#FAF8F3] border border-[#D8D3C8]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ulasan Pelanggan</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#20211F] text-[#A8D83E]'
                : 'bg-white text-[#20211F]/70 hover:bg-[#FAF8F3] border border-[#D8D3C8]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Outlet</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#D8D3C8] rounded-xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#6B4B3E]">
                  <span>TOTAL PESANAN</span>
                  <ClipboardList className="w-4 h-4 text-[#A8D83E]" />
                </div>
                <div className="font-mono text-3xl font-extrabold text-[#20211F] tabular-nums">
                  {totalOrders}
                </div>
                <div className="text-[11px] text-[#20211F]/60">Semua pesanan masuk</div>
              </div>

              <div className="p-5 bg-white border border-[#D8D3C8] rounded-xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#6B4B3E]">
                  <span>PENDAPATAN LUNAS</span>
                  <DollarSign className="w-4 h-4 text-[#A8D83E]" />
                </div>
                <div className="font-mono text-2xl font-extrabold text-[#20211F] tabular-nums">
                  {formattedRevenue}
                </div>
                <div className="text-[11px] text-[#20211F]/60">Terbayar melalui QRIS</div>
              </div>

              <div className="p-5 bg-white border border-[#D8D3C8] rounded-xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#6B4B3E]">
                  <span>PRODUK TERJUAL</span>
                  <TrendingUp className="w-4 h-4 text-[#A8D83E]" />
                </div>
                <div className="font-mono text-3xl font-extrabold text-[#20211F] tabular-nums">
                  {totalItemsSold} porsi
                </div>
                <div className="text-[11px] text-[#20211F]/60">Kopi & toast tersajikan</div>
              </div>

              <div className="p-5 bg-white border border-[#D8D3C8] rounded-xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-700">
                  <span>STOK PERLU PERHATIAN</span>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="font-mono text-3xl font-extrabold text-amber-900 tabular-nums">
                  {lowStockProducts.length + soldOutProducts.length}
                </div>
                <div className="text-[11px] text-[#20211F]/60">
                  {soldOutProducts.length} habis · {lowStockProducts.length} menipis
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white border border-[#D8D3C8] rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#20211F]">
                  Pesanan Terbaru
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-mono font-bold text-[#6B4B3E] hover:text-[#20211F] cursor-pointer"
                >
                  Buka Semua Pesanan →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FAF8F3] border-b border-[#D8D3C8] text-[#6B4B3E]">
                    <tr>
                      <th className="p-3">NO. ORDER</th>
                      <th className="p-3">PELANGGAN</th>
                      <th className="p-3">ITEMS</th>
                      <th className="p-3">TOTAL</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3 text-right">AKSI CEPAT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F1E8]">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF8F3]">
                        <td className="p-3 font-bold text-[#20211F]">{order.id}</td>
                        <td className="p-3">
                          <span className="font-sans font-semibold text-[#20211F]">
                            {order.customerName}
                          </span>
                          <span className="block text-[10px] text-[#20211F]/50">
                            {order.orderType === 'dine_in' ? `Meja ${order.tableNumber}` : 'Takeaway'}
                          </span>
                        </td>
                        <td className="p-3">
                          {order.items.map((it) => `${it.product.name} (${it.quantity})`).join(', ')}
                        </td>
                        <td className="p-3 font-bold tabular-nums">
                          Rp {order.total.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              order.orderStatus === 'waiting_payment'
                                ? 'bg-rose-100 text-rose-800'
                                : order.orderStatus === 'paid'
                                ? 'bg-amber-100 text-amber-800'
                                : order.orderStatus === 'preparing'
                                ? 'bg-blue-100 text-blue-800'
                                : order.orderStatus === 'ready'
                                ? 'bg-[#A8D83E]/40 text-[#20211F]'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {order.orderStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="text-[11px] p-1 bg-white border border-[#D8D3C8] rounded focus:outline-none"
                          >
                            <option value="waiting_payment">Menunggu Pembayaran</option>
                            <option value="paid">Lunas (Antri)</option>
                            <option value="preparing">Diracik</option>
                            <option value="ready">Siap Diambil</option>
                            <option value="completed">Selesai</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INCOMING ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#D8D3C8] rounded-xl p-6 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-[#20211F]">
                  Antrean Pesanan Masuk
                </h3>
                <p className="text-xs text-[#20211F]/60">
                  Ubah status pesanan agar pelanggan dapat memantau secara langsung di nota digital.
                </p>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {(['all', 'waiting_payment', 'paid', 'preparing', 'ready', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded cursor-pointer ${
                      orderFilter === st
                        ? 'bg-[#20211F] text-[#A8D83E]'
                        : 'bg-[#FAF8F3] text-[#20211F]/70 hover:bg-[#E8E2D3]'
                    }`}
                  >
                    {st === 'all' ? 'Semua' : st === 'waiting_payment' ? 'Belum Bayar' : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {orders
                .filter((o) => (orderFilter === 'all' ? true : o.orderStatus === orderFilter))
                .map((order) => (
                  <div
                    key={order.id}
                    className="p-5 border border-[#D8D3C8] rounded-lg bg-[#FAF8F3] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#20211F]">
                          {order.id}
                        </span>
                        <span className="text-xs text-[#6B4B3E]">·</span>
                        <span className="font-semibold text-sm text-[#20211F]">
                          {order.customerName}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-white border border-[#D8D3C8] rounded text-[#6B4B3E]">
                          {order.orderType === 'dine_in' ? `Meja ${order.tableNumber}` : 'Takeaway'}
                        </span>
                      </div>

                      <div className="text-xs text-[#20211F]/80">
                        {order.items.map((it, idx) => (
                          <span key={idx} className="mr-3">
                            • {it.product.name} x{it.quantity}
                            {it.temperatureChoice && ` (${it.temperatureChoice})`}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] font-mono text-[#20211F]/60">
                        Total: <strong className="text-[#20211F]">Rp {order.total.toLocaleString('id-ID')}</strong> · Pembayaran: QRIS ({order.paymentStatus}) · {new Date(order.createdAt).toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateOrderStatus(order.id, 'paid')}
                        className={`px-3 py-1.5 text-xs font-mono font-bold rounded cursor-pointer ${
                          order.orderStatus === 'paid'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-white border border-[#D8D3C8] text-[#20211F]'
                        }`}
                      >
                        Antri
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className={`px-3 py-1.5 text-xs font-mono font-bold rounded cursor-pointer ${
                          order.orderStatus === 'preparing'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white border border-[#D8D3C8] text-[#20211F]'
                        }`}
                      >
                        Diracik
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className={`px-3 py-1.5 text-xs font-mono font-bold rounded cursor-pointer ${
                          order.orderStatus === 'ready'
                            ? 'bg-[#A8D83E] text-[#20211F] font-extrabold shadow-xs'
                            : 'bg-white border border-[#D8D3C8] text-[#20211F]'
                        }`}
                      >
                        Siap
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className={`px-3 py-1.5 text-xs font-mono font-bold rounded cursor-pointer ${
                          order.orderStatus === 'completed'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-[#D8D3C8] text-[#20211F]'
                        }`}
                      >
                        Selesai
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: STOCK MANAGEMENT */}
        {activeTab === 'stock' && (
          <div className="bg-white border border-[#D8D3C8] rounded-xl p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#20211F]">
                Manajemen Stok Realtime
              </h3>
              <p className="text-xs text-[#20211F]/60">
                Ketika stok mencapai 0, produk akan otomatis berubah menjadi "SOLD OUT" di halaman pelanggan dan tombol pesan dinonaktifkan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                const isSoldOut = product.stock <= 0 || !product.available;
                const isLow = product.stock > 0 && product.stock <= 5;

                return (
                  <div
                    key={product.id}
                    className={`p-4 rounded-lg border transition-all ${
                      isSoldOut
                        ? 'bg-rose-50/60 border-rose-200'
                        : isLow
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-white border-[#D8D3C8]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#6B4B3E] uppercase">
                          {product.seriesName}
                        </span>
                        <h4 className="font-display font-bold text-sm text-[#20211F]">
                          {product.name}
                        </h4>
                        <span className="font-mono text-xs text-[#20211F]/70">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>

                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
                          isSoldOut
                            ? 'bg-rose-600 text-white'
                            : isLow
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isSoldOut ? 'Sold Out' : isLow ? 'Low Stock' : 'Tersedia'}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D8D3C8]/60 flex items-center justify-between">
                      <span className="text-xs font-mono text-[#20211F]/70">
                        Stok: <strong className="text-[#20211F] text-sm tabular-nums">{product.stock}</strong>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateStock(product.id, product.stock - 5)}
                          className="px-2 py-1 text-xs font-mono bg-[#FAF8F3] hover:bg-[#E8E2D3] border border-[#D8D3C8] rounded cursor-pointer"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => updateStock(product.id, product.stock - 1)}
                          className="px-2 py-1 text-xs font-mono bg-[#FAF8F3] hover:bg-[#E8E2D3] border border-[#D8D3C8] rounded cursor-pointer"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => updateStock(product.id, product.stock + 1)}
                          className="px-2 py-1 text-xs font-mono bg-[#A8D83E] text-[#20211F] font-bold rounded cursor-pointer"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => updateStock(product.id, product.stock + 10)}
                          className="px-2 py-1 text-xs font-mono bg-[#20211F] text-[#A8D83E] font-bold rounded cursor-pointer"
                        >
                          +10
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <div className="bg-white border border-[#D8D3C8] rounded-xl p-6 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-[#20211F]">
                  Daftar Produk Koperasi
                </h3>
                <p className="text-xs text-[#20211F]/60">
                  Tambah produk baru, sesuaikan harga, atau ubah rincian menu.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#20211F]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F3] border border-[#D8D3C8] rounded focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="px-4 py-2 bg-[#20211F] text-[#A8D83E] hover:bg-[#2A2C29] text-xs font-mono font-bold rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Produk</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#FAF8F3] border-b border-[#D8D3C8] text-[#6B4B3E]">
                  <tr>
                    <th className="p-3">PRODUK</th>
                    <th className="p-3">KATEGORI</th>
                    <th className="p-3">HARGA</th>
                    <th className="p-3">STOK</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F1E8]">
                  {products
                    .filter((p) =>
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.seriesName.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF8F3]">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded bg-[#FAF8F3]"
                            />
                            <div>
                              <span className="font-sans font-bold text-sm text-[#20211F] block">
                                {prod.name}
                              </span>
                              {prod.bestSeller && (
                                <span className="text-[9px] text-[#A8D83E] bg-[#20211F] px-1.5 py-0.2 rounded font-bold">
                                  BEST SELLER
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-[#6B4B3E] font-medium">{prod.seriesName}</td>
                        <td className="p-3 font-bold tabular-nums">
                          Rp {prod.price.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 tabular-nums font-bold">
                          {prod.stock}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.stock > 0 && prod.available
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {prod.stock > 0 && prod.available ? 'AKTIF' : 'SOLD OUT'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(prod)}
                              className="p-1 text-[#20211F]/70 hover:text-[#6B4B3E] cursor-pointer"
                              title="Edit Produk"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1 text-[#20211F]/70 hover:text-rose-600 cursor-pointer"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="bg-white border border-[#D8D3C8] rounded-xl p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#20211F]">
                Moderasi Ulasan Pelanggan
              </h3>
              <p className="text-xs text-[#20211F]/60">
                Kelola ulasan yang tampil di halaman utama dan halaman review pelanggan.
              </p>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    rev.approved ? 'bg-white border-[#D8D3C8]' : 'bg-stone-50 border-stone-300 opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-sm text-[#20211F]">
                        {rev.author}
                      </span>
                      <span className="text-xs text-[#6B4B3E]">·</span>
                      <span className="text-xs font-mono font-bold text-amber-600">
                        ★ {rev.rating} / 5
                      </span>
                      {rev.favoriteItem && (
                        <span className="text-[10px] font-mono bg-[#F5F1E8] px-2 py-0.5 rounded text-[#6B4B3E]">
                          {rev.favoriteItem}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#20211F]/80 italic">"{rev.comment}"</p>
                    <span className="text-[10px] font-mono text-[#20211F]/50 block">
                      {rev.date} · Status: {rev.approved ? 'Ditampilkan' : 'Disembunyikan'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReviewApproval(rev.id)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded flex items-center gap-1.5 cursor-pointer ${
                        rev.approved
                          ? 'bg-[#20211F] text-[#A8D83E]'
                          : 'bg-[#FAF8F3] border border-[#D8D3C8] text-[#20211F]'
                      }`}
                    >
                      {rev.approved ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{rev.approved ? 'Sembunyikan' : 'Tampilkan'}</span>
                    </button>
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                      title="Hapus Ulasan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#D8D3C8] rounded-xl p-6 shadow-2xs space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#20211F]">
                Informasi & Pengaturan Outlet
              </h3>
              <p className="text-xs text-[#20211F]/60">
                Data outlet yang ditampilkan ke publik di header, peta, dan nota digital.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block font-bold text-[#20211F] mb-1">NAMA TOKO</label>
                <input
                  type="text"
                  disabled
                  value={outlet.name}
                  className="w-full p-2 bg-[#FAF8F3] border border-[#D8D3C8] rounded text-[#20211F]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#20211F] mb-1">TAGLINE</label>
                <input
                  type="text"
                  disabled
                  value={outlet.tagline}
                  className="w-full p-2 bg-[#FAF8F3] border border-[#D8D3C8] rounded text-[#20211F]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#20211F] mb-1">ALAMAT LENGKAP</label>
                <input
                  type="text"
                  disabled
                  value={outlet.address}
                  className="w-full p-2 bg-[#FAF8F3] border border-[#D8D3C8] rounded text-[#20211F]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#20211F] mb-1">JAM OPERASIONAL</label>
                <input
                  type="text"
                  disabled
                  value={outlet.operatingHours}
                  className="w-full p-2 bg-[#FAF8F3] border border-[#D8D3C8] rounded text-[#20211F]"
                />
              </div>

              <div className="pt-4 border-t border-[#D8D3C8]">
                <button
                  onClick={resetDemoData}
                  className="px-4 py-2.5 bg-rose-700 text-white font-bold rounded flex items-center gap-2 cursor-pointer hover:bg-rose-800"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Semua Data Toko ke Nilai Default</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add New Product */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F3] border border-[#D8D3C8] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-[#20211F]">
              Tambah Menu Baru
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Nama Menu</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Kopi Susu Pandan"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 bg-white border border-[#D8D3C8] rounded"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2 bg-white border border-[#D8D3C8] rounded"
                >
                  <option value="coffee">Coffee Series</option>
                  <option value="macchiato">Macchiato Series</option>
                  <option value="savoury-toast">Savoury Toast</option>
                  <option value="sweet-toast">Sweet Toast</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#D8D3C8] rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Stok Awal</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#D8D3C8] rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2 bg-white border border-[#D8D3C8] rounded"
                  placeholder="Ceritakan rasa khasnya..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 border border-[#D8D3C8] rounded text-[#20211F]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#A8D83E] text-[#20211F] font-bold rounded"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Product */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F3] border border-[#D8D3C8] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-[#20211F]">
              Edit Produk: {editingProduct.name}
            </h3>
            <form onSubmit={handleSaveEditProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Nama Menu</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2 bg-white border border-[#D8D3C8] rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                    }
                    className="w-full p-2 bg-white border border-[#D8D3C8] rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Stok</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
                    }
                    className="w-full p-2 bg-white border border-[#D8D3C8] rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Deskripsi</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full p-2 bg-white border border-[#D8D3C8] rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-[#D8D3C8] rounded text-[#20211F]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#A8D83E] text-[#20211F] font-bold rounded"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
