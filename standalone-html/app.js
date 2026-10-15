// ========================================================
// KOPERASI COFFEE - SHARED JAVASCRIPT LOGIC
// (Bisa dibuka dan dipelajari di VS Code tanpa Node.js)
// ========================================================

// 1. Inisialisasi State (Keranjang & Pengguna)
let cart = [];
let currentUser = null;

// Jalankan saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  loadUserFromStorage();
  loadCartFromStorage();
});

// 2. Tambah Produk ke Keranjang
function addToCart(id, name, price, img) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, img, qty: 1 });
  }
  saveCartToStorage();
  renderCart();
  toggleCartDrawer(true);
}

// 3. Ubah Jumlah Item (+ / -)
function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCartToStorage();
  renderCart();
}

// 4. Render Tampilan Keranjang
function renderCart() {
  const listEl = document.getElementById('cartItemList');
  const totalEl = document.getElementById('cartTotalPrice');
  const navCountEl = document.getElementById('cartNavCount');
  const btnCheckout = document.getElementById('btnCheckout');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (navCountEl) navCountEl.innerText = totalCount + ' Pesanan';
  if (totalEl) totalEl.innerText = 'Rp ' + totalPrice.toLocaleString('id-ID');

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = '<p class="text-center text-zinc-500 text-sm py-12">Keranjang Anda masih kosong.<br>Pilih menu favorit untuk mulai memesan!</p>';
    if (btnCheckout) btnCheckout.disabled = true;
    return;
  }

  if (btnCheckout) btnCheckout.disabled = false;
  listEl.innerHTML = cart.map(item => `
    <div class="flex items-center justify-between p-3 rounded-xl bg-[#F5F1E8] border border-[#E6DFD3]">
      <div class="flex items-center gap-3">
        <img src="${item.img}" class="w-12 h-12 rounded-lg object-cover">
        <div>
          <h4 class="font-bold text-xs text-[#20211F]">${item.name}</h4>
          <span class="font-mono text-xs text-zinc-600">Rp ${(item.price).toLocaleString('id-ID')}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="updateQty('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-white border border-[#E6DFD3] flex items-center justify-center font-bold text-xs hover:bg-[#20211F] hover:text-white transition-colors">-</button>
        <span class="font-mono text-xs font-bold px-1">${item.qty}</span>
        <button onclick="updateQty('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-white border border-[#E6DFD3] flex items-center justify-center font-bold text-xs hover:bg-[#20211F] hover:text-white transition-colors">+</button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 5. Buka / Tutup Drawer Keranjang
function toggleCartDrawer(forceOpen = null) {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  if (forceOpen === true) {
    drawer.classList.remove('hidden');
    drawer.classList.add('flex');
  } else if (forceOpen === false) {
    drawer.classList.add('hidden');
    drawer.classList.remove('flex');
  } else {
    drawer.classList.toggle('hidden');
    drawer.classList.toggle('flex');
  }
  if (window.lucide) lucide.createIcons();
}

// 6. Modal Login Pelanggan (Email & Password, WhatsApp hanya untuk Registrasi & Nota)
function toggleAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
  if (window.lucide) lucide.createIcons();
}

function switchAuthTab(mode) {
  const signinForm = document.getElementById('signinForm');
  const signupForm = document.getElementById('signupForm');
  const tabSigninBtn = document.getElementById('tabSigninBtn');
  const tabSignupBtn = document.getElementById('tabSignupBtn');

  if (mode === 'signin') {
    signinForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    tabSigninBtn.classList.add('bg-white', 'text-[#20211F]');
    tabSigninBtn.classList.remove('text-[#20211F]/60');
    tabSignupBtn.classList.remove('bg-white', 'text-[#20211F]');
    tabSignupBtn.classList.add('text-[#20211F]/60');
  } else {
    signinForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    tabSignupBtn.classList.add('bg-white', 'text-[#20211F]');
    tabSignupBtn.classList.remove('text-[#20211F]/60');
    tabSigninBtn.classList.remove('bg-white', 'text-[#20211F]');
    tabSigninBtn.classList.add('text-[#20211F]/60');
  }
}

// Handle Login (Hanya Email & Password)
function handleSignInSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('userEmail').value.trim().toLowerCase();
  const pass = document.getElementById('userPass').value.trim();

  let registered = {};
  try {
    registered = JSON.parse(localStorage.getItem('koperasi_users_v2') || '{}');
  } catch {}

  const user = registered[email];
  if (user && user.pass === pass) {
    currentUser = user;
    saveUserToStorage();
    updateUserUI();
    toggleAuthModal();
    return;
  }

  // Jika akun belum terdaftar, buat akun cepat
  const fallbackName = email.split('@')[0];
  const capitalized = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
  currentUser = {
    name: capitalized,
    email: email,
    phone: '08123456789',
    pass: pass
  };
  registered[email] = currentUser;
  localStorage.setItem('koperasi_users_v2', JSON.stringify(registered));

  saveUserToStorage();
  updateUserUI();
  toggleAuthModal();
}

// Handle Registrasi (Nama, Email, WhatsApp untuk verifikasi nota, Password)
function handleSignUpSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const phone = document.getElementById('regPhone').value.trim();
  const pass = document.getElementById('regPass').value.trim();

  let registered = {};
  try {
    registered = JSON.parse(localStorage.getItem('koperasi_users_v2') || '{}');
  } catch {}

  currentUser = { name, email, phone, pass };
  registered[email] = currentUser;
  localStorage.setItem('koperasi_users_v2', JSON.stringify(registered));

  saveUserToStorage();
  updateUserUI();
  toggleAuthModal();
}

function updateUserUI() {
  const statusEl = document.getElementById('userStatusText');
  if (statusEl && currentUser) {
    statusEl.innerText = currentUser.name || currentUser.email;
  }
}

// 7. Checkout & QRIS
function openCheckoutModal() {
  toggleCartDrawer(false);
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const qrisText = document.getElementById('qrisAmountText');
  if (qrisText) qrisText.innerText = 'Rp ' + totalPrice.toLocaleString('id-ID');

  // Pre-fill user data jika sudah login
  if (currentUser) {
    const nameInput = document.getElementById('orderCustomerName');
    const phoneInput = document.getElementById('orderPhone');
    if (nameInput && !nameInput.value) nameInput.value = currentUser.name || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || '';
  }

  if (window.lucide) lucide.createIcons();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// 8. Selesai Bayar & Tampilkan Nota Termal Otomatis
function processPaymentSuccess() {
  const custName = (document.getElementById('orderCustomerName')?.value.trim()) || (currentUser?.name) || 'Pelanggan Koperasi';
  const orderType = document.getElementById('orderType')?.value || 'Dine In (Meja)';
  const orderTable = (document.getElementById('orderTable')?.value.trim()) || '04';
  const orderPhone = (document.getElementById('orderPhone')?.value.trim()) || (currentUser?.phone) || '08123456789';

  closeCheckoutModal();

  const randomId = '#KOP-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Render detail struk
  const idEl = document.getElementById('receiptId');
  const dateEl = document.getElementById('receiptDate');
  const custEl = document.getElementById('receiptCustomer');
  const tableEl = document.getElementById('receiptTable');
  const phoneEl = document.getElementById('receiptPhone');
  const totalEl = document.getElementById('receiptTotal');
  const itemsEl = document.getElementById('receiptItems');

  if (idEl) idEl.innerText = randomId;
  if (dateEl) dateEl.innerText = now;
  if (custEl) custEl.innerText = custName;
  if (tableEl) tableEl.innerText = orderType + ' (' + orderTable + ')';
  if (phoneEl) phoneEl.innerText = orderPhone;
  if (totalEl) totalEl.innerText = 'Rp ' + totalPrice.toLocaleString('id-ID');

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="flex justify-between">
        <span>${item.name} x${item.qty}</span>
        <span>Rp ${(item.price * item.qty).toLocaleString('id-ID')}</span>
      </div>
    `).join('');
  }

  // Siapkan tautan WhatsApp otomatis
  const waBtn = document.getElementById('waSendBtn');
  if (waBtn) {
    const textMsg = encodeURIComponent(
      `🧾 *NOTA KOPERASI COFFEE*\nNo. Pesanan: ${randomId}\nPelanggan: ${custName}\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}\nStatus: LUNAS (QRIS)\nTerima kasih atas kunjungannya!`
    );
    const cleanWa = orderPhone.replace(/[^0-9]/g, '');
    const waFormatted = cleanWa.startsWith('0') ? '62' + cleanWa.slice(1) : cleanWa;
    waBtn.href = `https://wa.me/${waFormatted}?text=${textMsg}`;
  }

  // Kosongkan keranjang
  cart = [];
  saveCartToStorage();
  renderCart();

  // Buka Modal Struk
  const receiptModal = document.getElementById('receiptModal');
  if (receiptModal) {
    receiptModal.classList.remove('hidden');
    receiptModal.classList.add('flex');
  }
  if (window.lucide) lucide.createIcons();
}

function closeReceiptModal() {
  const receiptModal = document.getElementById('receiptModal');
  if (receiptModal) {
    receiptModal.classList.add('hidden');
    receiptModal.classList.remove('flex');
  }
}

// 9. LocalStorage
function saveCartToStorage() {
  try { localStorage.setItem('koperasi_simple_cart', JSON.stringify(cart)); } catch {}
}
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('koperasi_simple_cart');
    if (saved) cart = JSON.parse(saved);
    renderCart();
  } catch {}
}
function saveUserToStorage() {
  try { localStorage.setItem('koperasi_current_user', JSON.stringify(currentUser)); } catch {}
}
function loadUserFromStorage() {
  try {
    const saved = localStorage.getItem('koperasi_current_user');
    if (saved) {
      currentUser = JSON.parse(saved);
      updateUserUI();
    }
  } catch {}
}
