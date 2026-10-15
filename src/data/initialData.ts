import { Product, Review, OutletInfo, Order } from '../types';

export const HERO_COFFEE_IMAGE = '/src/assets/images/hero_coffee_iced_1792080845068.jpg';
export const HERO_BANNER_EXACT = '/src/assets/images/hero_koperasi_banner_1792083690462.jpg';
export const CAFE_INTERIOR_IMAGE = '/src/assets/images/cafe_interior_koperasi_1792080846798.jpg';
export const TOAST_SAVOURY_IMAGE = '/src/assets/images/toast_savoury_hero_1792080846888.jpg';
export const TOAST_SWEET_IMAGE = '/src/assets/images/toast_sweet_hero_1792080846738.jpg';
export const DRINK_AMERICANO_IMAGE = '/src/assets/images/drink_iced_americano_1792080906478.jpg';
export const DRINK_MACCHIATO_IMAGE = '/src/assets/images/drink_macchiato_layer_1792080905949.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // COFFEE SERIES
  {
    id: 'kpr-cof-01',
    name: 'Caffè Latte',
    category: 'coffee',
    seriesName: 'Coffee Series',
    price: 8000,
    description: 'Espresso robusta-arabica blend lokal dengan susu segar yang lembut dan creamy, disajikan dingin menyegarkan.',
    stock: 24,
    available: true,
    bestSeller: true,
    image: HERO_COFFEE_IMAGE,
    temperature: 'both',
    portionNote: 'Cup 14oz'
  },
  {
    id: 'kpr-cof-02',
    name: 'Americano',
    category: 'coffee',
    seriesName: 'Coffee Series',
    price: 5000,
    description: 'Double shot espresso murni dengan air dingin dan es kristal. Rasa kopi yang tegas, bersih, dan tanpa gula.',
    stock: 30,
    available: true,
    bestSeller: true,
    image: DRINK_AMERICANO_IMAGE,
    temperature: 'both',
    portionNote: 'Cup 14oz'
  },
  {
    id: 'kpr-cof-03',
    name: 'Vanilla Latte',
    category: 'coffee',
    seriesName: 'Coffee Series',
    price: 9000,
    description: 'Kombinasi harumnya sirup vanilla madu dengan espresso khas Koperasi dan susu segar yang lembut.',
    stock: 18,
    available: true,
    bestSeller: false,
    image: HERO_COFFEE_IMAGE,
    temperature: 'both',
    portionNote: 'Cup 14oz'
  },
  {
    id: 'kpr-cof-04',
    name: 'Gula Aren',
    category: 'coffee',
    seriesName: 'Coffee Series',
    price: 10000,
    description: 'Kopi susu andalan tongkrongan dengan gula aren cair organik asal Lebak yang legit dan gurih mantap.',
    stock: 28,
    available: true,
    bestSeller: true,
    image: HERO_COFFEE_IMAGE,
    temperature: 'both',
    portionNote: 'Cup 14oz'
  },
  {
    id: 'kpr-cof-05',
    name: 'Hazelnut',
    category: 'coffee',
    seriesName: 'Coffee Series',
    price: 10000,
    description: 'Perpaduan nutty gurih kacang hazelnut panggang dengan espresso berkarakter cokelat caramel.',
    stock: 15,
    available: true,
    bestSeller: false,
    image: HERO_COFFEE_IMAGE,
    temperature: 'both',
    portionNote: 'Cup 14oz'
  },
  {
    id: 'kpr-cof-06',
    name: 'Caramel',
    category: 'coffee',
    seriesName: 'Coffee Series',
    price: 10000,
    description: 'Latte susu lembut berpadu sirup karamel bakar keemasan yang manis legit menggugah selera.',
    stock: 14,
    available: true,
    bestSeller: false,
    image: HERO_COFFEE_IMAGE,
    temperature: 'both',
    portionNote: 'Cup 14oz'
  },

  // MACCHIATO SERIES
  {
    id: 'kpr-mac-01',
    name: 'Caramel Macchiato',
    category: 'macchiato',
    seriesName: 'Macchiato Series',
    price: 15000,
    description: 'Lapisan susu dingin, espresso shot pekat, serta busa lembut dengan saus drizzle karamel gurih di atasnya.',
    stock: 12,
    available: true,
    bestSeller: true,
    image: DRINK_MACCHIATO_IMAGE,
    temperature: 'iced',
    portionNote: 'Layered cup 16oz'
  },
  {
    id: 'kpr-mac-02',
    name: 'Butterscotch Macchiato',
    category: 'macchiato',
    seriesName: 'Macchiato Series',
    price: 15000,
    description: 'Macchiato istimewa dengan butterscotch brown butter, remahan biskuit karamel di atas busa susu yang padat.',
    stock: 16,
    available: true,
    bestSeller: true,
    image: DRINK_MACCHIATO_IMAGE,
    temperature: 'iced',
    portionNote: 'Layered cup 16oz'
  },
  {
    id: 'kpr-mac-03',
    name: 'Hazelnut Macchiato',
    category: 'macchiato',
    seriesName: 'Macchiato Series',
    price: 15000,
    description: 'Kopi macchiato berlapis rasa roasted hazelnut dengan taburan serbuk cokelat murni di atas foam lembut.',
    stock: 9,
    available: true,
    bestSeller: false,
    image: DRINK_MACCHIATO_IMAGE,
    temperature: 'iced',
    portionNote: 'Layered cup 16oz'
  },

  // SAVOURY TOAST SERIES
  {
    id: 'kpr-tst-s01',
    name: 'Ham and Cheese',
    category: 'savoury-toast',
    seriesName: 'Savoury Series',
    price: 10000,
    description: 'Roti brioche panggang garing mentega diisi smoked beef ham gurih, keju leleh, dan saus mayones racikan khusus.',
    stock: 15,
    available: true,
    bestSeller: false,
    image: TOAST_SAVOURY_IMAGE,
    portionNote: 'Crispy Brioche Box'
  },
  {
    id: 'kpr-tst-s02',
    name: 'Beef Blackpepper',
    category: 'savoury-toast',
    seriesName: 'Savoury Series',
    price: 12000,
    description: 'Daging sapi cincang lada hitam beraroma wangi pedas gurih, selada segar, dan keju melted yang melimpah.',
    stock: 10,
    available: true,
    bestSeller: true,
    image: TOAST_SAVOURY_IMAGE,
    portionNote: 'Crispy Brioche Box'
  },
  {
    id: 'kpr-tst-s03',
    name: 'Beef Gojuchang',
    category: 'savoury-toast',
    seriesName: 'Savoury Series',
    price: 12000,
    description: 'Daging sapi tumis saus gochujang khas Korea dengan sensasi pedas manis, taburan wijen sangrai, dan daun mint.',
    stock: 11,
    available: true,
    bestSeller: false,
    image: TOAST_SAVOURY_IMAGE,
    portionNote: 'Crispy Brioche Box'
  },
  {
    id: 'kpr-tst-s04',
    name: 'Beef BBQ',
    category: 'savoury-toast',
    seriesName: 'Savoury Series',
    price: 12000,
    description: 'Daging sapi berbalut saus barbecue asap yang kaya bumbu, mayo creamy, dan roti panggang wangi mentega.',
    stock: 14,
    available: true,
    bestSeller: false,
    image: TOAST_SAVOURY_IMAGE,
    portionNote: 'Crispy Brioche Box'
  },
  {
    id: 'kpr-tst-s05',
    name: 'Beef Bulgogi',
    category: 'savoury-toast',
    seriesName: 'Savoury Series',
    price: 12000,
    description: 'Daging sapi saus bulgogi manis gurih bumbu bawang karamel, disajikan hangat dengan selada renyah.',
    stock: 8,
    available: true,
    bestSeller: false,
    image: TOAST_SAVOURY_IMAGE,
    portionNote: 'Crispy Brioche Box'
  },

  // SWEET TOAST SERIES
  {
    id: 'kpr-tst-w01',
    name: 'Choco Crunchy',
    category: 'sweet-toast',
    seriesName: 'Sweet Series',
    price: 8000,
    description: 'Roti bakar empuk dilapisi cokelat pekat krispi yang kriuk renyah di setiap gigitan.',
    stock: 20,
    available: true,
    bestSeller: true,
    image: TOAST_SWEET_IMAGE,
    portionNote: 'Thick Toast Slice'
  },
  {
    id: 'kpr-tst-w02',
    name: 'Matcha Greentea',
    category: 'sweet-toast',
    seriesName: 'Sweet Series',
    price: 9000,
    description: 'Olesan selai matcha green tea kental dengan aroma daun teh hijau autentik yang menenangkan.',
    stock: 14,
    available: true,
    bestSeller: false,
    image: TOAST_SWEET_IMAGE,
    portionNote: 'Thick Toast Slice'
  },
  {
    id: 'kpr-tst-w03',
    name: 'Strawberry',
    category: 'sweet-toast',
    seriesName: 'Sweet Series',
    price: 7000,
    description: 'Selai stroberi segar manis asam alami berpadu lembutnya roti panggang hangat bermentega gurih.',
    stock: 12,
    available: true,
    bestSeller: false,
    image: TOAST_SWEET_IMAGE,
    portionNote: 'Thick Toast Slice'
  },
  {
    id: 'kpr-tst-w04',
    name: 'Choco Cheese',
    category: 'sweet-toast',
    seriesName: 'Sweet Series',
    price: 10000,
    description: 'Kombinasi klasik favorit Indonesia: olesan cokelat pekat lumer berpadu tumpukan parutan keju cheddar gurih.',
    stock: 18,
    available: true,
    bestSeller: true,
    image: TOAST_SWEET_IMAGE,
    portionNote: 'Thick Toast Slice'
  },
  {
    id: 'kpr-tst-w05',
    name: 'Tiramisu',
    category: 'sweet-toast',
    seriesName: 'Sweet Series',
    price: 9000,
    description: 'Krim tiramisu wangi aroma kopi lembut berpadu taburan bubuk kakao murni di atas roti bakar hangat.',
    stock: 10,
    available: true,
    bestSeller: false,
    image: TOAST_SWEET_IMAGE,
    portionNote: 'Thick Toast Slice'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Raka Pratama',
    rating: 5,
    comment: 'Tempatnya nyaman banget dan kopinya beneran enak. Caffè Latte 8 ribuan kualitasnya ga kalah sama coffee shop 30 ribuan. Cocok buat ngobrol lama.',
    date: 'Kemarin',
    approved: true,
    favoriteItem: 'Caffè Latte'
  },
  {
    id: 'rev-02',
    author: 'Dinda Ayu',
    rating: 5,
    comment: 'Beef Blackpepper toast-nya juara! Dagingnya banyak, rotinya garing di luar tapi lembut di dalem. Pas banget dipaduin sama Butterscotch Macchiato.',
    date: '3 hari yang lalu',
    approved: true,
    favoriteItem: 'Beef Blackpepper'
  },
  {
    id: 'rev-03',
    author: 'Bagas Aditya',
    rating: 5,
    comment: 'Konsepnya jujur dan bersahabat. Bener-bener jadi ruang buat kumpul dan kenalan sama orang baru. Pelayanannya ramah banget!',
    date: '5 hari yang lalu',
    approved: true,
    favoriteItem: 'Gula Aren'
  },
  {
    id: 'rev-04',
    author: 'Siti Rahma',
    rating: 5,
    comment: 'Choco Cheese toast bikin nostalgia roti bakar jadul tapi versi modern. Tempat duduk outdoor-nya adem sore-sore.',
    date: '1 minggu yang lalu',
    approved: true,
    favoriteItem: 'Choco Cheese'
  }
];

export const OUTLET_DATA: OutletInfo = {
  name: 'KOPERASI',
  tagline: 'Kopi Pertemanan dan Relasi',
  concept: 'Ruang sederhana di sudut kota tempat kopi menjadi media menyambung cerita, merawat pertemanan, dan membangun relasi baik.',
  address: 'Jl. Gandaria Tengah II No. 18, Kebayoran Baru, Jakarta Selatan 12130',
  area: 'Jakarta Selatan',
  operatingHours: 'Setiap Hari • 08:00 - 22:00 WIB',
  phone: '+62 812-3456-7890',
  whatsapp: 'https://wa.me/6281234567890?text=Halo%20Koperasi%2C%20mau%20tanya%20menu%20dan%20tempat%20dong',
  instagram: '@koperasi.coffee',
  tiktok: '@koperasi.relasi',
  mapsUrl: 'https://maps.google.com/?q=Jakarta'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'KPR-00124',
    customerName: 'Dimas S.',
    orderType: 'dine_in',
    tableNumber: '04',
    customerPhone: '08123456789',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Caffe Latte
        quantity: 2,
        temperatureChoice: 'iced'
      },
      {
        product: INITIAL_PRODUCTS[10], // Beef Blackpepper
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[14], // Choco Crunchy
        quantity: 1
      }
    ],
    subtotal: 36000,
    tax: 0,
    total: 36000,
    paymentMethod: 'QRIS',
    paymentStatus: 'PAID',
    orderStatus: 'preparing',
    createdAt: '10 Menit yang lalu'
  },
  {
    id: 'KPR-00123',
    customerName: 'Anisa W.',
    orderType: 'takeaway',
    customerPhone: '08198765432',
    items: [
      {
        product: INITIAL_PRODUCTS[6], // Caramel Macchiato
        quantity: 1,
        temperatureChoice: 'iced'
      },
      {
        product: INITIAL_PRODUCTS[17], // Choco Cheese
        quantity: 1
      }
    ],
    subtotal: 25000,
    tax: 0,
    total: 25000,
    paymentMethod: 'QRIS',
    paymentStatus: 'PAID',
    orderStatus: 'ready',
    createdAt: '25 Menit yang lalu'
  }
];
