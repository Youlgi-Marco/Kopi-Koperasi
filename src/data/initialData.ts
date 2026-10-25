import { Product, Review, OutletInfo, Order } from '../types';

import americanoImage from '../assets/images/americano.jpeg';
import butterscotchMacchiatoImage from '../assets/images/butterscotch-machiato.jpeg';
import cafeInteriorImage from '../assets/images/cafe_interior_koperasi_1792080846798.jpg';
import caffeLatteImage from '../assets/images/caffe-latte.jpeg';
import caramelImage from '../assets/images/caramel.jpeg';
import caramelMacchiatoImage from '../assets/images/caramel-machiato.jpeg';
import gulaArenImage from '../assets/images/gula-aren.jpeg';
import hazelnutMacchiatoImage from '../assets/images/hazelnut-machiato.jpeg';
import heroBannerImage from '../assets/images/hero_koperasi_banner_1792083690462.jpg';
import qrisImage from '../assets/images/qris.jpeg';
import toastSavouryImage from '../assets/images/toast_savoury_hero_1792080846888.jpg';
import toastSweetImage from '../assets/images/toast_sweet_hero_1792080846738.jpg';
import toastChocoCrunchyImage from '../assets/images/toast-choco-crunchy.jpeg';
import toastMatchaGreenteaImage from '../assets/images/toast-matcha-greentea.jpeg';
import toastStrawberryImage from '../assets/images/toast-strawberry.jpeg';
import toastChocoCheeseImage from '../assets/images/toast-choco-cheese.jpeg';
import toastTiramisuImage from '../assets/images/toast-tiramisu.jpeg';

export const BARISTA_WHATSAPP = '6289518281614';
export const QRIS_IMAGE = qrisImage;
export const HERO_COFFEE_IMAGE = caffeLatteImage;
export const HERO_BANNER_EXACT = heroBannerImage;
export const CAFE_INTERIOR_IMAGE = cafeInteriorImage;
export const TOAST_SAVOURY_IMAGE = toastSavouryImage;
export const TOAST_SWEET_IMAGE = toastSweetImage;
export const DRINK_AMERICANO_IMAGE = americanoImage;
export const DRINK_MACCHIATO_IMAGE = caramelMacchiatoImage;

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
    image: caffeLatteImage,
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
    image: caffeLatteImage,
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
    image: gulaArenImage,
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
    image: hazelnutMacchiatoImage,
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
    image: caramelImage,
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
    image: caramelMacchiatoImage,
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
    image: butterscotchMacchiatoImage,
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
    image: hazelnutMacchiatoImage,
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
    image: toastChocoCrunchyImage,
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
    image: toastMatchaGreenteaImage,
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
    image: toastStrawberryImage,
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
    image: toastChocoCheeseImage,
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
    image: toastTiramisuImage,
    portionNote: 'Thick Toast Slice'
  }
];

export const repairLegacyProductImage = (product: Product): Product => {
  const currentProduct = INITIAL_PRODUCTS.find(({ id }) => id === product.id);
  if (!currentProduct || typeof product.image !== 'string') return product;

  const usesLegacyAssetPath = product.image.startsWith('/src/assets/images/');
  const usesSharedSweetToastImage =
    product.category === 'sweet-toast' &&
    product.image.includes('toast_sweet_hero_');

  return usesLegacyAssetPath || usesSharedSweetToastImage
    ? { ...product, image: currentProduct.image }
    : product;
};

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
    author: 'Salsabilla Elizabeth',
    rating: 5,
    comment: 'josjis bangett toast nyaa!. Rekomen sih kalo mau kopi & toast murah.',
    date: '3 hari yang lalu',
    approved: true,
    favoriteItem: 'Beef Blackpepper'
  },
  {
    id: 'rev-03',
    author: 'Bagas Aditya',
    rating: 5,
    comment: 'Barista asik, kopi menarik, toast mantep bangett cikk!',
    date: '5 hari yang lalu',
    approved: true,
    favoriteItem: 'Gula Aren'
  },
  {
    id: 'rev-04',
    author: 'Siti Rahma',
    rating: 5,
    comment: 'Konsepnya outdoor, cocok buat ngopi sore. jujurr endull',
    date: '1 minggu yang lalu',
    approved: true,
    favoriteItem: 'Choco Cheese'
  }
];

export const OUTLET_DATA: OutletInfo = {
  name: 'KOPERASI',
  tagline: 'Kopi Pertemanan dan Relasi',
  concept: 'Ruang sederhana di sudut kota tempat kopi menjadi media menyambung cerita, merawat pertemanan, dan membangun relasi baik.',
  address: 'Kabupaten Karanganyar, Jawa Tengah. Sebelah barat Stadion 45.',
  area: 'Jakarta Selatan',
  operatingHours: 'Senin - Minggu • 18:00 - 24:00 WIB',
  phone: '+62 812-3456-7890',
  whatsapp: 'https://wa.me/6283144710824?text=Halo%20Koperasi%2C%20mau%20tanya%20menu%20dan%20tempat%20dong',
  instagram: '@kopikoperasi_45',
  tiktok: '@kopikoperasi_45',
  mapsUrl: 'https://share.google/ANIUeNN0WnppvFH9O'
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
