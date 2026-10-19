import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Review,
  OutletInfo,
  ProductCategory,
  OrderStatus,
  CustomerUser,
  AdminUser
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  OUTLET_DATA,
  repairLegacyProductImage
} from '../data/initialData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface CheckoutDetails {
  customerName?: string;
  orderType: 'dine_in' | 'takeaway';
  tableNumber?: string;
  customerPhone?: string;
  notes?: string;
}

interface KoperasiContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  reviews: Review[];
  outlet: OutletInfo;
  currentView: 'home' | 'menu' | 'about' | 'outlet' | 'review' | 'admin';
  setCurrentView: (view: 'home' | 'menu' | 'about' | 'outlet' | 'review' | 'admin') => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeModalProduct: Product | null;
  setActiveModalProduct: (p: Product | null) => void;
  activeReceiptOrder: Order | null;
  setActiveReceiptOrder: (o: Order | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Separate Accounts
  customerUser: CustomerUser | null;
  adminUser: AdminUser | null;
  isCustomerAuthModalOpen: boolean;
  setIsCustomerAuthModalOpen: (open: boolean) => void;
  isAdminAuthModalOpen: boolean;
  setIsAdminAuthModalOpen: (open: boolean) => void;

  customerLogin: (name: string, phone: string, email?: string, defaultTable?: string) => void;
  customerLogout: () => void;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => Promise<void>;

  // Cart
  addToCart: (product: Product, quantity?: number, notes?: string, temperatureChoice?: 'iced' | 'hot') => boolean;
  updateQuantity: (productId: string, delta: number, temperatureChoice?: 'iced' | 'hot') => void;
  removeFromCart: (productId: string, temperatureChoice?: 'iced' | 'hot') => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Order
  placeOrder: (details: CheckoutDetails) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Admin Management
  updateStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  toggleReviewApproval: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
  addReview: (author: string, rating: number, comment: string, favoriteItem?: string) => void;
  resetDemoData: () => void;
}

const KoperasiContext = createContext<KoperasiContextType | undefined>(undefined);

export const KoperasiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted products or fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('koperasi_products');
      return saved
        ? (JSON.parse(saved) as Product[]).map(repairLegacyProductImage)
        : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('koperasi_orders');
      return saved
        ? (JSON.parse(saved) as Order[]).map(order => ({
            ...order,
            items: order.items.map(item => ({
              ...item,
              product: repairLegacyProductImage(item.product)
            }))
          }))
        : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('koperasi_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('koperasi_cart');
      return saved
        ? (JSON.parse(saved) as CartItem[]).map(item => ({
            ...item,
            product: repairLegacyProductImage(item.product)
          }))
        : [];
    } catch {
      return [];
    }
  });

  // Separate Customer Session
  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('koperasi_customer_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Separate Admin Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [outlet] = useState<OutletInfo>(OUTLET_DATA);
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'about' | 'outlet' | 'review' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isCustomerAuthModalOpen, setIsCustomerAuthModalOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('koperasi_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('koperasi_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('koperasi_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('koperasi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (customerUser) {
        localStorage.setItem('koperasi_customer_session', JSON.stringify(customerUser));
      } else {
        localStorage.removeItem('koperasi_customer_session');
      }
    } catch (e) {
      console.error(e);
    }
  }, [customerUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  // Customer Auth
  const customerLogin = (name: string, phone: string, email?: string, defaultTable?: string) => {
    const user: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: name.trim() || 'Sahabat Koperasi',
      phone: phone.trim() || '08123456789',
      email: email?.trim(),
      defaultTable: defaultTable?.trim() || '04',
      joinedAt: new Date().toLocaleDateString('id-ID')
    };
    setCustomerUser(user);
    setIsCustomerAuthModalOpen(false);
    showToast(`Selamat datang kembali, ${user.name}!`);
  };

  const customerLogout = () => {
    setCustomerUser(null);
    showToast('Kamu telah keluar dari akun pelanggan.');
  };

  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) {
      setAdminUser(null);
      return;
    }

    let isMounted = true;
    const syncAdminUser = async (user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null) => {
      if (!user) {
        if (isMounted) setAdminUser(null);
        return;
      }

      const { data: profile, error } = await client
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Unable to verify the signed-in admin role.', error);
        if (isMounted) setAdminUser(null);
        return;
      }

      if (isMounted && profile?.role === 'owner') {
        const metadataName = user.user_metadata?.full_name;
        setAdminUser({
          id: user.id,
          email: user.email || '',
          name: profile.full_name || (typeof metadataName === 'string' ? metadataName : '') || user.email?.split('@')[0] || 'Owner',
          role: 'owner'
        });
      } else if (isMounted) {
        setAdminUser(null);
      }
    };

    void client.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Unable to restore the Supabase session.', error);
        if (isMounted) setAdminUser(null);
        return;
      }
      return syncAdminUser(data.session?.user ?? null);
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        void syncAdminUser(session?.user ?? null);
      }, 0);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const adminLogin = async (email: string, password: string): Promise<void> => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase belum dikonfigurasi. Atur VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });

    if (error || !data.user) {
      throw new Error(error?.message === 'Invalid login credentials'
        ? 'Email atau kata sandi salah.'
        : error?.message || 'Gagal masuk. Silakan coba lagi.');
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Tidak dapat memeriksa role akun: ${profileError.message}`);
    }

    if (profile?.role !== 'owner') {
      setAdminUser(null);
      throw new Error('Akun ini belum diberi role owner. Hubungi pemilik untuk mengaktifkan akses admin.');
    }

    const metadataName = data.user.user_metadata?.full_name;
    const user: AdminUser = {
      id: data.user.id,
      email: data.user.email || email.trim(),
      name: profile.full_name || (typeof metadataName === 'string' ? metadataName : '') || email.trim().split('@')[0],
      role: 'owner'
    };

    setAdminUser(user);
    setIsAdminAuthModalOpen(false);
    setCurrentView('admin');
    showToast(`Selamat datang, ${user.name}.`);
  };

  const adminLogout = async (): Promise<void> => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Unable to sign out of Supabase.', error);
        showToast('Gagal logout. Silakan coba lagi.');
        return;
      }
    }
    setAdminUser(null);
    setCurrentView('home');
    showToast('Anda telah logout dari mode Staff & Admin.');
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    notes?: string,
    temperatureChoice?: 'iced' | 'hot'
  ): boolean => {
    const currentProd = products.find((p) => p.id === product.id) || product;
    if (currentProd.stock <= 0 || !currentProd.available) {
      showToast(`${product.name} saat ini sedang habis (Sold Out).`);
      return false;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.temperatureChoice === temperatureChoice
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > currentProd.stock) {
          showToast(`Maksimal ${currentProd.stock} porsi tersedia.`);
          updated[existingIndex].quantity = currentProd.stock;
        } else {
          updated[existingIndex].quantity = newQty;
          if (notes) updated[existingIndex].notes = notes;
        }
        return updated;
      } else {
        const finalQty = Math.min(quantity, currentProd.stock);
        return [...prevCart, { product: currentProd, quantity: finalQty, notes, temperatureChoice }];
      }
    });

    showToast(`Ditambahkan: ${product.name} (${quantity})`);
    return true;
  };

  const updateQuantity = (
    productId: string,
    delta: number,
    temperatureChoice?: 'iced' | 'hot'
  ) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          const isTarget =
            item.product.id === productId &&
            (!temperatureChoice || item.temperatureChoice === temperatureChoice);

          if (isTarget) {
            const nextQty = item.quantity + delta;
            const currentStock = products.find((p) => p.id === productId)?.stock ?? item.product.stock;
            if (nextQty > currentStock) {
              showToast(`Maksimal stok tercapai (${currentStock})`);
              return item;
            }
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, temperatureChoice?: 'iced' | 'hot') => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!temperatureChoice || item.temperatureChoice === temperatureChoice)
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (details: CheckoutDetails): Order => {
    const newOrderId = `KPR-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`}`;
    const newOrder: Order = {
      id: newOrderId,
      customerId: customerUser?.id,
      customerName: details.customerName || customerUser?.name || 'Tamu Koperasi',
      orderType: details.orderType,
      tableNumber: details.orderType === 'dine_in' ? details.tableNumber || customerUser?.defaultTable || '01' : undefined,
      customerPhone: details.customerPhone || customerUser?.phone,
      items: [...cart],
      subtotal: cartTotal,
      tax: 0,
      total: cartTotal,
      paymentMethod: 'QRIS',
      paymentStatus: 'UNPAID',
      orderStatus: 'waiting_payment',
      createdAt: new Date().toISOString()
    };

    // Do not deduct stock or mark payment as paid in the browser. A trusted backend
    // must verify payment and atomically reserve/decrement stock before fulfillment.

    setOrders((prev) => [newOrder, ...prev]);
    setActiveReceiptOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId
        ? { ...o, orderStatus: status, paymentStatus: status === 'paid' ? 'PAID' : o.paymentStatus }
        : o))
    );
    if (activeReceiptOrder && activeReceiptOrder.id === orderId) {
      setActiveReceiptOrder((prev) => (prev
        ? { ...prev, orderStatus: status, paymentStatus: status === 'paid' ? 'PAID' : prev.paymentStatus }
        : null));
    }
  };

  const updateStock = (productId: string, newStock: number) => {
    const clampedStock = Math.max(0, newStock);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stock: clampedStock,
              available: clampedStock > 0
            }
          : p
      )
    );
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Produk baru ${product.name} berhasil ditambahkan.`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Produk berhasil dihapus.');
  };

  const toggleReviewApproval = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, approved: !r.approved } : r))
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    showToast('Ulasan dihapus.');
  };

  const addReview = (author: string, rating: number, comment: string, favoriteItem?: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim() || customerUser?.name || 'Sahabat Koperasi',
      rating,
      comment: comment.trim(),
      date: 'Baru saja',
      approved: true,
      favoriteItem
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Terima kasih! Ulasanmu telah diterbitkan.');
  };

  const resetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReviews(INITIAL_REVIEWS);
    setCart([]);
    showToast('Data demo berhasil di-reset ke default.');
  };

  return (
    <KoperasiContext.Provider
      value={{
        products,
        cart,
        orders,
        reviews,
        outlet,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        isCartOpen,
        setIsCartOpen,
        activeModalProduct,
        setActiveModalProduct,
        activeReceiptOrder,
        setActiveReceiptOrder,
        toastMessage,
        showToast,
        customerUser,
        adminUser,
        isCustomerAuthModalOpen,
        setIsCustomerAuthModalOpen,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        customerLogin,
        customerLogout,
        adminLogin,
        adminLogout,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        updateOrderStatus,
        updateStock,
        updateProduct,
        addProduct,
        deleteProduct,
        toggleReviewApproval,
        deleteReview,
        addReview,
        resetDemoData
      }}
    >
      {children}
    </KoperasiContext.Provider>
  );
};

export const useKoperasi = () => {
  const context = useContext(KoperasiContext);
  if (!context) {
    throw new Error('useKoperasi must be used within a KoperasiProvider');
  }
  return context;
};
