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
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS, OUTLET_DATA } from '../data/initialData';

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
  adminLogin: (email: string, passOrPin: string) => boolean;
  adminLogout: () => void;

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
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('koperasi_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
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
      return saved ? JSON.parse(saved) : [];
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
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('koperasi_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

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

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem('koperasi_admin_session', JSON.stringify(adminUser));
      } else {
        localStorage.removeItem('koperasi_admin_session');
      }
    } catch (e) {
      console.error(e);
    }
  }, [adminUser]);

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

  // Admin login must be handled by Supabase Auth + a server/database role check.
  // Do not ship hard-coded passwords or PINs in browser JavaScript.
  const adminLogin = (_email: string, _passOrPin: string): boolean => {
    showToast('Login admin belum dikonfigurasi. Hubungkan Supabase Auth dan role staff terlebih dahulu.');
    return false;
  };

  const adminLogout = () => {
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
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    if (activeReceiptOrder && activeReceiptOrder.id === orderId) {
      setActiveReceiptOrder((prev) => (prev ? { ...prev, orderStatus: status } : null));
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
