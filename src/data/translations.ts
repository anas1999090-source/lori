import { Language } from '../types';

export interface Translations {
  nav: {
    soap: string;
    shampoo: string;
    oils: string;
    blog: string;
  };
  categories: {
    ALL: string;
    SOAP: string;
    SHAMPOO: string;
    OILS: string;
  };
  hero: {
    seeMore: string;
    carouselView: string;
    gridView: string;
    swipeHint: string;
    currency: string;
  };
  pdp: {
    back: string;
    addToCart: string;
    added: string;
    size: string;
    details: string;
    delivery: string;
    reviews: string;
    benefitsTitle: string;
    ingredientsTitle: string;
    deliveryBody: string[];
    youMayAlsoLike: string;
    wishlistAdd: string;
    wishlistSaved: string;
  };
  cart: {
    title: string;
    empty: string;
    emptySub: string;
    subtotal: string;
    delivery: string;
    free: string;
    total: string;
    freeShippingNote: string;
    freeShippingUnlocked: string;
    checkoutCta: string;
    backToCart: string;
    codBadge: string;
    fullName: string;
    phone: string;
    city: string;
    address: string;
    placeOrder: string;
    successTitle: string;
    successSub: string;
    orderRef: string;
    continueShopping: string;
    validationError: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    close: string;
  };
  blog: {
    title: string;
    subtitle: string;
    backHome: string;
    shopFormula: string;
  };
  footer: {
    rights: string;
    naturalFormula: string;
    codWorldwide: string;
    admin: string;
  };
  admin: {
    title: string;
    subtitle: string;
    passwordLabel: string;
    unlock: string;
    wrongPassword: string;
    backToStore: string;
    noOrders: string;
    totalOrders: string;
    revenue: string;
    exportCsv: string;
    clearOrder: string;
    customer: string;
    items: string;
    status: string;
    date: string;
    total: string;
    logout: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      soap: 'SOAP',
      shampoo: 'SHAMPOO',
      oils: 'OILS',
      blog: 'BLOG',
    },
    categories: {
      ALL: 'ALL',
      SOAP: 'SOAP',
      SHAMPOO: 'SHAMPOO',
      OILS: 'OILS',
    },
    hero: {
      seeMore: 'SEE MORE',
      carouselView: 'Carousel view',
      gridView: 'Grid view',
      swipeHint: 'Scroll, swipe, or use arrow keys',
      currency: 'DH',
    },
    pdp: {
      back: 'Back',
      addToCart: 'ADD TO CART',
      added: 'ADDED TO CART',
      size: 'Size',
      details: 'Details',
      delivery: 'Free Delivery & Returns',
      reviews: 'Reviews',
      benefitsTitle: 'Key Benefits',
      ingredientsTitle: 'Natural Ingredients',
      deliveryBody: [
        'Complimentary Cash on Delivery across Morocco on orders over 250 DH (30 DH standard delivery under 250 DH).',
        'Dispatched within 24 hours in recyclable apothecary packaging. Delivery within 24–48 hours.',
        '14-day effortless return policy on unopened sealed formulas.',
      ],
      youMayAlsoLike: 'You may also like',
      wishlistAdd: 'Save to wishlist',
      wishlistSaved: 'Saved in wishlist',
    },
    cart: {
      title: 'YOUR BAG',
      empty: 'Your bag is currently empty.',
      emptySub: 'Explore our four natural hair & body essentials.',
      subtotal: 'Subtotal',
      delivery: 'Delivery',
      free: 'Free',
      total: 'Total (COD)',
      freeShippingNote: 'Add {amount} DH more for complimentary delivery',
      freeShippingUnlocked: 'Complimentary delivery unlocked',
      checkoutCta: 'CHECKOUT — CASH ON DELIVERY',
      backToCart: 'Back to bag',
      codBadge: 'Cash on Delivery (Paiement à la livraison)',
      fullName: 'Full Name',
      phone: 'Phone Number',
      city: 'City',
      address: 'Delivery Address',
      placeOrder: 'CONFIRM ORDER',
      successTitle: 'ORDER CONFIRMED',
      successSub: 'Thank you. Our team will contact you shortly to confirm delivery.',
      orderRef: 'Order Reference',
      continueShopping: 'CONTINUE SHOPPING',
      validationError: 'Please fill in your full name, valid phone number, city, and address.',
    },
    search: {
      placeholder: 'Search soap, shampoo, keratin oil, ingredients...',
      noResults: 'No natural formulas match your search.',
      close: 'Close',
    },
    blog: {
      title: 'BOTANICAL JOURNAL',
      subtitle: 'Notes on raw resins, cold-pressed Moroccan oils, and minimalist rituals.',
      backHome: 'Back to collection',
      shopFormula: 'View formula',
    },
    footer: {
      rights: 'LORI Natural Hair & Body Care',
      naturalFormula: 'Cold-pressed botanical formulations',
      codWorldwide: 'Cash on Delivery · 24–48h Dispatch',
      admin: 'Admin',
    },
    admin: {
      title: 'LORI ORDERS CONSOLE',
      subtitle: 'Local Cash-on-Delivery order ledger',
      passwordLabel: 'Enter admin password',
      unlock: 'UNLOCK',
      wrongPassword: 'Incorrect password. Hint: check README.md (default: lori2026).',
      backToStore: 'Back to store',
      noOrders: 'No orders placed yet.',
      totalOrders: 'Orders',
      revenue: 'Total Revenue',
      exportCsv: 'Export CSV',
      clearOrder: 'Delete',
      customer: 'Customer',
      items: 'Items',
      status: 'Status',
      date: 'Date',
      total: 'Total',
      logout: 'Lock',
    },
  },
  fr: {
    nav: {
      soap: 'SAVON',
      shampoo: 'SHAMPOING',
      oils: 'HUILES',
      blog: 'BLOG',
    },
    categories: {
      ALL: 'TOUT',
      SOAP: 'SAVON',
      SHAMPOO: 'SHAMPOING',
      OILS: 'HUILES',
    },
    hero: {
      seeMore: 'VOIR PLUS',
      carouselView: 'Vue carrousel',
      gridView: 'Vue grille',
      swipeHint: 'Faites défiler ou utilisez les flèches',
      currency: 'DH',
    },
    pdp: {
      back: 'Retour',
      addToCart: 'AJOUTER AU PANIER',
      added: 'AJOUTÉ AU PANIER',
      size: 'Format',
      details: 'Détails',
      delivery: 'Livraison & Retours Gratuits',
      reviews: 'Avis',
      benefitsTitle: 'Bienfaits Clés',
      ingredientsTitle: 'Ingrédients Naturels',
      deliveryBody: [
        'Livraison offerte partout au Maroc dès 250 DH d’achat (30 DH en dessous de 250 DH), paiement à la livraison.',
        'Expédition sous 24h dans un emballage recyclable. Réception sous 24 à 48h.',
        'Retours simples sous 14 jours pour tout produit non ouvert.',
      ],
      youMayAlsoLike: 'Vous aimerez aussi',
      wishlistAdd: 'Ajouter aux favoris',
      wishlistSaved: 'Dans vos favoris',
    },
    cart: {
      title: 'VOTRE PANIER',
      empty: 'Votre panier est vide.',
      emptySub: 'Découvrez nos quatre essentiels naturels pour cheveux et corps.',
      subtotal: 'Sous-total',
      delivery: 'Livraison',
      free: 'Gratuite',
      total: 'Total (À la livraison)',
      freeShippingNote: 'Plus que {amount} DH pour la livraison gratuite',
      freeShippingUnlocked: 'Livraison gratuite débloquée',
      checkoutCta: 'COMMANDER — PAIEMENT À LA LIVRAISON',
      backToCart: 'Retour au panier',
      codBadge: 'Paiement à la livraison (Cash on Delivery)',
      fullName: 'Nom complet',
      phone: 'Téléphone',
      city: 'Ville',
      address: 'Adresse de livraison',
      placeOrder: 'CONFIRMER LA COMMANDE',
      successTitle: 'COMMANDE CONFIRMÉE',
      successSub: 'Merci. Notre équipe vous contactera très vite pour planifier la livraison.',
      orderRef: 'Référence',
      continueShopping: 'CONTINUER VOS ACHATS',
      validationError: 'Veuillez renseigner votre nom, téléphone valide, ville et adresse.',
    },
    search: {
      placeholder: 'Rechercher savon, shampoing, kératine, ingrédients...',
      noResults: 'Aucun soin ne correspond à votre recherche.',
      close: 'Fermer',
    },
    blog: {
      title: 'JOURNAL BOTANIQUE',
      subtitle: 'Notes sur les résines brutes, huiles pressées à froid et rituels épurés.',
      backHome: 'Retour à la collection',
      shopFormula: 'Voir le soin',
    },
    footer: {
      rights: 'LORI Soins Naturels Cheveux & Corps',
      naturalFormula: 'Formules botaniques pressées à froid',
      codWorldwide: 'Paiement à la livraison · 24–48h',
      admin: 'Admin',
    },
    admin: {
      title: 'GESTION DES COMMANDES LORI',
      subtitle: 'Registre local des commandes paiement à la livraison',
      passwordLabel: 'Mot de passe administrateur',
      unlock: 'OUVRIR',
      wrongPassword: 'Mot de passe incorrect (par défaut : lori2026).',
      backToStore: 'Retour à la boutique',
      noOrders: 'Aucune commande enregistrée.',
      totalOrders: 'Commandes',
      revenue: 'Chiffre d’affaires',
      exportCsv: 'Exporter CSV',
      clearOrder: 'Supprimer',
      customer: 'Client',
      items: 'Articles',
      status: 'Statut',
      date: 'Date',
      total: 'Total',
      logout: 'Verrouiller',
    },
  },
  ar: {
    nav: {
      soap: 'صابون',
      shampoo: 'شامبوان',
      oils: 'زيوت',
      blog: 'المجلة',
    },
    categories: {
      ALL: 'الكل',
      SOAP: 'صابون',
      SHAMPOO: 'شامبوان',
      OILS: 'زيوت',
    },
    hero: {
      seeMore: 'اكتشف المزيد',
      carouselView: 'عرض دائري',
      gridView: 'عرض شبكي',
      swipeHint: 'اسحب أو استخدم الأسهم للتنقل',
      currency: 'درهم',
    },
    pdp: {
      back: 'رجوع',
      addToCart: 'أضف إلى السلة',
      added: 'تمت الإضافة للسلة',
      size: 'الحجم',
      details: 'التفاصيل',
      delivery: 'توصيل وإرجاع مجاني',
      reviews: 'التقييمات',
      benefitsTitle: 'الفوائد الأساسية',
      ingredientsTitle: 'المكونات الطبيعية',
      deliveryBody: [
        'توصيل مجاني لجميع مدن المغرب للطلبات فوق 250 درهم (30 درهم للطلبات الأقل)، مع الدفع عند الاستلام.',
        'تجهيز الطلب خلال 24 ساعة في عبوات صديقة للبيئة، والتوصيل خلال 24 إلى 48 ساعة.',
        'إمكانية الإرجاع خلال 14 يوماً للمنتجات غير المفتوحة.',
      ],
      youMayAlsoLike: 'قد يعجبك أيضاً',
      wishlistAdd: 'حفظ في المفضلة',
      wishlistSaved: 'محفوظ في المفضلة',
    },
    cart: {
      title: 'سلة التسوق',
      empty: 'سلتك فارغة حالياً.',
      emptySub: 'اكتشف مستحضراتنا الطبيعية الأربعة للشعر والجسم.',
      subtotal: 'المجموع الفرعي',
      delivery: 'التوصيل',
      free: 'مجاني',
      total: 'المجموع (الدفع عند الاستلام)',
      freeShippingNote: 'أضف {amount} درهم للحصول على توصيل مجاني',
      freeShippingUnlocked: 'تم تفعيل التوصيل المجاني',
      checkoutCta: 'إتمام الطلب — الدفع عند الاستلام',
      backToCart: 'العودة إلى السلة',
      codBadge: 'الدفع نقداً عند الاستلام',
      fullName: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      city: 'المدينة',
      address: 'عنوان التوصيل',
      placeOrder: 'تأكيد الطلب',
      successTitle: 'تم تأكيد طلبك بنجاح',
      successSub: 'شكراً لك. سيتواصل معك فريقنا قريباً لتأكيد موعد التوصيل.',
      orderRef: 'رقم الطلب',
      continueShopping: 'متابعة التسوق',
      validationError: 'يرجى إدخال الاسم الكامل ورقم هاتف صحيح والمدينة والعنوان.',
    },
    search: {
      placeholder: 'ابحث عن صابون اللبان، شامبوان، زيت الكيراتين...',
      noResults: 'لم يتم العثور على منتجات مطابقة لبحثك.',
      close: 'إغلاق',
    },
    blog: {
      title: 'المجلة النباتية',
      subtitle: 'مقالات حول المكونات الطبيعية، الزيوت المعصورة على البارد وطقوس العناية.',
      backHome: 'العودة للمجموعة',
      shopFormula: 'عرض المنتج',
    },
    footer: {
      rights: 'لوري للعناية الطبيعية بالشعر والجسم',
      naturalFormula: 'تركيبات نباتية معصورة على البارد',
      codWorldwide: 'الدفع عند الاستلام · توصيل سريع',
      admin: 'الإدارة',
    },
    admin: {
      title: 'لوحة طلبات لوري',
      subtitle: 'سجل الطلبات المحلية (الدفع عند الاستلام)',
      passwordLabel: 'أدخل كلمة مرور الإدارة',
      unlock: 'دخول',
      wrongPassword: 'كلمة المرور غير صحيحة (الافتراضية: lori2026).',
      backToStore: 'العودة للمتجر',
      noOrders: 'لا توجد طلبات مسجلة بعد.',
      totalOrders: 'الطلبات',
      revenue: 'إجمالي المبيعات',
      exportCsv: 'تصدير CSV',
      clearOrder: 'حذف',
      customer: 'العميل',
      items: 'المنتجات',
      status: 'الحالة',
      date: 'التاريخ',
      total: 'المجموع',
      logout: 'قفل',
    },
  },
};
